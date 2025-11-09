import { NextResponse } from 'next/server';
import { loadFamiliesPage } from '@/lib/data';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get('page') || '1';
  const page = Number.parseInt(raw, 10);

  if (Number.isNaN(page)) {
    return NextResponse.json({ error: 'Invalid page parameter' }, { status: 400 });
  }

  try {
    const data = await loadFamiliesPage(page);

    let totalFamilies = 0;
    let totalPages = 3;
    for (let i = 1; i <= 3; i++) {
      try {
        const mod = await import(`@/data/fontFamiliesPage${i}.json`);
        totalFamilies += (mod.default?.families?.length ?? 0);
      } catch (err) {
      }
    }

    return NextResponse.json({
      page,
      totalPages,
      totalFamilies,
      families: data.families
    });
  } catch (err: any) {
    if (err.message === 'page_out_of_range') {
      return NextResponse.json({ error: 'Page out of range' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Families not found' }, { status: 404 });
  }
}