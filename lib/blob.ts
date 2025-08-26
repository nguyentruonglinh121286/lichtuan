// app/lib/blob.ts
import { list, put } from '@vercel/blob';

const FILE = 'schedule.json';

function emptySchedule() {
  return { week: 'Tuần (chưa có dữ liệu)', note: '', highlights: [], days: [] };
}

/**
 * Đọc JSON lịch tuần từ Vercel Blob (public).
 */
export async function getScheduleJson() {
  try {
    const { blobs } = await list();
    const hit = blobs.find((b) => b.pathname === FILE);
    if (!hit) return emptySchedule();

    const res = await fetch(hit.url, { cache: 'no-store' });
    return await res.json();
  } catch {
    return emptySchedule();
  }
}

/**
 * Ghi JSON lịch tuần lên Vercel Blob (public).
 * Trả về URL public của file.
 */
export async function setScheduleJson(data: any) {
  const body = JSON.stringify(data, null, 2);
  const { url } = await put(
    FILE,
    new Blob([body], { type: 'application/json' }),
    { access: 'public' }
  );
  return url;
}
