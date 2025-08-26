// app/api/schedule/route.ts
import { NextResponse } from 'next/server';
import { getScheduleJson, setScheduleJson } from '../../lib/blob';

export const runtime = 'edge';    // hoặc bỏ dòng này nếu bạn muốn node runtime
export const revalidate = 0;      // tắt cache khi prerender

// Lấy dữ liệu lịch làm việc
export async function GET() {
  const data = await getScheduleJson();
  return NextResponse.json(data);
}

// Ghi / cập nhật dữ liệu lịch làm việc (được gọi từ /admin Publish)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const url = await setScheduleJson(body);
    return NextResponse.json({ ok: true, url });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'INVALID_JSON' }, { status: 400 });
  }
}
