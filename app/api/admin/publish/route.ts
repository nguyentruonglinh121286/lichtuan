// app/api/admin/publish/route.ts
import { NextResponse } from 'next/server';
import { writeScheduleJSON } from '@/lib/blob';

export const runtime = 'edge';

export async function POST(req: Request) {
  let payload: unknown;

  try {
    const text = await req.text();
    payload = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { ok: false, message: 'JSON không hợp lệ' },
      { status: 400 }
    );
  }

  const result = await writeScheduleJSON(payload);
  if (result.ok) {
    return NextResponse.json({ ok: true, url: result.url });
  }
  return NextResponse.json(
    { ok: false, message: result.error ?? 'Ghi blob thất bại' },
    { status: 500 }
  );
}
