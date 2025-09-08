import { put, list } from '@vercel/blob';

const FILE_NAME = 'schedule.json';

export async function writeScheduleJSON(data: any): Promise<string> {
  const json = JSON.stringify(data, null, 2);
  const { url } = await put(FILE_NAME, json, { access: 'public', addRandomSuffix: false, contentType: 'application/json' });
  return url;
}

export async function readScheduleURL(): Promise<string | null> {
  const items = await list();
  const f = items.blobs.find(b => b.pathname === FILE_NAME);
  return f?.url ?? null;
}
