import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBaseUrl } from '@/lib/url';
import { toCurrentColor } from '@/lib/svg';
import styles from './page.module.scss';
import { FontFamily } from '@/types/fonts';
import PreviewSwitcher from './PreviewSwitcher';

interface PageProps { params: Promise<{ id: string }>; }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const base = await getBaseUrl();
    const res = await fetch(`${base}/api/familyDetails`, { cache: 'no-store' });
    if (!res.ok) return {};
    const family = (await res.json()) as FontFamily;
    return { title: `${family.foundry.name} ${family.name}` };
  } catch {
    return {};
  }
}

async function fetchFontDetails(id: string): Promise<FontFamily> {
  try {
    const base = await getBaseUrl();
    const res = await fetch(`${base}/api/familyDetails`, { cache: 'no-store' });
    if (res.status === 404) notFound();
    if (!res.ok) throw new Error(`Failed to load family details: ${res.status}`);
    try {
      return (await res.json()) as FontFamily;
    } catch (parseErr) {
      throw new Error('Invalid JSON from /api/familyDetails');
    }
  } catch (err) {
    notFound();
  }
}

export default async function FontDetailsPage({ params }: PageProps) {
  const p = await params;
  const familyId = p.id;
  const family = await fetchFontDetails(familyId);

  const alphabetSvg = toCurrentColor(family.images.alphabet.svg);
  const pangramSvg = family.images.pangram ? toCurrentColor(family.images.pangram.svg) : null;

  return (
    <div className="container">
      <div className={styles.wrap}>
        <div className={styles.grid}>
          <div className={styles.preview}>
            <PreviewSwitcher
              familyName={family.name}
              alphabetSvg={alphabetSvg}
              pangramSvg={pangramSvg}
            />
          </div>
          <aside className={styles.side} aria-label="Family info">
            <h2 className={styles.sideTitle}>{family.foundry.name}</h2>
            <p className={styles.sidePara}>From {family.name}</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
