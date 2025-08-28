import { NextResponse } from 'next/server';
import { writeScheduleJSON } from '@/lib/blob';

export async function POST(req: Request) {
  const pass = req.headers.get('x-admin-password');
  if (process.env.ADMIN_PASSWORD && pass !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
  }

  const json = await req.json();
  const url = await writeScheduleJSON(json);
  return NextResponse.json({ ok: true, url });
}
