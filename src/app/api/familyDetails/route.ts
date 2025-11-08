import { NextResponse } from 'next/server';
import { loadFamilyDetails } from '@/lib/data';

export async function GET() {
  try {
    const data = await loadFamilyDetails();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Family details not found' }, { status: 404 });
  }
}