import { FamilyDetailsPayload } from '@/types/fonts';
import { cache } from 'react';

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
  const index = await buildFamiliesIndex();
  return index.get(id) ?? null;
});