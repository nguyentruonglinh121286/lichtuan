export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { writeScheduleJSON } from '../../../lib/blob';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ ok: false, message: 'Invalid JSON body' }, { status: 400 });
    }
    const publicUrl = await writeScheduleJSON(body);
    return NextResponse.json({ ok: true, url: publicUrl }, { status: 200 });
  } catch (e: any) {
    console.error('Publish error:', e);
    return NextResponse.json({ ok: false, message: e?.message ?? 'Publish failed' }, { status: 500 });
  }
}
