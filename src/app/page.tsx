import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { FamiliesPagePayload, FontFamily } from '@/types/fonts';
import { FontsList } from '@/components/FontsList';
import { Pagination } from '@/components/Pagination';
import { getBaseUrl } from '@/lib/url';
import styles from './page.module.scss';

const DEFAULT_PAGE = 1;

export async function generateMetadata({
  searchParams
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const page = Number.parseInt((await searchParams)?.page ?? '1', 10);
  const safe = Number.isNaN(page) ? 1 : page;
  return { title: `Home - Page ${safe}` };
}

interface FamiliesApiResponse { page: number; totalPages: number; totalFamilies: number; families: FontFamily[] }

async function fetchFamilies(page: number): Promise<FamiliesApiResponse> {
  const base = await getBaseUrl();
  const url = `${base}/api/families?page=${page}`;
  let res: Response;
  try {
    res = await fetch(url, { cache: 'no-store' });
  } catch (networkErr) {
    throw new Error(`Network error fetching families: ${(networkErr as Error).message}`);
  }
  if (res.status === 404) notFound();
  if (!res.ok) throw new Error(`Failed to load families: ${res.status}`);
  try {
    const json = (await res.json()) as FamiliesApiResponse;
    return json;
  } catch (parseErr) {
    throw new Error('Invalid JSON in families response');
  }
}

export default async function Home({ searchParams }: { searchParams?: Promise<{ page?: string }> }) {
  const pageRaw = (await searchParams)?.page ?? DEFAULT_PAGE.toString();
  const page = Number.parseInt(pageRaw, 10);
  if (Number.isNaN(page) || page < 1) notFound();
  
  const { families, totalPages } = await fetchFamilies(page);
  if (page > totalPages) notFound();

  return (
    <main>
      <div className={styles.cardsArea}>
        <section className={styles.grid}>
          <FontsList families={families} page={page} totalPages={totalPages} />
        </section>
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </main>
  );
}