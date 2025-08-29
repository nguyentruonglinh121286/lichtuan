// lib/blob.ts
import { list, put } from '@vercel/blob';

const FILE = 'schedule.json';

/**
 * Trả về URL public của schedule.json trên Vercel Blob
 * (hoặc null nếu chưa có file).
 */
export async function readScheduleURL(): Promise<string | null> {
  const { blobs } = await list();
  const hit = blobs.find((b) => b.pathname === FILE);
  return hit ? hit.url : null;
}

/**
 * Ghi JSON lên Vercel Blob (công khai) với tên schedule.json
 * Trả về { ok, url } nếu thành công, ngược lại { ok:false, error }.
 */
export async function writeScheduleJSON(
  data: unknown
): Promise<{ ok: boolean; url?: string; error?: string }> {
  try {
    const { url } = await put(FILE, JSON.stringify(data), {
      access: 'public',
      addRandomSuffix: false, // cố định tên file: schedule.json
      contentType: 'application/json; charset=utf-8',
    });
    return { ok: true, url };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Write blob failed' };
  }
}
