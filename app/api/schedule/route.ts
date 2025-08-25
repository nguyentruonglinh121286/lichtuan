import { NextResponse } from 'next/server';
import { readScheduleURL } from '../../../lib/blob';

export async function GET() {
  try {
    const url = await readScheduleURL();
    if (!url) return NextResponse.json({ week: 'Chưa có dữ liệu', days: [] });
    const res = await fetch(url, { cache: 'no-store' });
    const json = await res.json();
    return NextResponse.json(json);
  } catch (e:any) {
    return new NextResponse('Cannot read schedule', { status: 500 });
  }
}
