import { NextResponse } from 'next/server';
import { setScheduleJson } from '../../../../lib/blob'; // <- 4 dấu .. (QUAN TRỌNG)

export const runtime = 'edge';
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const url = await setScheduleJson(body);
    return NextResponse.json({ ok: true, url });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'INVALID_JSON' }, { status: 400 });
  }
}
