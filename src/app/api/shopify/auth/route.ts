import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(request: Request) {
  const shop = process.env.SHOPIFY_STORE_URL;
  const clientId = process.env.SHOPIFY_CLIENT_ID;

  if (!shop || !clientId) {
    return NextResponse.json(
      { error: "Missing SHOPIFY_STORE_URL or SHOPIFY_CLIENT_ID env vars" },
      { status: 500 }
    );
  }

  const state = crypto.randomBytes(32).toString("hex");
  const scopes = "write_customers,read_customers";

  const origin = new URL(request.url).origin;
  const redirectUri = `${origin}/api/shopify/callback`;

  const authUrl = new URL(`https://${shop}/admin/oauth/authorize`);
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("scope", scopes);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authUrl.toString());
  response.cookies.set("shopify_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });

  return response;
}
