export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Link from 'next/link';
import PrintButton from '@/components/PrintButton';
import ScheduleDay from '@/components/ScheduleDay';

async function getSchedule() {
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/schedule`, { cache: 'no-store' });
  if (!res.ok) return { week: 'Tuần (chưa có dữ liệu)', days: [] as any[] };
  return res.json();
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0L3.293 9.957a1 1 0 111.414-1.414l3.043 3.043 6.543-6.543a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default async function Page() {
  const data = await getSchedule();

  const agency = data?.agency ?? null;
  const focus: string[] = Array.isArray(data?.focus) ? data.focus : [];
  const week = data?.week ?? 'Tuần (chưa có dữ liệu)';
  const days = Array.isArray(data?.days) ? data.days : [];

  return (
    <main className="page-wrap">
      {/* Header */}
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">
            {agency?.name ?? 'LỊCH LÀM VIỆC'}
          </h1>
          {agency?.subtitle && (
            <p className="page-subtitle">{agency.subtitle}</p>
          )}
        </div>

        <div className="no-print flex items-center gap-2">
          <Link
            href="/admin"
            className="btn btn-secondary"
            aria-label="Mở trang soạn & publish lịch"
          >
            In
          </Link>
          <PrintButton />
        </div>
      </header>

      {/* Week pill */}
      <p className="week-pill">{week}</p>

      {/* Focus / Nội dung trọng tâm */}
      <section className="card">
        <h2 className="section-title">
          Nội dung trọng tâm
        </h2>

        {focus.length > 0 ? (
          <ul className="focus-list">
            {focus.map((item, i) => (
              <li key={i}>
                <CheckIcon className="focus-check" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">Chưa có nội dung trọng tâm.</div>
        )}
      </section>

      {/* Days */}
      <div className="space-y-6">
        {days.map((day: any, idx: number) => (
          <ScheduleDay key={idx} day={day} />
        ))}

        {days.length === 0 && (
          <div className="card empty-state">Chưa có lịch làm việc.</div>
        )}
      </div>

      <footer className="mt-10 mb-6 text-center text-xs text-gray-500 print:hidden">
        Dữ liệu được lấy từ <code>schedule.json</code> (Vercel Blob) – cập nhật tại trang <code>/admin</code>.
      </footer>
    </main>
  );
}
