import { headers } from 'next/headers';

export async function getBaseUrl(): Promise<string> {
  try {
    const h = await headers();
    const host = h.get('host');
    const proto = h.get('x-forwarded-proto') ?? 'http';
    if (host) return `${proto}://${host}`;
  } catch {}
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  return 'http://localhost:3000';
}
