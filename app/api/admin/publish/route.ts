export const runtime = 'edge';
export const revalidate = 0;

import { NextResponse } from 'next/server';
// đi 4 bậc: publish -> admin -> api -> app -> (root) -> lib/blob
import { writeScheduleJSON } from '../../../../lib/blob';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const url = await writeScheduleJSON(data);
    return NextResponse.json({ ok: true, url });
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: String(e?.message ?? e) });
  }
}
