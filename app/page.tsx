// app/page.tsx
export const runtime = 'nodejs';         // ép dùng Node runtime (ổn định hơn Edge cho fetch nội bộ)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { headers } from 'next/headers';
import PrintButton from '@/components/PrintButton';
import ScheduleDay from '@/components/ScheduleDay';

type Agency = { name?: string; subtitle?: string };
type Day = any;

function getBaseUrl(): string {
  const h = headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  const proto = h.get('x-forwarded-proto') ?? (host.includes('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}

async function getSchedule(): Promise<{
  agency?: Agency | null;
  focus?: string[] | null;
  week?: string | null;
  days?: Day[] | null;
}> {
  try {
    const base = getBaseUrl();
    const url = new URL('/api/schedule', base);   // URL tuyệt đối
    const res = await fetch(url.toString(), { cache: 'no-store' });

    if (!res.ok) {
      console.error('getSchedule(): response not ok', res.status, res.statusText);
      return { week: 'Tuần (chưa có dữ liệu)', days: [] };
    }

    // JSON parse an toàn
    const data = await res.json().catch((e) => {
      console.error('getSchedule(): JSON parse error', e);
      return null;
    });

    if (!data || typeof data !== 'object') {
      console.error('getSchedule(): data invalid', data);
      return { week: 'Tuần (chưa có dữ liệu)', days: [] };
    }
    return data as any;
  } catch (e) {
    console.error('getSchedule(): fetch crash', e);
    return { week: 'Tuần (chưa có dữ liệu)', days: [] };
  }
}

export default async function Page() {
  const data = await getSchedule();

  const agency: Agency | null = (data?.agency as Agency) ?? null;
  const focus: string[] = Array.isArray(data?.focus) ? (data?.focus as string[]) : [];
  const week: string = data?.week ?? 'Tuần (chưa có dữ liệu)';
  const days: Day[] = Array.isArray(data?.days) ? (data?.days as Day[]) : [];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-700">
            {agency?.name ?? 'LỊCH LÀM VIỆC'}
          </h1>
          {!!agency?.subtitle && (
            <p className="text-sm text-gray-600">{agency.subtitle}</p>
          )}
        </div>
        <PrintButton />
      </div>

      <p className="mb-4 text-[15px] font-medium text-gray-700">{week}</p>

      {!!focus.length && (
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

        {!days.length && (
          <div className="rounded-md border border-gray-200 bg-white p-6 text-center text-gray-500">
            Chưa có lịch làm việc.{' '}
            <a
              className="text-blue-600 underline"
              href="/api/schedule"
              rel="noopener noreferrer"
            >
              Mở JSON hiện tại
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
