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
    return NextResponse.json({
      ...data,
      page,
      totalFamilies: data.totalFamilies ?? data.families.length
    });
  } catch (err: any) {
    if (err.message === 'page_out_of_range') {
      return NextResponse.json({ error: 'Page out of range' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Families not found' }, { status: 404 });
  }
}