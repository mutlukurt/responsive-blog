import { NextResponse } from "next/server";
import { buildJsonFeed } from "@/lib/feeds";

export const dynamic = "force-static";

export async function GET() {
  const json = buildJsonFeed();
  return NextResponse.json(json, { headers: { "Cache-Control": "public, max-age=3600" } });
}


