// lib/blob.ts
import { list, put } from '@vercel/blob';

const FILE = 'schedule.json';

/** Lấy URL public của schedule.json (null nếu chưa có) */
export async function readScheduleURL(): Promise<string | null> {
  try {
    const { blobs } = await list();
    const hit = blobs.find(b => b.pathname === FILE);
    return hit?.url ?? null;
  } catch {
    return null;
  }
}

/** Ghi JSON vào Vercel Blob dưới tên schedule.json (public) */
export async function writeScheduleJSON(data: unknown): Promise<string> {
  const body = JSON.stringify(data, null, 2);
  const { url } = await put(FILE, body, {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json; charset=utf-8',
  });
  return url;
}
