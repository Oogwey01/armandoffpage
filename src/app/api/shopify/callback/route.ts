import { NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";

function verifyHmac(query: URLSearchParams, secret: string): boolean {
  const hmac = query.get("hmac");
  if (!hmac) return false;

  const params = new URLSearchParams();
  query.forEach((value, key) => {
    if (key !== "hmac") {
      params.set(key, value);
    }
  });

  const sortedMessage = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  const computed = crypto
    .createHmac("sha256", secret)
    .update(sortedMessage)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(computed, "hex"),
      Buffer.from(hmac, "hex")
    );
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const shop = url.searchParams.get("shop");

  if (!code || !state || !shop) {
    return NextResponse.json(
      { error: "Missing required parameters (code, state, shop)" },
      { status: 400 }
    );
  }

  // Validate state against cookie (CSRF protection)
  const cookieStore = await cookies();
  const savedState = cookieStore.get("shopify_oauth_state")?.value;

  if (!savedState || savedState !== state) {
    return NextResponse.json(
      { error: "State mismatch — possible CSRF attack" },
      { status: 403 }
    );
  }

  // Validate HMAC signature
  const secret = process.env.SHOPIFY_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Missing SHOPIFY_SECRET env var" },
      { status: 500 }
    );
  }

  if (!verifyHmac(url.searchParams, secret)) {
    return NextResponse.json(
      { error: "HMAC validation failed" },
      { status: 403 }
    );
  }

  // Exchange authorization code for access token
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "Missing SHOPIFY_CLIENT_ID env var" },
      { status: 500 }
    );
  }

  const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: secret,
      code,
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    return NextResponse.json(
      { error: "Token exchange failed", details: err },
      { status: 502 }
    );
  }

  const tokenData = (await tokenRes.json()) as { access_token: string };
  const accessToken = tokenData.access_token;

  // Return HTML page with the token for the user to copy
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shopify OAuth Completado</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; background: #1a1a1a; color: #fff; }
    h1 { color: #C89D69; }
    h2 { color: #C89D69; margin-top: 32px; }
    .token-box { width: 100%; padding: 12px; font-family: monospace; font-size: 14px; border: 1px solid #C89D69; border-radius: 8px; background: #2a2a2a; color: #fff; cursor: pointer; box-sizing: border-box; }
    .warning { color: #999; font-size: 13px; margin-top: 16px; }
    ol { line-height: 1.8; }
    code { background: #2a2a2a; padding: 2px 6px; border-radius: 4px; color: #C89D69; }
    .success { background: #1a3a1a; border: 1px solid #2a6a2a; padding: 12px 16px; border-radius: 8px; margin-bottom: 24px; }
  </style>
</head>
<body>
  <div class="success">OAuth completado exitosamente</div>
  <h1>Tu Access Token de Shopify</h1>
  <p>Copia este token y guardalo como variable de entorno <code>SHOPIFY_ACCESS_TOKEN</code>.</p>
  <input type="text" value="${accessToken}" readonly class="token-box" onclick="this.select()" />
  <p class="warning">
    <strong>Seguridad:</strong> No compartas esta pagina ni guardes el enlace. Cierra esta pestana despues de copiar el token.
  </p>
  <h2>Siguientes pasos</h2>
  <ol>
    <li>Copia el token de arriba</li>
    <li>Ve a <strong>Vercel Dashboard</strong> &gt; Project Settings &gt; Environment Variables</li>
    <li>Agrega <code>SHOPIFY_ACCESS_TOKEN</code> con el valor copiado</li>
    <li>Tambien pegalo en tu archivo <code>.env.local</code> para desarrollo local</li>
    <li>Redespliega el proyecto en Vercel</li>
    <li>Prueba llenando el formulario de calificacion</li>
  </ol>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Set-Cookie": "shopify_oauth_state=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax",
    },
  });
}
