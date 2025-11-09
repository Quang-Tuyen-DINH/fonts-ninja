"use client";

import Link from 'next/link';
import styles from './Pagination.module.scss';

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const hrefFor = (pageNumber: number) => {
    const q = new URLSearchParams();
    if (pageNumber > 1) q.set('page', String(pageNumber));
    const qs = q.toString();
    return qs ? `/?${qs}` : '/';
  };

  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <nav className={styles.bar} aria-label="Pagination">
      {isPrevDisabled ? (
        <span className={`${styles.btn} ${styles.disabled}`} aria-disabled="true" aria-label="Previous page (disabled)">←</span>
      ) : (
        <Link className={styles.btn} href={hrefFor(prevPage)} aria-label={`Go to previous page, page ${prevPage}`} rel="prev">←</Link>
      )}
      {pageNumbers.map((pageNumber) => (
        <Link
          key={pageNumber}
          className={styles.btn + ' ' + (pageNumber === currentPage ? styles.active : '')}
          href={hrefFor(pageNumber)}
          aria-current={pageNumber === currentPage ? 'page' : undefined}
          aria-label={`Go to page ${pageNumber}`}
          data-page={pageNumber}
        >
          {pageNumber}
        </Link>
      ))}
      {isNextDisabled ? (
        <span className={`${styles.btn} ${styles.disabled}`} aria-disabled="true" aria-label="Next page (disabled)">→</span>
      ) : (
        <Link className={styles.btn} href={hrefFor(nextPage)} aria-label={`Go to next page, page ${nextPage}`} rel="next">→</Link>
      )}
    </nav>
  );
}