'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { FontFamily } from '@/types/fonts';
import { toCurrentColor } from '@/lib/svg';
import styles from './Card.module.scss';

export type CardProps = { family: FontFamily };

export function Card({ family }: CardProps) {
  const priceText = family.price?.formatedPrice ?? 'N/A';
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [svgHtml, setSvgHtml] = useState<string | null>(null);

  useEffect(() => {
    if (inView) return;
    const el = thumbRef.current;
    if (!el) return;
    // Avoid processing and injecting possibly heavy inline SVGs for items not yet visible
    const obs = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setInView(true);
          try {
            const html = toCurrentColor(family.images.alphabet.svg);
            setSvgHtml(html);
          } catch (err) {
          }
          obs.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [family.images.alphabet.svg, inView]);

  return (
    <Link href={`/font/${family.idFamily}`} aria-label={`${family.foundry.name} ${family.name}`}>
      <article className={styles.card}>
        <div
          ref={thumbRef}
          className={`${styles.thumb} ${!inView ? styles.loading : ''}`}
          data-svg-wrap
          dangerouslySetInnerHTML={inView && svgHtml ? { __html: svgHtml } : undefined}
        />
        <h3 className={styles.name}>{family.name}</h3>
        <div className={styles.meta}>
          <span>{family.foundry.name}</span>
          <span>{priceText}</span>
          <span>{family.totalFonts} styles</span>
        </div>
      </article>
    </Link>
  );
}