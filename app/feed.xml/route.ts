import { NextResponse } from "next/server";
import { buildRssFeed } from "@/lib/feeds";

export const dynamic = "force-static";

export async function GET() {
  const rss = buildRssFeed();
  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}


