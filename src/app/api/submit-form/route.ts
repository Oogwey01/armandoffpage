import { NextResponse } from "next/server";
import { createShopifyCustomer } from "@/lib/shopify";
import { sendCapiEvent, extractRequestUserData } from "@/lib/meta-capi";

interface SubmitFormBody {
  nombre?: string;
  nombreNegocio?: string;
  productoServicio?: string;
  canalVentaActual?: string;
  presenciaMarca?: string;
  inversionAds?: string;
  urgenciaResultados?: string;
  whatsapp?: string;
  _meta?: { eventId?: string; fbp?: string; fbc?: string };
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as SubmitFormBody;

    // Validate required fields exist
    if (!data.nombre || !data.whatsapp) {
      return NextResponse.json(
        { error: "Campos requeridos faltantes" },
        { status: 400 }
      );
    }

    // Log for development
    console.log("Form submission received:", {
      nombre: data.nombre,
      nombreNegocio: data.nombreNegocio,
      productoServicio: data.productoServicio,
      canalVentaActual: data.canalVentaActual,
      presenciaMarca: data.presenciaMarca,
      inversionAds: data.inversionAds,
      urgenciaResultados: data.urgenciaResultados,
      whatsapp: data.whatsapp,
      timestamp: new Date().toISOString(),
    });

    // Save customer to Shopify with ads-investment-based category tag
    try {
      await createShopifyCustomer(data as Parameters<typeof createShopifyCustomer>[0]);
    } catch (shopifyError) {
      console.error("[Shopify] Unexpected error:", shopifyError);
    }

    // Meta Conversions API — mismo eventId que el browser pixel para deduplicar.
    // CompleteRegistration marca que terminaron el form; el Lead real se dispara
    // cuando el usuario hace clic en WhatsApp (ese es el CTA que optimiza la campaña).
    const meta = data._meta;
    if (meta?.eventId) {
      const reqData = extractRequestUserData(request);
      void sendCapiEvent({
        eventName: "CompleteRegistration",
        eventId: meta.eventId,
        eventSourceUrl: request.headers.get("referer") ?? undefined,
        userData: {
          phone: data.whatsapp,
          firstName: data.nombre,
          fbp: meta.fbp,
          fbc: meta.fbc,
          ...reqData,
        },
        customData: {
          content_name: "Qualification Form",
          content_category: "Registration",
          currency: "MXN",
        },
      });
    }

    // Forward to webhook if configured
    const webhookUrl = process.env.FORM_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
        }),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Formulario enviado exitosamente",
    });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Error al procesar el formulario" },
      { status: 500 }
    );
  }
}
