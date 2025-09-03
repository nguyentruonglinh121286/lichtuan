// app/api/schedule/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { readScheduleURL } from '@/app/lib/blob'; // giữ đúng đường dẫn này trong repo của bạn

// JSON rỗng mặc định khi chưa có dữ liệu / lỗi
const EMPTY = { week: 'Tuần (chưa có dữ liệu)', days: [] as any[] };

/**
 * GET /api/schedule
 * - Đọc URL public/signed của schedule.json từ Vercel Blob
 * - Fetch nội dung JSON (no-store) và trả về cho client
 * - Có thể thêm ?pretty=1 để xem JSON format đẹp khi mở trực tiếp trên trình duyệt
 */
export async function GET(req: Request) {
  try {
    const url = await readScheduleURL();
    if (!url) {
      // Chưa có file schedule.json trên Blob
      return NextResponse.json(EMPTY, {
        headers: { 'Cache-Control': 'no-store' },
      });
    }

    // phá CDN cache bằng query t=timestamp, + tắt cache ở server
    const blobRes = await fetch(`${url}?t=${Date.now()}`, {
      cache: 'no-store',
      // next: { revalidate: 0 } // không cần thiết thêm, nhưng để đây cũng không sao
    });

    if (!blobRes.ok) {
      // Không đọc được file JSON
      return NextResponse.json(EMPTY, {
        headers: { 'Cache-Control': 'no-store' },
      });
    }

    const data = await blobRes.json().catch(() => null);
    const json = data ?? EMPTY;

    // Hỗ trợ xem đẹp khi gõ trực tiếp /api/schedule?pretty=1
    const pretty = new URL(req.url).searchParams.get('pretty');
    const body =
      pretty && pretty !== '0'
        ? JSON.stringify(json, null, 2) + '\n'
        : JSON.stringify(json);

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('Schedule API error:', err);
    return NextResponse.json(EMPTY, {
      headers: { 'Cache-Control': 'no-store' },
    });
  }
}
