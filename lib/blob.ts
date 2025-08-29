// lib/blob.ts
import { list, put } from '@vercel/blob';

const FILE = 'schedule.json';

/**
 * Trả về URL public của schedule.json trên Vercel Blob.
 * Có thể trả null nếu chưa tồn tại.
 */
export async function readScheduleURL(): Promise<string | null> {
  try {
    const { blobs } = await list();
    const hit = blobs.find(b => b.pathname === FILE);
    return hit?.url ?? null;
  } catch (_e) {
    return null;
  }
}

/**
 * Ghi JSON vào Vercel Blob dưới tên schedule.json (public).
 * Trả về URL public vừa ghi.
 */
export async function writeScheduleJSON(data: unknown): Promise<string> {
  const body = JSON.stringify(data, null, 2);
  const { url } = await put(FILE, body, {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json; charset=utf-8',
  });
  return url;
}
