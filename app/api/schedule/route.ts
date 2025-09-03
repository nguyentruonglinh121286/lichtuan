// app/api/schedule/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
// TỪ /app/api/schedule/route.ts -> /app/lib/blob.ts
import { readScheduleURL } from '../../lib/blob';

const EMPTY = { week: 'Tuần (chưa có dữ liệu)', days: [] as any[] };

export async function GET(req: Request) {
  try {
    const url = await readScheduleURL();
    if (!url) {
      return NextResponse.json(EMPTY, {
        headers: { 'Cache-Control': 'no-store' },
      });
    }

    const blobRes = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
    if (!blobRes.ok) {
      return NextResponse.json(EMPTY, {
        headers: { 'Cache-Control': 'no-store' },
      });
    }

    const data = await blobRes.json().catch(() => null);
    const json = data ?? EMPTY;

    const pretty = new URL(req.url).searchParams.get('pretty');
    const body =
      pretty && pretty !== '0'
        ? JSON.stringify(json, null, 2) + '\n'
        : JSON.stringify(json);

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('Schedule API error:', err);
    return NextResponse.json(EMPTY, {
      headers: { 'Cache-Control': 'no-store' },
    });
  }
}
