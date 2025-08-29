// app/page.tsx
import PrintButton from '@components/PrintButton';
import ScheduleDay from '@components/ScheduleDay';
export const revalidate = 0; // luôn lấy mới

type Item = {
  time: string;
  host?: string;
  content: string;
  prepare?: string;
  participants?: string;
  location?: string;
}
type Day = {
  title: string;
  note?: string;
  items: Item[];
}
type Schedule = {
  week: string;
  note?: string;
  highlights?: string[];
  days: Day[];
}

export default async function Page() {
  // gọi API nội bộ, tắt cache để lấy dữ liệu mới nhất
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/schedule`, {
    cache: 'no-store',
  }).catch(() => null);

  const data: Schedule | null = res && res.ok ? await res.json() : null;

  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      <section className="rounded-xl bg-white p-4 sm:p-6 shadow">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-blue-700">
              LỊCH LÀM VIỆC
            </h1>
            <p className="mt-1 text-gray-500">
              {data?.week ?? 'Tuần (chưa có dữ liệu)'}
            </p>
          </div>

          <PrintButton />
        </header>

        {data?.highlights?.length ? (
          <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-900">
            <ul className="list-disc list-inside space-y-1">
              {data.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-6 space-y-6 print:space-y-4">
          {data?.days?.length
            ? data.days.map((day) => <ScheduleDay key={day.title} day={day} />)
            : (
              <div className="text-gray-500">Chưa có dữ liệu.</div>
            )}
        </div>
      </section>
    </main>
  );
}
