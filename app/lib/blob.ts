import { put, list } from '@vercel/blob';

// Tên file cố định để lưu lịch
const SCHEDULE_FILE = 'schedule.json';

// Lấy URL public của file schedule.json
export async function readScheduleURL(): Promise<string | null> {
  try {
    const files = await list();
    const found = files.blobs.find((b) => b.pathname === SCHEDULE_FILE);
    return found ? found.url : null;
  } catch (err) {
    console.error('readScheduleURL error:', err);
    return null;
  }
}

// Ghi dữ liệu JSON lên blob
export async function writeSchedule(data: any) {
  try {
    const json = JSON.stringify(data, null, 2);
    const blob = await put(SCHEDULE_FILE, json, {
      contentType: 'application/json',
      access: 'public', // Cho phép đọc trực tiếp qua URL
    });
    return blob.url;
  } catch (err) {
    console.error('writeSchedule error:', err);
    throw err;
  }
}
