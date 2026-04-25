import { NextResponse } from "next/server";
import { sendCapiEvent, extractRequestUserData } from "@/lib/meta-capi";

// Proxy CAPI para eventos disparados desde el navegador.
// El cliente fija un eventId; ese mismo id viaja por browser pixel y por aquí
// para que Meta deduplique los dos hits en uno solo.

interface ProxyBody {
  eventName?: string;
  eventId?: string;
  customData?: Record<string, unknown>;
  userData?: { email?: string; phone?: string };
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
}

export async function POST(request: Request) {
  let body: ProxyBody;
  try {
    body = (await request.json()) as ProxyBody;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { eventName, eventId } = body;
  if (!eventName || !eventId) {
    return NextResponse.json(
      { error: "eventName y eventId son requeridos" },
      { status: 400 }
    );
  }

  const reqData = extractRequestUserData(request);

  // Dispara y olvida — no bloqueamos la respuesta esperando a Graph API.
  void sendCapiEvent({
    eventName,
    eventId,
    eventSourceUrl: body.eventSourceUrl,
    userData: {
      email: body.userData?.email,
      phone: body.userData?.phone,
      fbp: body.fbp,
      fbc: body.fbc,
      ...reqData,
    },
    customData: body.customData,
  });

  return NextResponse.json({ success: true });
}
