import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { FamiliesPagePayload } from '@/types/fonts';
import { FontsList } from '@/components/FontsList';
import { Pagination } from '@/components/Pagination';
import { GET as familiesGET } from '@/app/api/families/route';
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
  try {
    const req = new Request(`http://internal/api/families?page=${page}&perPage=${DEFAULT_LIMIT}`);
    const res = await familiesGET(req);
    if (res.status === 404) notFound();
    if (!res.ok) throw new Error(`Failed to load families: ${res.status}`);
    const json = (await res.json()) as { families: FamiliesPagePayload['families']; totalPages: number };
    return { families: json.families, totalPages: json.totalPages };
  } catch (err) {
    notFound();
  }
}

export default async function Home({ searchParams }: { searchParams?: Promise<{ page?: string }> }) {
  const sp = await searchParams;
  const pageRaw = await sp?.page ?? DEFAULT_PAGE.toString();
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