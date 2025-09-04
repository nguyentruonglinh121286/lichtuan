import { NextResponse } from 'next/server';
import { writeScheduleJSON } from '@/lib/blob';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const json = await req.json();

    if (!json || typeof json !== 'object') {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    // Lưu trực tiếp JSON vào Vercel Blob với tên schedule.json
    const blob = await writeScheduleJSON(json);

    return NextResponse.json({
      ok: true,
      url: blob.url,
    });
  } catch (err: any) {
    console.error('Publish error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
