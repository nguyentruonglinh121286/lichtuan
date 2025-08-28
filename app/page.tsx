'use client';

import React from 'react';
import PrintButton from '@/components/PrintButton';
import ScheduleDay, { Day } from '@/components/ScheduleDay';

type Schedule = {
  week: string;
  note?: string;
  highlights?: string[];
  days: Day[];
};

const printCSS = `
@media print {
  body { background: #fff !important; }
  .no-print { display: none !important; }
  .card { box-shadow: none !important; margin: 0 !important; max-width: 100% !important; padding: 0 !important; }
  header { padding: 12px 0 0 !important; }
  table { page-break-inside: auto !important; }
  h3, table { page-break-after: avoid !important; }
}
`;
const card: React.CSSProperties = {
  margin: '0 auto',
  maxWidth: 1100,
  background: '#fff',
  borderRadius: 12,
  padding: 20,
  boxShadow: '0 6px 24px rgba(0,0,0,0.06)',
};

export default function Page() {
  const [data, setData] = React.useState<Schedule | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch('/api/schedule', { cache: 'no-store' });
        if (!res.ok) throw new Error('Không tải được dữ liệu');
        const json = (await res.json()) as Schedule;
        if (alive) setData(json);
      } catch (e: any) { if (alive) setError(e?.message || 'Lỗi'); }
      finally { if (alive) setLoading(false); }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <main style={{ padding: 24, background: '#f6f8fa', minHeight: '100vh' }}>
      <style>{printCSS}</style>
      <div className="card" style={card}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#0b3a8c' }}>LỊCH LÀM VIỆC</h1>
            <div style={{ color: '#6b7280', marginTop: 6 }}>
              {data?.week ? data.week : 'Tuần (chưa có dữ liệu)'}
            </div>
          </div>
          <PrintButton />
        </header>

        <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '16px 0 0' }} />

        {loading && <p style={{ padding: '16px 0', color: '#6b7280' }}>Đang tải dữ liệu…</p>}
        {!loading && error && <p style={{ padding: '16px 0', color: '#b91c1c' }}>Lỗi: {error}</p>}

        {!loading && !error && !!data?.highlights?.length && (
          <div style={{ marginTop: 16, padding: 12, borderRadius: 8, background: '#eef2ff', border: '1px solid #dbeafe' }}>
            <div style={{ fontWeight: 700, marginBottom: 6, color: '#1e3a8a' }}>Nội dung trọng tâm</div>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {data!.highlights!.map((h, i) => <li key={i} style={{ margin: '4px 0', whiteSpace: 'pre-line' }}>{h}</li>)}
            </ul>
          </div>
        )}

        {!loading && !error && data?.note && (
          <div style={{ marginTop: 12, color: '#374151' }}>
            <em>{data.note}</em>
          </div>
        )}

        {!loading && !error && data?.days?.length ? data.days.map((d, i) => (
          <ScheduleDay key={i} day={d} />
        )) : null}
      </div>
    </main>
  );
}
