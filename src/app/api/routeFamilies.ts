import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);

  try {
    const data = await import(`@/data/fontFamiliesPage${page}.json`);
    return NextResponse.json(data.default);
  } catch {
    return NextResponse.json(
      { error: `No data found for page ${page}` },
      { status: 404 }
    );
  }
}