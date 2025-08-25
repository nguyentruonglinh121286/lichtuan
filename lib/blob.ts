import { list, put } from '@vercel/blob';

const FILE_PATH = 'schedule.json';

export async function readScheduleURL() {
  try {
    const { blobs } = await list({ prefix: FILE_PATH });
    const found = blobs.find(b => b.pathname === FILE_PATH);
    return found?.url || null;
  } catch {
    // Chưa cấu hình token hoặc Blob chưa sẵn → trả null để dùng fallback
    return null;
  }
}

export async function writeScheduleJSON(json: string) {
  const res = await put(FILE_PATH, json, {
    access: 'public',
    contentType: 'application/json; charset=utf-8',
    addRandomSuffix: false,
  });
  return res.url;
}
