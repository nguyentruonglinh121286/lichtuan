import { NextResponse } from 'next/server';
import { readScheduleURL } from '../lib/blob';

// Hàm xử lý yêu cầu GET để lấy dữ liệu lịch làm việc
export async function GET() {
  try {
    const url = await readScheduleURL();

    if (!url) {
        return NextResponse.json({
          week: 'Lịch làm việc Tuần (chưa có dữ liệu)',
          days: [],
        });
    }

    const res = await fetch(url, { cache: 'no-store' });
    const json = await res.json();
    return NextResponse.json(json);

  } catch (e: any) {
    return NextResponse.json({
      week: 'Lịch làm việc Tuần (chưa có dữ liệu)',
      days: [],
    });
  }
}
