// app/api/admin/publish/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
// ✅ Import đúng vị trí blob helper
import { writeScheduleJSON } from '@/app/lib/blob';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // (tùy chọn) Validate rất nhẹ
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ ok: false, message: 'Invalid JSON body' }, { status: 400 });
    }

    // Ghi JSON lên Vercel Blob (public)
    const publicUrl = await writeScheduleJSON(body);

    return NextResponse.json({ ok: true, url: publicUrl }, { status: 200 });
  } catch (e: any) {
    console.error('Publish error:', e);
    return NextResponse.json(
      { ok: false, message: e?.message ?? 'Publish failed' },
      { status: 500 }
    );
  }
}
