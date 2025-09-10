// app/lib/blob.ts
import { put, list } from '@vercel/blob';

/**
 * Ghi đè trực tiếp lên key cố định: schedule.json
 * addRandomSuffix: false => luôn dùng đúng tên file (không phát sinh hậu tố)
 */
export async function writeScheduleJSON(data: any) {
  const body = JSON.stringify(data, null, 2);

  const { url } = await put('schedule.json', body, {
    access: 'public',
    addRandomSuffix: false, // QUAN TRỌNG: không tạo hậu tố ngẫu nhiên
    contentType: 'application/json; charset=utf-8',
    // KHÔNG có 'cacheControl' trong PutCommandOptions của @vercel/blob phiên bản bạn đang dùng
  });

  return url; // URL cố định
}

/**
 * Lấy URL hiện tại của schedule.json
 */
export async function readScheduleURL(): Promise<string | null> {
  try {
    const { blobs } = await list({ prefix: 'schedule.json' });
    const file = blobs.find(b => b.pathname === 'schedule.json');
    return file?.url ?? null;
  } catch {
    return null;
  }
}
