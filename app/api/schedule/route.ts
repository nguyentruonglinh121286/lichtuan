export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { readScheduleURL } from '@/app/lib/blob';

function noCacheHeaders() {
  return {
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
    'Content-Type': 'application/json; charset=utf-8',
  };
}

export async function GET() {
  try {
    const url = await readScheduleURL();
    if (!url) {
      return NextResponse.json({ week: 'Tuần (chưa có dữ liệu)', days: [] }, { headers: noCacheHeaders() });
    }

    // Bypass cache CDN bằng querystring thời gian và cache: 'no-store'
    const res = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
    const json = await res.json();

    return NextResponse.json(json, { headers: noCacheHeaders() });
  } catch (err) {
    console.error('Schedule API error:', err);
    return NextResponse.json({ week: 'Tuần (chưa có dữ liệu)', days: [] }, { headers: noCacheHeaders() });
  }
}
