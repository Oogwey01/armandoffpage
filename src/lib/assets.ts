const CDN_BASE = process.env.NEXT_PUBLIC_ASSETS_CDN_URL?.replace(/\/$/, "") ?? "";

export function asset(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const trimmed = path.replace(/^\//, "");
  return CDN_BASE ? `${CDN_BASE}/${trimmed}` : `/${trimmed}`;
}
