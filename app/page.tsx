// app/page.tsx
export const revalidate = 0;

import PrintButton from '../components/PrintButton';
import ScheduleDay from '../components/ScheduleDay';

async function getSchedule() {
  // Gọi API phía server, không cache
  const res = await fetch('/api/schedule', { cache: 'no-store' });
  if (!res.ok) {
    return { week: 'Tuần (chưa có dữ liệu)', days: [] as any[] };
  }
  return res.json();
}

export default async function Page() {
  const data = await getSchedule();
  const week = data?.week ?? 'Tuần (chưa có dữ liệu)';
  const days = data?.days ?? [];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-blue-700">LỊCH LÀM VIỆC</h1>
        <PrintButton />
      </div>

      <p className="mb-6 text-gray-600">{week}</p>

      <div className="space-y-4">
        {days.length === 0 ? (
          <div className="rounded border border-dashed p-8 text-center text-gray-500">
            Tuần này chưa có dữ liệu.
          </div>
        ) : (
          days.map((day: any, i: number) => <ScheduleDay key={i} day={day} />)
        )}
      </div>
    </main>
  );
}
