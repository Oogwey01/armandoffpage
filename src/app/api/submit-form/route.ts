import { NextResponse } from "next/server";
import { createShopifyCustomer } from "@/lib/shopify";
import { sendCapiEvent, extractRequestUserData } from "@/lib/meta-capi";

interface SubmitFormBody {
  nombre?: string;
  email?: string;
  whatsapp?: string;
  businessUrl?: string;
  marketingChannels?: string[];
  adsInvestment?: string;
  monthlyRevenue?: string;
  goal90Days?: string;
  startWhen?: string;
  mainObstacle?: string;
  _meta?: { eventId?: string; fbp?: string; fbc?: string };
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as SubmitFormBody;

    // Validate required fields exist
    if (!data.nombre || !data.email) {
      return NextResponse.json(
        { error: "Campos requeridos faltantes" },
        { status: 400 }
      );
    }

    // Log for development
    console.log("Form submission received:", {
      nombre: data.nombre,
      email: data.email,
      whatsapp: data.whatsapp,
      businessUrl: data.businessUrl,
      marketingChannels: data.marketingChannels,
      adsInvestment: data.adsInvestment,
      monthlyRevenue: data.monthlyRevenue,
      goal90Days: data.goal90Days,
      startWhen: data.startWhen,
      mainObstacle: data.mainObstacle,
      timestamp: new Date().toISOString(),
    });

    // Save customer to Shopify with revenue-based category tag
    try {
      await createShopifyCustomer(data as Parameters<typeof createShopifyCustomer>[0]);
    } catch (shopifyError) {
      console.error("[Shopify] Unexpected error:", shopifyError);
    }

    // Meta Conversions API — mismo eventId que el browser pixel para deduplicar
    const meta = data._meta;
    if (meta?.eventId) {
      const reqData = extractRequestUserData(request);
      void sendCapiEvent({
        eventName: "Lead",
        eventId: meta.eventId,
        eventSourceUrl: request.headers.get("referer") ?? undefined,
        userData: {
          email: data.email,
          phone: data.whatsapp,
          firstName: data.nombre,
          fbp: meta.fbp,
          fbc: meta.fbc,
          ...reqData,
        },
        customData: {
          content_name: "Qualification Form",
          content_category: "Lead",
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
