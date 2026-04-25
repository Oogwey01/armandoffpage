import { createHash } from "crypto";

// Helper de Conversions API server-side.
// Si las env vars no están configuradas, las funciones son no-op y solo loguean
// un warning. Esto permite que el resto del backend funcione en local sin Meta.

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN ?? "";
const TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE ?? "";
const API_VERSION = process.env.META_CAPI_API_VERSION ?? "v21.0";

export function isCapiEnabled(): boolean {
  return Boolean(PIXEL_ID && ACCESS_TOKEN);
}

// Meta exige SHA-256 hex en minúsculas para cualquier PII.
function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Solo dígitos, sin código de país duplicado ni símbolos.
function normalizePhone(phone: string): string {
  return phone.replace(/\D+/g, "");
}

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

interface UserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  // Campos no-PII que NO se hashean.
  fbp?: string;
  fbc?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  externalId?: string; // ej. id de cliente de Shopify para mejor matching
}

function buildUserData(user: UserData): Record<string, unknown> {
  const out: Record<string, unknown> = {};

  if (user.email) out.em = [sha256(normalizeEmail(user.email))];
  if (user.phone) out.ph = [sha256(normalizePhone(user.phone))];
  if (user.firstName) out.fn = [sha256(normalizeName(user.firstName))];
  if (user.lastName) out.ln = [sha256(normalizeName(user.lastName))];
  if (user.externalId) out.external_id = [sha256(user.externalId)];

  // Estos NO se hashean — Meta los espera en plano.
  if (user.fbp) out.fbp = user.fbp;
  if (user.fbc) out.fbc = user.fbc;
  if (user.clientIpAddress) out.client_ip_address = user.clientIpAddress;
  if (user.clientUserAgent) out.client_user_agent = user.clientUserAgent;

  return out;
}

interface CapiEventInput {
  eventName: string;
  eventId: string;
  eventTime?: number; // unix seconds, default ahora
  eventSourceUrl?: string;
  actionSource?:
    | "website"
    | "email"
    | "app"
    | "phone_call"
    | "chat"
    | "physical_store"
    | "system_generated"
    | "other";
  userData: UserData;
  customData?: Record<string, unknown>;
}

export async function sendCapiEvent(input: CapiEventInput): Promise<void> {
  if (!isCapiEnabled()) {
    console.warn("[Meta CAPI] Faltan NEXT_PUBLIC_META_PIXEL_ID o META_CAPI_ACCESS_TOKEN — evento no enviado");
    return;
  }

  const eventTime = input.eventTime ?? Math.floor(Date.now() / 1000);
  const userData = buildUserData(input.userData);

  // Meta exige al menos un identificador en user_data — si no hay nada,
  // el evento se rechaza. Mejor abortar localmente con un warning explícito.
  if (Object.keys(userData).length === 0) {
    console.warn(`[Meta CAPI] Evento ${input.eventName} sin user_data — saltando`);
    return;
  }

  const event: Record<string, unknown> = {
    event_name: input.eventName,
    event_time: eventTime,
    event_id: input.eventId,
    action_source: input.actionSource ?? "website",
    user_data: userData,
  };

  if (input.eventSourceUrl) event.event_source_url = input.eventSourceUrl;
  if (input.customData) event.custom_data = input.customData;

  const body: Record<string, unknown> = {
    data: [event],
    access_token: ACCESS_TOKEN,
  };

  if (TEST_EVENT_CODE) body.test_event_code = TEST_EVENT_CODE;

  const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error(`[Meta CAPI] ${input.eventName} falló (${res.status}):`, errBody);
      return;
    }

    const data = (await res.json()) as { events_received?: number };
    console.log(
      `[Meta CAPI] ${input.eventName} OK (event_id=${input.eventId}, recibidos=${data.events_received ?? "?"})${
        TEST_EVENT_CODE ? ` [TEST=${TEST_EVENT_CODE}]` : ""
      }`
    );
  } catch (err) {
    console.error(`[Meta CAPI] Error de red en ${input.eventName}:`, err);
  }
}

// Extrae IP y User-Agent de un Request de Next.js para el matching de CAPI.
export function extractRequestUserData(request: Request): {
  clientIpAddress?: string;
  clientUserAgent?: string;
} {
  const headers = request.headers;
  const forwardedFor = headers.get("x-forwarded-for");
  const realIp = headers.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0]?.trim() || realIp || undefined;
  const ua = headers.get("user-agent") ?? undefined;
  return {
    clientIpAddress: ip,
    clientUserAgent: ua,
  };
}
