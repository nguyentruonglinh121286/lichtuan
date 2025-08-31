export const revalidate = 0;

import { NextResponse } from 'next/server';
// app/api/admin/publish/route.ts  →  app/lib/blob.ts
import { writeScheduleJSON } from '../../../lib/blob';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const url = await writeScheduleJSON(data);
    return NextResponse.json({ ok: true, url });
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: String(e?.message ?? e) });
  }
}
