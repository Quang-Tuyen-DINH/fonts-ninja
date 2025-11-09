"use client";

import ThemeToggle from '@/components/ThemeToggle';
import { Logo } from '@/components/Logo';
import styles from './NavBar.module.scss';

export type NavBarProps = { themeInitial: string };

export function NavBar({ themeInitial }: NavBarProps) {
  return (
    <header className={styles.bar}>
      <div className="container">
        <div className={styles.inner}>
          <Logo />
          <ThemeToggle initial={themeInitial as any} />
        </div>
      </div>
    </header>
  );
}
