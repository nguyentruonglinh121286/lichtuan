// app/api/admin/publish/route.ts
import { NextResponse } from 'next/server';
import { writeScheduleJSON } from '../../../../lib/blob';

export const runtime = 'edge';
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    if (!payload || typeof payload !== 'object' || !payload.week || !Array.isArray(payload.days)) {
      return NextResponse.json(
        { ok: false, message: 'Payload không hợp lệ. Cần "week" và "days" (array).' },
        { status: 400 }
      );
    }

    const url = await writeScheduleJSON(payload);
    return NextResponse.json({ ok: true, url });
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: e?.message ?? 'Lỗi không xác định' }, { status: 500 });
  }
}
