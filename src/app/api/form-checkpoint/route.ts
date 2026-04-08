import { NextResponse } from "next/server";
import { checkpointShopifyCustomer } from "@/lib/shopify";

export async function POST(request: Request) {
  try {
    const { nombre, email, whatsapp, step } = await request.json();

    if (!nombre || !email || !whatsapp || !step) {
      return NextResponse.json(
        { error: "Faltan campos requeridos (nombre, email, whatsapp, step)" },
        { status: 400 }
      );
    }

    try {
      await checkpointShopifyCustomer({ nombre, email, whatsapp }, step);
    } catch (err) {
      console.error("[Checkpoint] Shopify error:", err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Checkpoint] Error:", error);
    return NextResponse.json(
      { error: "Error al guardar checkpoint" },
      { status: 500 }
    );
  }
}
