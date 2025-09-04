// app/api/schedule/route.ts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { readScheduleURL } from '@/app/lib/blob';

export async function GET() {
  try {
    const url = await readScheduleURL();
    if (!url) {
      return NextResponse.json({ week: 'Tuần (chưa có dữ liệu)', days: [] });
    }
    // Phá cache CDN của Blob
    const resp = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
    if (!resp.ok) {
      return NextResponse.json({ week: 'Tuần (chưa có dữ liệu)', days: [] });
    }
    const json = await resp.json();
    return NextResponse.json(json);
  } catch {
    return NextResponse.json({ week: 'Tuần (chưa có dữ liệu)', days: [] });
  }
}
