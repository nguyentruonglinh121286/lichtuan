// app/lib/blob.ts
import { put, list } from '@vercel/blob';

const SCHEDULE_KEY = 'schedule.json';

/**
 * Trả về URL public của file schedule.json nếu tồn tại
 */
export async function readScheduleURL(): Promise<string | null> {
  try {
    const blobs = await list();
    const found = blobs.blobs.find((b) => b.pathname === SCHEDULE_KEY);
    return found ? found.url : null;
  } catch (err) {
    console.error('readScheduleURL error:', err);
    return null;
  }
}

/**
 * Ghi đè file schedule.json với nội dung JSON mới
 */
export async function writeScheduleJSON(data: any) {
  try {
    const blob = await put(SCHEDULE_KEY, JSON.stringify(data, null, 2), {
      access: 'public',
      addRandomSuffix: false, // luôn giữ tên schedule.json
      contentType: 'application/json',
    });
    return blob;
  } catch (err) {
    console.error('writeScheduleJSON error:', err);
    throw err;
  }
}
