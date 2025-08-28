import { NextResponse } from 'next/server';
import { writeScheduleJSON } from '@/lib/blob';

export const runtime = 'nodejs';
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const body = await req.json(); // JSON full schedule
    const url = await writeScheduleJSON(body);
    return NextResponse.json({ ok: true, url });
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: e?.message || 'error' }, { status: 500 });
  }
}
