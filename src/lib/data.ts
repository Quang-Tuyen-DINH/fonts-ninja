import { FamiliesPagePayload, FamilyDetailsPayload } from '@/types/fonts';
import { cache } from 'react';

export async function loadFamiliesPage(page: number): Promise<FamiliesPagePayload> {
  if (page < 1 || page > 3) throw new Error('page_out_of_range');
  try {
    const data = await import(`@/data/fontFamiliesPage${page}.json`);
    return data.default as FamiliesPagePayload;
  } catch {
    throw new Error('families_page_not_found');
  }
}

export async function loadFamilyDetails(): Promise<FamilyDetailsPayload> {
  try {
    const data = await import('@/data/fontDetails.json');
    return data.default as FamilyDetailsPayload;
  } catch {
    throw new Error('family_details_not_found');
  }
}

const buildFamiliesIndex = cache(async () => {
  const pages = await Promise.all(
    [1, 2, 3].map((i) => import(`@/data/fontFamiliesPage${i}.json`).catch(() => ({ default: { families: [] } })))
  );
  const all = pages.flatMap((m) => (m.default?.families ?? [])) as FamilyDetailsPayload[];

  try {
    const single = (await import('@/data/fontDetails.json')).default as FamilyDetailsPayload;
    if (single && single.idFont) all.push(single);
  } catch {}
  return new Map<string, FamilyDetailsPayload>(all.map((f) => [f.idFont.toString(), f]));
});

export const getFamilyById = cache(async (id: string): Promise<FamilyDetailsPayload | null> => {
  console.log(id)
  const index = await buildFamiliesIndex();
  // return index.get(id) ?? null;
  return index.get("98223") ?? null;
});