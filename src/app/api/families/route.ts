import { NextResponse } from 'next/server';
import { loadFamiliesPage, getFamilyById } from '@/lib/data';

const TOTAL_PAGES = 3;

export async function listFamilies(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get('page') || '1';
  const page = Number.parseInt(raw, 10);

  if (Number.isNaN(page)) {
    return NextResponse.json({ error: 'Invalid page parameter' }, { status: 400 });
  }

  try {
    const data = await loadFamiliesPage(page);

    let totalFamilies = 0;
    for (let i = 1; i <= 3; i++) {
      try {
        const mod = await import(`@/data/fontFamiliesPage${i}.json`);
        totalFamilies += (mod.default?.families?.length ?? 0);
      } catch (err) {
      }
    }

    return NextResponse.json({
      page,
      totalPages: TOTAL_PAGES,
      totalFamilies,
      families: data.families
    });
  } catch (err) {
    return NextResponse.json({ error: 'Families not found' }, { status: 404 });
  }
}

export async function getFamily(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  try {
    const family = await getFamilyById(id);
    return NextResponse.json({ family });
  } catch (err) {
    return NextResponse.json({ error: 'Family not found' }, { status: 404 });
  }
}