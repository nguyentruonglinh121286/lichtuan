// app/api/admin/publish/route.ts
import { NextResponse } from 'next/server';
import { setScheduleJson } from '@/lib/blob';

export const runtime = 'edge';
export const revalidate = 0;

// POST /api/admin/publish
// Body: JSON lịch tuần (week, note, highlights, days)
export async function POST(req: Request) {
  try {
    const body = await req.json();        // validate nhẹ nếu muốn
    const url = await setScheduleJson(body);
    return NextResponse.json({ ok: true, url });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: 'INVALID_JSON' },
      { status: 400 }
    );
  }
}
