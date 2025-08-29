// app/api/admin/publish/route.ts
export const runtime = 'edge';
export const revalidate = 0;

import { NextResponse } from 'next/server';
// BỎ alias '@/lib/blob' đi, dùng relative:
import { writeScheduleJSON } from '../../../lib/blob';

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const url = await writeScheduleJSON(json);
    return NextResponse.json({ ok: true, url });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, message: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
