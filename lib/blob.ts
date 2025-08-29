// lib/blob.ts
import { put, head } from '@vercel/blob';

const FILE = 'schedule.json';

/** Ghi JSON lên Blob (public) và trả URL */
export async function writeScheduleJSON(data: unknown): Promise<string> {
  const body = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  const { url } = await put(FILE, body, {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
  });
  return url;
}

/** Trả URL public của schedule.json nếu tồn tại; nếu không trả null */
export async function readScheduleURL(): Promise<string | null> {
  try {
    const meta = await head(FILE);
    return meta?.url ?? null;
  } catch {
    return null;
  }
}
