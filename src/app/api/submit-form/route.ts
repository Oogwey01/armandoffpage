import { NextResponse } from "next/server";
import { createShopifyCustomer } from "@/lib/shopify";

export async function POST(request: Request) {
  try {
    const data = await request.json();

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
      await createShopifyCustomer(data);
    } catch (shopifyError) {
      console.error("[Shopify] Unexpected error:", shopifyError);
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
