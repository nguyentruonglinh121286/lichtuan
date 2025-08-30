export const runtime = 'edge';
export const revalidate = 0;

import { NextResponse } from 'next/server';
// SAI trước đây: '../../../lib/blob'
import { writeScheduleJSON } from '../../../../lib/blob';  // <-- 4 dấu .. lên tới root rồi /lib/blob

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const url = await writeScheduleJSON(body);
    return NextResponse.json({ ok: true, url });
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: String(e?.message ?? e) });
  }
}
