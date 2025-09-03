export const runtime = 'edge';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { writeSchedule } from '@/app/lib/blob';

/**
 * POST /api/admin
 * Body: JSON lịch tuần (đúng cấu trúc app đang dùng)
 *
 * Bảo vệ: nếu đặt biến môi trường ADMIN_KEY,
 *         request phải kèm header `x-admin-key: <ADMIN_KEY>`
 */
export async function POST(req: Request) {
  try {
    // Optional auth bằng header x-admin-key
    const ADMIN_KEY = process.env.ADMIN_KEY || '';
    if (ADMIN_KEY) {
      const key = req.headers.get('x-admin-key') || '';
      if (key !== ADMIN_KEY) {
        return NextResponse.json(
          { ok: false, message: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    // Đọc JSON từ body (hỗ trợ cả text -> JSON)
    const contentType = req.headers.get('content-type') || '';
    let data: any;

    if (contentType.includes('application/json')) {
      data = await req.json();
    } else {
      const text = await req.text();
      data = JSON.parse(text);
    }

    // (Tuỳ chọn) kiểm tra sơ bộ cấu trúc tối thiểu
    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        { ok: false, message: 'Body must be a JSON object' },
        { status: 400 }
      );
    }

    // Ghi lên Vercel Blob (public)
    const url = await writeSchedule(data);

    return NextResponse.json({ ok: true, url });
  } catch (err: any) {
    console.error('Admin publish error:', err);
    return NextResponse.json(
      { ok: false, message: err?.message || 'Invalid JSON or server error' },
      { status: 400 }
    );
  }
}

// (Tuỳ chọn) cho CORS nếu cần gọi chéo domain từ tools bên ngoài Admin page
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-admin-key',
    },
  });
}
