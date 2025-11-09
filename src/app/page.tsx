import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { FamiliesPagePayload } from '@/types/fonts';
import { FontsList } from '@/components/FontsList';
import { Pagination } from '@/components/Pagination';
import { getBaseUrl } from '@/lib/url';
import styles from './page.module.scss';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 24;

export async function generateMetadata({
  searchParams
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const page = Number.parseInt(searchParams?.page ?? '1', 10);
  const safe = Number.isNaN(page) ? 1 : page;
  return { title: `Home - Page ${safe}` };
}

async function fetchFamilies(page: number): Promise<{ families: FamiliesPagePayload['families']; totalPages: number }> {
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
    const json = (await res.json()) as { families: FamiliesPagePayload['families']; totalPages: number };
    return { families: json.families, totalPages: json.totalPages };
  } catch (parseErr) {
    throw new Error('Invalid JSON in families response');
  }
}

export default async function Home({ searchParams }: { searchParams?: { page?: string } }) {
  const pageRaw = searchParams?.page ?? DEFAULT_PAGE.toString();
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