// lib/blob.ts
import { put, head } from '@vercel/blob';

const FILE = 'schedule.json';

/**
 * Ghi JSON lịch tuần lên Vercel Blob (public), không thêm hậu tố random.
 * Trả về URL của file (string).
 */
export async function writeScheduleJSON(data: unknown): Promise<string> {
  const body =
    typeof data === 'string' ? data : JSON.stringify(data, null, 2);

  const { url } = await put(FILE, body, {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
  });

  return url;
}

/**
 * Lấy URL public của file schedule.json nếu tồn tại; không thì trả null.
 */
export async function readScheduleURL(): Promise<string | null> {
  try {
    const meta = await head(FILE); // có từ @vercel/blob v0.24.x
    return meta?.url ?? null;
  } catch {
    return null;
  }
}
