import { NextResponse } from 'next/server';
import { readScheduleURL } from '.../lib/blob';

export async function GET() {
  try {
    const url = await readScheduleURL();

    if (!url) {
        // Nếu không có URL, trả về thông báo lỗi
        return NextResponse.json({ error: "URL not found" }, { status: 500 });
    }

    const res = await fetch(url, { cache: 'no-store' });
    
    // Kiểm tra nếu fetch không thành công
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const json = await res.json();
    return NextResponse.json(json);

  } catch (e: any) {
    // Nếu có lỗi, trả về một JSON trống hoặc với thông báo lỗi
    return NextResponse.json({
      week: 'Lịch làm việc Tuần (chưa có dữ liệu)',
      days: [],
    });
  }
}
