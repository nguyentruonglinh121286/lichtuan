import { NextResponse } from 'next/server';
import { readScheduleURL } from '@/lib/blob';

export const runtime = 'nodejs';     // hoặc 'edge' nếu không gọi SDK đặc thù
export const revalidate = 0;

export async function GET() {
  try {
    const url = await readScheduleURL();
    if (!url) {
      return NextResponse.json({ week: 'Tuần (chưa có dữ liệu)', days: [] });
    }
    const res = await fetch(url, { cache: 'no-store' });
    const json = await res.json();
    return NextResponse.json(json);
  } catch {
    return NextResponse.json({ week: 'Tuần (chưa có dữ liệu)', days: [] });
  }
}
