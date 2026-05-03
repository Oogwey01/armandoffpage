import { ADS_CATEGORY_MAP, type FormData } from "./schemas";

export function getAdsCategory(inversionAds: string): string {
  return ADS_CATEGORY_MAP[inversionAds] ?? "";
}

type ShopifyMetafield = {
  namespace: string;
  key: string;
  value: string;
  type: string;
};

type ShopifyCustomerPayload = {
  first_name?: string;
  phone?: string;
  tags?: string;
  note?: string;
  metafields?: ShopifyMetafield[];
};

type ShopifyErrors = Record<string, string[] | string>;

// Mexico mobile: legacy WhatsApp prefix "+521" (13 digits) → strip the "1" → "+52" (12 digits).
// Also collapses repeated leading "+", strips spaces / dashes / parens, and drops trailing junk.
export function normalizePhone(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  let p = raw.trim().replace(/[\s()-]/g, "");
  if (!p) return undefined;
  // Collapse multiple leading "+"
  p = p.replace(/^\++/, "+");
  // MX legacy: +521XXXXXXXXXX (13 digits after +) → +52XXXXXXXXXX
  if (/^\+521\d{10}$/.test(p)) {
    p = "+52" + p.slice(4);
  }
  return p;
}

function parseShopifyError(body: string): {
  errors: ShopifyErrors;
  field: "phone" | "other" | "unknown";
  reason: string;
} {
  let errors: ShopifyErrors = {};
  try {
    const parsed = JSON.parse(body) as { errors?: ShopifyErrors };
    errors = parsed.errors ?? {};
  } catch {
    return { errors: {}, field: "unknown", reason: body.slice(0, 200) };
  }
  const keys = Object.keys(errors);
  if (keys.includes("phone")) {
    return { errors, field: "phone", reason: JSON.stringify(errors.phone) };
  }
  return {
    errors,
    field: keys.length ? "other" : "unknown",
    reason: JSON.stringify(errors),
  };
}

async function findCustomerBy(
  baseUrl: string,
  headers: Record<string, string>,
  query: string
): Promise<{ id: number; tags: string } | null> {
  const res = await fetch(
    `${baseUrl}/customers/search.json?query=${encodeURIComponent(query)}`,
    { headers }
  );
  if (!res.ok) return null;
  const data = (await res.json()) as {
    customers?: Array<{ id: number; tags: string }>;
  };
  return data.customers?.[0] ?? null;
}

// Resolve the existing customer that caused a 422 conflict.
// Shopify's customer search index has eventual consistency: a customer created
// seconds before may not yet be searchable, so we retry with backoff.
async function lookupExistingCustomer(
  baseUrl: string,
  headers: Record<string, string>,
  phone: string | undefined
): Promise<{ id: number; tags: string } | null> {
  if (!phone) return null;
  const query = `phone:${phone}`;
  const delays = [0, 1500, 3000];
  for (const delay of delays) {
    if (delay) await new Promise((r) => setTimeout(r, delay));
    const found = await findCustomerBy(baseUrl, headers, query);
    if (found) return found;
  }
  return null;
}

async function postCustomer(
  baseUrl: string,
  headers: Record<string, string>,
  payload: ShopifyCustomerPayload
): Promise<{ ok: boolean; status: number; body: string }> {
  const res = await fetch(`${baseUrl}/customers.json`, {
    method: "POST",
    headers,
    body: JSON.stringify({ customer: payload }),
  });
  const body = await res.text();
  return { ok: res.ok, status: res.status, body };
}

async function putCustomer(
  baseUrl: string,
  headers: Record<string, string>,
  id: number,
  payload: ShopifyCustomerPayload
): Promise<{ ok: boolean; status: number; body: string }> {
  const res = await fetch(`${baseUrl}/customers/${id}.json`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ customer: payload }),
  });
  const body = await res.text();
  return { ok: res.ok, status: res.status, body };
}

export async function createShopifyCustomer(data: FormData): Promise<void> {
  const storeUrl = process.env.SHOPIFY_STORE_URL;
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;
  const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2024-10";

  if (!storeUrl || !accessToken) {
    console.warn(
      "[Shopify] SHOPIFY_STORE_URL or SHOPIFY_ACCESS_TOKEN not configured — skipping customer creation"
    );
    return;
  }

  const category = getAdsCategory(data.inversionAds); // siempre "" mientras los tags response-dependent estén desactivados
  const submittedAt = new Date().toISOString();
  const baseUrl = `https://${storeUrl}/admin/api/${apiVersion}`;
  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": accessToken,
  };

  const phone = normalizePhone(data.whatsapp);
  const tags = "armandoff-lead, formulario-completo";
  const noteLines = [
    `Negocio: ${data.nombreNegocio}`,
    `Producto/servicio: ${data.productoServicio}`,
    `Cómo está vendiendo: ${data.canalVentaActual}`,
    `Presencia de marca: ${data.presenciaMarca}`,
    `Urgencia: ${data.urgenciaResultados}`,
  ];
  const metafields: ShopifyMetafield[] = [
    {
      namespace: "armandoff",
      key: "ultimo_paso",
      value: "Formulario completado",
      type: "single_line_text_field",
    },
    {
      namespace: "armandoff",
      key: "marketing_channels",
      value: data.canalVentaActual,
      type: "single_line_text_field",
    },
    {
      namespace: "armandoff",
      key: "monthly_revenue",
      value: data.presenciaMarca,
      type: "single_line_text_field",
    },
    {
      namespace: "armandoff",
      key: "revenue_category",
      value: category,
      type: "single_line_text_field",
    },
    {
      namespace: "armandoff",
      key: "ads_investment",
      value: data.inversionAds,
      type: "single_line_text_field",
    },
    {
      namespace: "armandoff",
      key: "start_when",
      value: data.urgenciaResultados,
      type: "single_line_text_field",
    },
    {
      namespace: "armandoff",
      key: "submitted_at",
      value: submittedAt,
      type: "single_line_text_field",
    },
  ];

  let payload: ShopifyCustomerPayload = {
    first_name: data.nombre,
    phone,
    tags,
    note: noteLines.join("\n"),
    metafields,
  };

  const create = await postCustomer(baseUrl, headers, payload);
  if (create.ok) {
    const created = JSON.parse(create.body) as { customer: { id: number } };
    console.log(
      `[Shopify] Created customer ${created.customer.id}`
    );
    return;
  }

  if (create.status !== 422) {
    console.error(
      `[Shopify] Create failed (${create.status}):`,
      create.body
    );
    return;
  }

  const { field, reason } = parseShopifyError(create.body);
  console.warn(
    `[Shopify] Create 422 on field=${field} reason=${reason} — recovering`
  );

  // Phone invalid → retry without phone, stash original whatsapp in note.
  if (field === "phone" && /invalid/i.test(reason)) {
    payload = {
      ...payload,
      phone: undefined,
      note: `WhatsApp (no aceptado por Shopify): ${data.whatsapp}\n${payload.note ?? ""}`.trim(),
    };
    const retry = await postCustomer(baseUrl, headers, payload);
    if (retry.ok) {
      const created = JSON.parse(retry.body) as { customer: { id: number } };
      console.log(
        `[Shopify] Created customer without phone ${created.customer.id}`
      );
      return;
    }
    if (retry.status !== 422) {
      console.error(
        `[Shopify] Create retry-without-phone failed (${retry.status}):`,
        retry.body
      );
      return;
    }
    // Fall through into the lookup-and-update branch with the no-phone payload.
  }

  // Lookup the existing customer by phone (only identifier we capture now).
  const existing = await lookupExistingCustomer(baseUrl, headers, payload.phone);

  if (!existing) {
    console.error(
      `[Shopify] 422 (${field}) but no existing customer found by phone — lead lost. body=${create.body}`
    );
    return;
  }

  const update = await putCustomer(baseUrl, headers, existing.id, {
    tags,
    note: payload.note,
    metafields,
  });
  if (!update.ok) {
    console.error(
      `[Shopify] Failed to update existing customer (${update.status}):`,
      update.body
    );
    return;
  }

  console.log(
    `[Shopify] Updated existing customer ${existing.id}`
  );
}
