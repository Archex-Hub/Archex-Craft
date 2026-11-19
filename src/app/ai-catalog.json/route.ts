import { NextResponse } from "next/server";
import { aiCatalogManifest } from "@/lib/agentic/catalog";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(aiCatalogManifest, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400"
    }
  });
}
