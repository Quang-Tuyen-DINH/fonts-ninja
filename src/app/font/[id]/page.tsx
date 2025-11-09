import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFamilyById } from '@/lib/data';
import { toCurrentColor } from '@/lib/svg';
import styles from './page.module.scss';
import { FontFamily } from '@/types/fonts';
import PreviewSwitcher from './PreviewSwitcher';

interface PageProps { params: Promise<{ id: string }>; }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const p = await params;
  const family = await getFamilyById(p.id);
  if (!family) return {};
  return { title: `${family.foundry.name} ${family.name}` };
}

async function fetchFontDetails(id: string): Promise<FontFamily> {
  const family = await getFamilyById(id);
  if (!family) notFound();
  return family;
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
