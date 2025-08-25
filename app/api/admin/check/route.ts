import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { pwd } = await req.json();
  if (!process.env.ADMIN_PASSWORD) return new NextResponse('ADMIN_PASSWORD not set', { status: 500 });
  if (pwd === process.env.ADMIN_PASSWORD) return NextResponse.json({ ok: true });
  return new NextResponse('Unauthorized', { status: 401 });
}
