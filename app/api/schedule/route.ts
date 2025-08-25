import { NextResponse } from 'next/server';
import { readScheduleURL } from '@/lib/blob';

// Hàm xử lý yêu cầu GET để lấy dữ liệu lịch làm việc
export async function GET() {
  try {
    // Gọi hàm để đọc URL của file schedule.json từ Vercel Blob
    const url = await readScheduleURL();

    // Kiểm tra xem URL có tồn tại không
    // Nếu không, trả về thông báo lỗi
    if (!url) {
        return NextResponse.json({
          week: 'Lịch làm việc Tuần (chưa có dữ liệu)',
          days: [],
        });
    }

    // Gửi yêu cầu fetch đến URL đã lấy được để lấy dữ liệu JSON
    const res = await fetch(url, { cache: 'no-store' });
    
    // Kiểm tra nếu fetch không thành công (ví dụ: lỗi 404, 500)
    // Nếu có lỗi, ném ra một exception
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    // Chuyển đổi phản hồi thành JSON
    const json = await res.json();
    
    // Trả về dữ liệu JSON đã lấy được
    return NextResponse.json(json);

  } catch (e: any) {
    // Xử lý các lỗi xảy ra trong quá trình try
    // Trả về một JSON rỗng hoặc với thông báo lỗi
    return NextResponse.json({
      week: 'Lịch làm việc Tuần (chưa có dữ liệu)',
      days: [],
    });
  }
}
