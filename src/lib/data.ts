import { FamiliesPagePayload, FamilyDetailsPayload } from '@/types/fonts.type';

export async function loadFamiliesPage(page: number): Promise<FamiliesPagePayload> {
  if (page < 1 || page > 3) throw new Error('page_out_of_range');
  try {
    const mod = await import(`@/data/fontFamiliesPage${page}.json`);
    return mod.default as FamiliesPagePayload;
  } catch {
    throw new Error('families_page_not_found');
  }
}

export async function loadFamilyDetails(): Promise<FamilyDetailsPayload> {
  try {
    const mod = await import('@/data/fontDetails.json');
    return mod.default as FamilyDetailsPayload;
  } catch {
    throw new Error('family_details_not_found');
  }
}