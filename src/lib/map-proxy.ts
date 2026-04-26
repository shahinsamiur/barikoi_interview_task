export function buildProxyTileUrl(baseUrl: string, tileUrl: string): string {
  const encoded = encodeURIComponent(tileUrl)
    .replace(/%7Bz%7D/gi, "{z}")
    .replace(/%7Bx%7D/gi, "{x}")
    .replace(/%7By%7D/gi, "{y}");

  return `${baseUrl}/api/map/tiles?url=${encoded}`;
}

export function getBaseUrl(req: Request): string {
  const host = req.headers.get("host");
  const url = new URL(req.url);
  const protocol = url.protocol;
  return `${protocol}//${host}`;
}
