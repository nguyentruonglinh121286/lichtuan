import { NextResponse } from 'next/server';
import { writeScheduleJSON } from '../../../../lib/blob'; // <-- sửa thành relative

export const runtime = 'edge';
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const text = await req.text();
    const url = await writeScheduleJSON(text);
    return NextResponse.json({ ok: true, url });
  } catch (err: any) {
    return NextResponse.json({ ok: false, message: String(err?.message || err) });
  }
}
