import { put, list } from '@vercel/blob';

// Tên file JSON cố định trên Blob
const SCHEDULE_FILE = 'schedule.json';

// Ghi dữ liệu JSON lên Blob
export async function writeScheduleJSON(data: any) {
  const blob = await put(SCHEDULE_FILE, JSON.stringify(data, null, 2), {
    access: 'public',
    contentType: 'application/json',
  });
  return blob; // trả về { url, pathname, size, ... }
}

// Lấy URL của file schedule.json trên Blob
export async function readScheduleURL() {
  const blobs = await list();
  const file = blobs.blobs.find(b => b.pathname === SCHEDULE_FILE);
  return file ? file.url : null;
}
