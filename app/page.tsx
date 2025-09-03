// app/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { headers } from 'next/headers';
import PrintButton from '@/components/PrintButton';
import ScheduleDay from '@/components/ScheduleDay';

// Lấy base URL tuyệt đối từ headers (hoạt động ở Vercel/preview/prod & local)
function getBaseUrl() {
  const h = headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  const proto = h.get('x-forwarded-proto') ?? (host.includes('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}

async function getSchedule() {
  const base = getBaseUrl();
  const url = new URL('/api/schedule', base);
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return { week: 'Tuần (chưa có dữ liệu)', days: [] };
  return res.json();
}

export default async function Page() {
  const data = await getSchedule();

  const agency = data?.agency ?? null;
  const focus: string[] = Array.isArray(data?.focus) ? data.focus : [];
  const week = data?.week ?? 'Tuần (chưa có dữ liệu)';
  const days = Array.isArray(data?.days) ? data.days : [];

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
          <h2 className="mb-2 text-base font-semibold text-blue-700">
            Trọng tâm trong tuần
          </h2>
          <ul className="list-disc pl-6 text-sm text-gray-700">
            {focus.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
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
