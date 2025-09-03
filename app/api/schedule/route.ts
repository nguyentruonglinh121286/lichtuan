// app/api/schedule/route.ts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { readScheduleURL } from '@/app/lib/blob'; // Đường dẫn chính xác

export async function GET() {
  try {
    const url = await readScheduleURL();
    if (!url) {
      return NextResponse.json({ week: 'Tuần (chưa có dữ liệu)', days: [] });
    }

    // phá cache CDN bằng query string
    const res = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
    const json = await res.json();
    return NextResponse.json(json);
  } catch (err) {
    console.error('Schedule API error:', err);
    return NextResponse.json({ week: 'Tuần (chưa có dữ liệu)', days: [] });
  }
}
