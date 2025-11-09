"use client";

import Link from 'next/link';

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Fonts App Home"
      style={{
        fontWeight: 700,
        fontSize: '16px',
        letterSpacing: '.5px',
        display: 'inline-flex',
        alignItems: 'center'
      }}
    >
      <span>Fonts App</span>
    </Link>
  );
}
