// lib/blob.ts
import { list, put } from '@vercel/blob';

const FILE = 'schedule.json';

/** Trả về URL của schedule.json nếu tồn tại trong Blob Store */
export async function readScheduleURL() {
  const items = await list();
  const file = items.blobs.find((b) => b.pathname === FILE);
  return file ? file.url : null;
}

/** Ghi JSON vào Blob Store dưới tên schedule.json (public) */
export async function writeScheduleJSON(data: unknown) {
  const blob = await put(FILE, JSON.stringify(data, null, 2), {
    access: 'public',
    contentType: 'application/json',
  });
  return blob.url;
}
