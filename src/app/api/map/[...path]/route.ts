import { NextRequest, NextResponse } from "next/server";
import { buildProxyTileUrl, getBaseUrl } from "@/src/lib/map-proxy";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(req: NextRequest) {
  const urlParam = req.nextUrl.searchParams.get("url");

  if (!urlParam) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  const apiKey = process.env.BARIKOI_API_KEY!;
  const baseUrl = getBaseUrl(req);

  const lastSegment = req.nextUrl.pathname.split("/api/map/")[1] ?? "";
  const suffix = lastSegment.replace(/^[^.@]+/, "");

  const decoded = decodeURIComponent(urlParam);
  const upstream = new URL(decoded + suffix);
  upstream.searchParams.set("key", apiKey);

  const res = await fetch(upstream.toString());
  const contentType = res.headers.get("Content-Type") ?? "";

  if (contentType.includes("application/json")) {
    const json = await res.json();

    if (Array.isArray(json.tiles)) {
      json.tiles = json.tiles.map((t: string) => buildProxyTileUrl(baseUrl, t));
    }

    return NextResponse.json(json, {
      headers: {
        ...CORS_HEADERS,
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  const buffer = await res.arrayBuffer();
  return new NextResponse(buffer, {
    headers: {
      ...CORS_HEADERS,
      "Content-Type": contentType || "application/octet-stream",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
