import { NextResponse } from "next/server";
import { getTrending } from "../../../lib/trendingStore";

export async function GET() {
  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    items: getTrending(),
  });
}
