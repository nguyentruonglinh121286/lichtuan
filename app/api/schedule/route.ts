// app/api/schedule/route.ts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { readScheduleURL } from '../../lib/blob'; // chỉnh đường tương đối đúng repo của bạn

export async function GET() {
  try {
    const url = await readScheduleURL();
    if (!url) {
      return NextResponse.json({ week: 'Tuần (chưa có dữ liệu)', days: [] });
    }
    // phá cache CDN
    const res = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
    const json = await res.json();
    return NextResponse.json(json);
  } catch {
    return NextResponse.json({ week: 'Tuần (chưa có dữ liệu)', days: [] });
  }
}
