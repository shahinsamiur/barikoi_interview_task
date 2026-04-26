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
  const apiKey = process.env.BARIKOI_API_KEY!;
  const baseUrl = getBaseUrl(req);

  const styleUrl = new URL(
    "https://map.barikoi.com/styles/osm-liberty/style.json",
  );
  styleUrl.searchParams.set("key", apiKey);

  const res = await fetch(styleUrl.toString());
  const style = await res.json();

  if (style.sources) {
    for (const source of Object.values(style.sources) as any[]) {
      if (Array.isArray(source.tiles)) {
        source.tiles = source.tiles.map((t: string) =>
          buildProxyTileUrl(baseUrl, t),
        );
      }
      if (typeof source.url === "string") {
        source.url = `${baseUrl}/api/map/tiles?url=${encodeURIComponent(source.url)}`;
      }
    }
  }

  return NextResponse.json(style, {
    headers: {
      ...CORS_HEADERS,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
