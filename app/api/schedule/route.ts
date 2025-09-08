export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { readScheduleURL } from '../../lib/blob';

export async function GET() {
  try {
    const url = await readScheduleURL();
    if (!url) return NextResponse.json({ week: 'Tuần (chưa có dữ liệu)', days: [] });

    const res = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
    const json = await res.json();
    return NextResponse.json(json, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    console.error('Schedule API error:', e);
    return NextResponse.json({ week: 'Tuần (chưa có dữ liệu)', days: [] }, { status: 200 });
  }
}
