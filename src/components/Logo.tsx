"use client";

import Link from 'next/link';

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Fonts App Home"
      style={{
        display: 'inline-flex',
        alignItems: 'center'
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 24,
          height: 24,
          display: 'inline-block',
          backgroundColor: 'currentColor',
          WebkitMask: 'url(/logo.svg) no-repeat center / contain',
          mask: 'url(/logo.svg) no-repeat center / contain',
        }}
      />
    </Link>
  );
}
