// lib/blob.ts
import { put, list, del } from '@vercel/blob';

const FILE = 'schedule.json';

/**
 * Trả về JSON mặc định khi chưa có dữ liệu
 */
function emptySchedule() {
  return { week: 'Tuần (chưa có dữ liệu)', days: [] };
}

/**
 * Đọc URL của file schedule.json trong Blob Storage
 */
export async function getScheduleUrl(): Promise<string | null> {
  try {
    const files = await list();
    const hit = files.blobs.find((b) => b.pathname === FILE);
    return hit ? hit.url : null;
  } catch (err) {
    console.error('Error list blobs:', err);
    return null;
  }
}

/**
 * Đọc dữ liệu JSON lịch tuần
 */
export async function getScheduleJson() {
  try {
    const url = await getScheduleUrl();
    if (!url) return emptySchedule();

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return emptySchedule();

    return await res.json();
  } catch (err) {
    console.error('Error fetch schedule.json:', err);
    return emptySchedule();
  }
}

/**
 * Ghi dữ liệu JSON mới vào Blob Storage
 */
export async function setScheduleJson(data: any) {
  try {
    const json = JSON.stringify(data, null, 2);
    const blob = await put(FILE, json, {
      contentType: 'application/json',
      access: 'public', // để public đọc được ngoài trang chủ
    });
    return blob.url;
  } catch (err) {
    console.error('Error put schedule.json:', err);
    throw err;
  }
}

/**
 * Xoá file schedule.json (nếu cần reset)
 */
export async function deleteSchedule() {
  try {
    await del(FILE);
  } catch (err) {
    console.error('Error delete schedule.json:', err);
  }
}
