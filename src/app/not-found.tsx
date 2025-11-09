"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './not-found.module.scss';

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    const t = setTimeout(() => {
      router.replace('/');
    }, 2500);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className={styles.wrap}>
      <h1 className={styles.heading}>404 – Not Found</h1>
      <p className={styles.notice}>The page you requested does not exist or the page number was out of range. Redirecting…</p>
    </main>
  );
}
