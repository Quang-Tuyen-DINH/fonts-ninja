"use client";

import styles from './SkeletonCard.module.scss';

export function SkeletonCard() {
  return (
    <article className={styles.card} aria-hidden="true">
      <div className={`${styles.thumb} ${styles.shimmer}`} />
      <div className={`${styles.title} ${styles.shimmer}`} />
      <div className={styles.rowWrap}>
        <div className={`${styles.row} ${styles.shimmer}`} />
        <div className={`${styles.row} ${styles.shimmer}`} />
        <div className={`${styles.row} ${styles.shimmer}`} />
        <div className={`${styles.row} ${styles.shimmer}`} />
      </div>
    </article>
  );
}
