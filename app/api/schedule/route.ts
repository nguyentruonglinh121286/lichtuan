// app/api/schedule/route.ts
import { NextResponse } from 'next/server';
import { getScheduleJson } from '@/lib/blob';

export const runtime = 'edge';   // hoặc bỏ nếu bạn muốn node runtime
export const revalidate = 0;     // tắt cache khi prerender

// GET /api/schedule
export async function GET() {
  const data = await getScheduleJson();
  return NextResponse.json(data, {
    headers: {
      // tránh cache ở edge
      'Cache-Control': 'no-store, must-revalidate',
    },
  });
}
