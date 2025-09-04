// app/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import PrintButton from '@/components/PrintButton';
import ScheduleDay from '@/components/ScheduleDay';
import { readScheduleURL } from '@/app/lib/blob';

async function getSchedule() {
  try {
    const url = await readScheduleURL();
    if (!url) {
      return { agency: null, focus: [], week: 'Tuần (chưa có dữ liệu)', days: [] as any[] };
    }
    // thêm query để phá cache CDN của Blob
    const res = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) {
      return { agency: null, focus: [], week: 'Tuần (chưa có dữ liệu)', days: [] as any[] };
    }
    const json = await res.json();

    return {
      agency: json?.agency ?? null,
      focus: Array.isArray(json?.focus) ? json.focus : [],
      week: json?.week ?? 'Tuần (chưa có dữ liệu)',
      days: Array.isArray(json?.days) ? json.days : [],
    };
  } catch {
    return { agency: null, focus: [], week: 'Tuần (chưa có dữ liệu)', days: [] as any[] };
  }
}

export default async function Page() {
  const data = await getSchedule();
  const { agency, focus, week, days } = data;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-700">
            {agency?.name ?? 'LỊCH LÀM VIỆC'}
          </h1>
          {agency?.subtitle && (
            <p className="text-sm text-gray-600">{agency.subtitle}</p>
          )}
        </div>
        <PrintButton />
      </div>

      <p className="mb-4 text-[15px] font-medium text-gray-700">{week}</p>

      {focus.length > 0 && (
        <section className="mb-6 rounded-xl border border-blue-100 bg-blue-50/40 p-4">
          <h2 className="mb-2 text-base font-semibold text-blue-700">Trọng tâm trong tuần</h2>
          <ul className="list-disc pl-6 text-sm text-gray-700">
            {focus.map((f: string, i: number) => <li key={i}>{f}</li>)}
          </ul>
        </section>
      )}

      <div className="space-y-6">
        {days.map((day: any, idx: number) => (
          <ScheduleDay key={idx} day={day} />
        ))}
        {days.length === 0 && (
          <div className="rounded-md border border-gray-200 bg-white p-6 text-center text-gray-500">
            Chưa có lịch làm việc.
          </div>
        )}
      </div>
    </main>
  );
}
