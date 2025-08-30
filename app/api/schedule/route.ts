export const runtime = 'edge';
export const revalidate = 0;

import { NextResponse } from 'next/server';
// SAI trước đây: '../../lib/blob'
import { readScheduleURL } from '../../../lib/blob';  // <-- 3 dấu .. lên tới root rồi /lib/blob

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
