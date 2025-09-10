export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { writeScheduleJSON, readScheduleURL } from '@/app/lib/blob';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate rất cơ bản (tuần nào cũng có “week” + “days”)
    if (!body || typeof body !== 'object' || !body.week || !Array.isArray(body.days)) {
      return NextResponse.json({ ok: false, message: 'JSON không đúng định dạng' }, { status: 400 });
    }

    const url = await writeScheduleJSON(body);
    const nowUrl = await readScheduleURL();

    return NextResponse.json(
      { ok: true, url, nowUrl, message: 'Published' },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    );
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, message: e?.message ?? 'Publish error' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    );
  }
}
