'use client';

export type Item = {
  time: string;
  host: string;
  content: string;
  prepare?: string;
  participants?: string;
  location?: string;
};
export type Day = { title: string; items: Item[] };

const th: React.CSSProperties = {
  padding: '10px 12px',
  textAlign: 'left',
  borderRight: '1px solid rgba(255,255,255,0.25)',
  fontWeight: 700,
  fontSize: 13,
};
const td: React.CSSProperties = {
  padding: '10px 12px',
  verticalAlign: 'top',
  borderTop: '1px solid #e5e7eb',
};

export default function ScheduleDay({ day }: { day: Day }) {
  return (
    <section style={{ marginTop: 24 }}>
      <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: '#0b3a8c' }}>
        {day.title}
      </h3>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#0b3a8c', color: '#fff' }}>
              <th style={th}>GIỜ</th>
              <th style={th}>CHỦ TRÌ/DỰ</th>
              <th style={th}>NỘI DUNG</th>
              <th style={th}>CHUẨN BỊ</th>
              <th style={th}>THÀNH PHẦN</th>
              <th style={th}>ĐỊA ĐIỂM</th>
            </tr>
          </thead>
          <tbody>
            {day.items?.length ? (
              day.items.map((it, i) => (
                <tr key={i} style={{ background: i % 2 ? '#fbfdff' : '#fff' }}>
                  <td style={td}>{it.time || ''}</td>
                  <td style={td}>{it.host || ''}</td>
                  <td style={{ ...td, whiteSpace: 'pre-line' }}>{it.content || ''}</td>
                  <td style={td}>{it.prepare || ''}</td>
                  <td style={td}>{it.participants || ''}</td>
                  <td style={td}>{it.location || ''}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ ...td, textAlign: 'center' }}>Không có lịch.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
