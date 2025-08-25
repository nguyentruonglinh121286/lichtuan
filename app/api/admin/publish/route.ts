import { NextResponse } from 'next/server';
import { writeScheduleJSON } from '../../../../lib/blob';

export async function POST(req: Request) {
  if (!process.env.ADMIN_PASSWORD) return new NextResponse('ADMIN_PASSWORD not set', { status: 500 });
  const body = await req.json();
  if (!body || !body.week || !Array.isArray(body.days)) {
    return new NextResponse('Invalid schema: require "week" and array "days"', { status: 400 });
  }
  try {
    const url = await writeScheduleJSON(JSON.stringify(body));
    return NextResponse.json({ ok: true, url });
  } catch (e:any) {
    return new NextResponse('Failed to write blob. Check BLOB_READ_WRITE_TOKEN', { status: 500 });
  }
}
