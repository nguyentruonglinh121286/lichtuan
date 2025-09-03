// app/page.tsx
export const revalidate = 0;

import PrintButton from '../components/PrintButton';
import ScheduleDay from '../components/ScheduleDay';

async function getSchedule() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/schedule`, {
      cache: 'no-store',
    });
    if (!res.ok) return { week: 'Tuần (chưa có dữ liệu)', days: [] };
    return res.json();
  } catch (e) {
    return { week: 'Tuần (chưa có dữ liệu)', days: [] };
  }
}

export default async function Page() {
  const data: any = await getSchedule();

  const agency = data?.agency || null;
  const focus: string[] = Array.isArray(data?.focus) ? data.focus : [];

  return (
    <main className="container-narrow py-8 print:px-0">
      {/* Header */}
      <header className="mb-8 text-center">
        {agency && agency.name ? (
          <>
            <h2 className="text-sm font-semibold tracking-widest text-sky-700">
              {agency.name}
            </h2>
            {agency.subtitle && (
              <p className="mt-1 text-slate-500">{agency.subtitle}</p>
            )}
          </>
        ) : null}

        <div className="mt-4 flex items-center justify-center gap-3">
          <h1 className="text-3xl font-extrabold text-blue-700">
            LỊCH LÀM VIỆC — {data?.week ?? ''}
          </h1>
          <PrintButton />
        </div>
      </header>

      {/* Trọng tâm tuần này */}
      {focus.length > 0 && (
        <section className="mb-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 shadow-sm">
          <h3 className="mb-2 text-lg font-semibold text-blue-800">
            🎯 Trọng tâm tuần này
          </h3>
          <ul className="list-inside list-disc space-y-1 text-slate-700">
            {focus.map((it, idx) => (
              <li key={idx}>{it}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Lịch theo ngày */}
      <section className="space-y-6">
        {(data?.days ?? []).map((day: any, i: number) => (
          <ScheduleDay key={i} day={day} />
        ))}
      </section>

      {/* Footer in */}
      <footer className="mt-8 hidden print:block text-center text-sm text-slate-500">
        In lúc: {new Date().toLocaleString('vi-VN')}
      </footer>
    </main>
  );
}
