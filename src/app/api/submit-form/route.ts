import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields exist
    if (!data.firstName || !data.email) {
      return NextResponse.json(
        { error: "Campos requeridos faltantes" },
        { status: 400 }
      );
    }

    // Log for development
    console.log("Form submission received:", {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      country: data.country,
      city: data.city,
      businessStage: data.businessStage,
      industry: data.industry,
      businessType: data.businessType,
      challenges: data.challenges,
      marketingBudget: data.marketingBudget,
      roas: data.roas,
      availability: data.availability,
      referralSource: data.referralSource,
      timestamp: new Date().toISOString(),
    });

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
