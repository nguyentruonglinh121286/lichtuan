// lib/blob.ts
import { list, put } from '@vercel/blob';

const FILE = 'schedule.json';

/**
 * Trả về URL public của schedule.json nếu có trong Blob.
 * Nếu chưa có thì trả về null.
 */
export async function readScheduleURL(): Promise<string | null> {
  // Lấy danh sách các blob, ưu tiên tìm chính xác FILE
  const { blobs } = await list({ prefix: '' });

  // Tìm file đúng tên
  let hit = blobs.find(b => b.pathname === FILE);

  // Nếu user từng up vào thư mục (vd: "lich/…/schedule.json") thì fallback:
  if (!hit) {
    hit = blobs.find(b => b.pathname.endsWith('/' + FILE));
  }

  return hit?.url ?? null;
}

/**
 * Ghi (publish) JSON lịch lên Vercel Blob với tên cố định schedule.json
 * => public URL, không kèm hậu tố ngẫu nhiên
 */
export async function writeScheduleJSON(data: unknown): Promise<string> {
  const body =
    typeof data === 'string' ? data : JSON.stringify(data, null, 2);

  const { url } = await put(FILE, body, {
    access: 'public',
    contentType: 'application/json; charset=utf-8',
    addRandomSuffix: false, // luôn ghi đè lên schedule.json
  });

  return url;
}
