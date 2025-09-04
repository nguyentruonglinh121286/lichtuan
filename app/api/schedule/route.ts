// app/api/schedule/route.ts
export const runtime = 'nodejs';          // QUAN TRỌNG: tránh Edge gây lỗi undici
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

    // phá cache CDN của Blob
    const res = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) {
      return NextResponse.json({ week: 'Tuần (chưa có dữ liệu)', days: [] });
    }

    const json = await res.json();
    return NextResponse.json(json, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (err) {
    console.error('Schedule API error:', err);
    return NextResponse.json({ week: 'Tuần (chưa có dữ liệu)', days: [] });
  }
}
