import type { FormData } from "./schemas";

// Step names for checkpoint tracking
const STEP_NAMES: Record<number, string> = {
  1: "nombre",
  2: "email",
  3: "whatsapp",
  4: "url-negocio",
  5: "canales-marketing",
  6: "inversion-ads",
  7: "facturacion",
  8: "meta-90-dias",
  9: "cuando-empezar",
  10: "obstaculo",
};

const REVENUE_CATEGORY_MAP: Record<string, string> = {
  $0: "Comunes",
  "$1-$15K MXN": "Comunes",
  "$15K-$50K MXN": "Normales",
  "$50K-$150K MXN": "Arriba del promedio",
  "$150K-$500K MXN": "Admins",
  "$500K+ MXN": "Leyendas",
};

export function getRevenueCategory(monthlyRevenue: string): string {
  return REVENUE_CATEGORY_MAP[monthlyRevenue] ?? "Comunes";
}

/**
 * Creates or updates a Shopify customer with partial form data at a given step.
 * Used to track which step the user reached before abandoning.
 */
export async function checkpointShopifyCustomer(
  data: { nombre: string; email: string; whatsapp: string },
  step: number
): Promise<void> {
  const storeUrl = process.env.SHOPIFY_STORE_URL;
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;
  const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2024-10";

  if (!storeUrl || !accessToken) {
    console.warn("[Shopify] Env vars not configured — skipping checkpoint");
    return;
  }

  const stepName = STEP_NAMES[step] ?? `paso-${step}`;
  const baseUrl = `https://${storeUrl}/admin/api/${apiVersion}`;
  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": accessToken,
  };

  const customerPayload = {
    customer: {
      first_name: data.nombre,
      email: data.email,
      phone: data.whatsapp,
      tags: "formulario-incompleto, armandoff-lead",
      metafields: [
        {
          namespace: "armandoff",
          key: "ultimo_paso",
          value: `${step} - ${stepName}`,
          type: "single_line_text_field",
        },
        {
          namespace: "armandoff",
          key: "checkpoint_at",
          value: new Date().toISOString(),
          type: "single_line_text_field",
        },
      ],
    },
  };

  // Try to create
  const createRes = await fetch(`${baseUrl}/customers.json`, {
    method: "POST",
    headers,
    body: JSON.stringify(customerPayload),
  });

  if (createRes.status === 422) {
    // Customer exists — search and update
    const searchRes = await fetch(
      `${baseUrl}/customers/search.json?query=email:${encodeURIComponent(data.email)}`,
      { headers }
    );
    if (!searchRes.ok) return;

    const searchData = (await searchRes.json()) as {
      customers: Array<{ id: number; tags: string }>;
    };
    const existing = searchData.customers[0];
    if (!existing) return;

    // Only update if still incomplete (don't overwrite a completed form)
    if (existing.tags.includes("formulario-completo")) return;

    await fetch(`${baseUrl}/customers/${existing.id}.json`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        customer: {
          tags: "formulario-incompleto, armandoff-lead",
          metafields: customerPayload.customer.metafields,
        },
      }),
    });

    console.log(`[Shopify] Checkpoint updated: customer ${existing.id} → paso ${step}`);
    return;
  }

  if (createRes.ok) {
    const created = (await createRes.json()) as { customer: { id: number } };
    console.log(`[Shopify] Checkpoint created: customer ${created.customer.id} → paso ${step}`);
  }
}

export async function createShopifyCustomer(data: FormData): Promise<void> {
  const storeUrl = process.env.SHOPIFY_STORE_URL;
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;
  const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2024-01";

  if (!storeUrl || !accessToken) {
    console.warn(
      "[Shopify] SHOPIFY_STORE_URL or SHOPIFY_ACCESS_TOKEN not configured — skipping customer creation"
    );
    return;
  }

  const category = getRevenueCategory(data.monthlyRevenue);
  const submittedAt = new Date().toISOString();
  const baseUrl = `https://${storeUrl}/admin/api/${apiVersion}`;
  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": accessToken,
  };

  const customerPayload = {
    customer: {
      first_name: data.nombre,
      email: data.email,
      phone: data.whatsapp,
      tags: `${category}, armandoff-lead, formulario-completo`,
      note: [
        data.businessUrl ? `URL del negocio: ${data.businessUrl}` : null,
        `Inversión en ads: ${data.adsInvestment}`,
        `Meta a 90 días: ${data.goal90Days}`,
        `Cuándo empezar: ${data.startWhen}`,
        `Principal obstáculo: ${data.mainObstacle}`,
      ]
        .filter(Boolean)
        .join("\n"),
      metafields: [
        {
          namespace: "armandoff",
          key: "marketing_channels",
          value: data.marketingChannels.join(", "),
          type: "single_line_text_field",
        },
        {
          namespace: "armandoff",
          key: "monthly_revenue",
          value: data.monthlyRevenue,
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
          value: data.adsInvestment,
          type: "single_line_text_field",
        },
        {
          namespace: "armandoff",
          key: "start_when",
          value: data.startWhen,
          type: "single_line_text_field",
        },
        {
          namespace: "armandoff",
          key: "submitted_at",
          value: submittedAt,
          type: "single_line_text_field",
        },
      ],
    },
  };

  const createRes = await fetch(`${baseUrl}/customers.json`, {
    method: "POST",
    headers,
    body: JSON.stringify(customerPayload),
  });

  if (createRes.status === 422) {
    // Email already exists — find and update the customer
    const searchRes = await fetch(
      `${baseUrl}/customers/search.json?query=email:${encodeURIComponent(data.email)}`,
      { headers }
    );

    if (!searchRes.ok) {
      console.error("[Shopify] Failed to search existing customer");
      return;
    }

    const searchData = (await searchRes.json()) as {
      customers: Array<{ id: number }>;
    };
    const existing = searchData.customers[0];

    if (!existing) {
      console.error("[Shopify] Customer not found after 422 conflict");
      return;
    }

    const updatePayload = {
      customer: {
        tags: customerPayload.customer.tags,
        note: customerPayload.customer.note,
        metafields: customerPayload.customer.metafields,
      },
    };

    const updateRes = await fetch(
      `${baseUrl}/customers/${existing.id}.json`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(updatePayload),
      }
    );

    if (!updateRes.ok) {
      const err = await updateRes.text();
      console.error("[Shopify] Failed to update existing customer:", err);
    } else {
      console.log(
        `[Shopify] Updated existing customer ${existing.id} → category: ${category}`
      );
    }

    return;
  }

  if (!createRes.ok) {
    const err = await createRes.text();
    console.error("[Shopify] Failed to create customer:", err);
    return;
  }

  const created = (await createRes.json()) as { customer: { id: number } };
  console.log(
    `[Shopify] Created customer ${created.customer.id} → category: ${category}`
  );
}
