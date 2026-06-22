import { fetchWorldCupMatches } from "@/lib/apiClient";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const matches = await fetchWorldCupMatches();
    return NextResponse.json(matches);
  } catch (error) {
    console.error("Error in matches API route:", error);
    return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 });
  }
}
