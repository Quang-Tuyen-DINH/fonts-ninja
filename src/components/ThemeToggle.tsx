"use client";

import { useCallback, useEffect, useState } from 'react';
import { COOKIE_MAX_AGE, THEME_COOKIE, ThemeMode } from '@/lib/theme';
import styles from './ThemeToggle.module.scss';

function readCookie(): ThemeMode {
  if (typeof document === 'undefined') return 'light';
  const matchData = document.cookie.match(new RegExp(`${THEME_COOKIE}=([^;]+)`));
  const cookieValue = matchData && (matchData as RegExpMatchArray)[1];
  return cookieValue === 'dark' ? 'dark' : 'light';
}

export type ThemeToggleProps = { initial: ThemeMode };

export default function ThemeToggle({ initial }: ThemeToggleProps) {
  const [mode, setMode] = useState<ThemeMode>(initial);

  const apply = useCallback((next: ThemeMode) => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', next);
      document.cookie = `${THEME_COOKIE}=${next}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
    }
  }, []);

  useEffect(() => {
    const m = readCookie();
    setMode(m);
    apply(m);
  }, [apply]);

  const toggle = () => {
    setMode((prev) => {
      const next: ThemeMode = prev === 'light' ? 'dark' : 'light';
      apply(next);
      return next;
    });
  };

  return (
    <button
      className={styles.toggle}
      onClick={toggle}
      aria-label="Switch theme"
      aria-pressed={mode === 'dark'}
    >
      <span className={styles.label}>Switch theme</span>
    </button>
  );
}
