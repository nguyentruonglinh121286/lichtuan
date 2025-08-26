// app/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lịch làm việc',
};

// Server function để fetch dữ liệu lịch
async function getSchedule() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || '';
  // Nếu không có BASE_URL, gọi tương đối vẫn OK khi render server
  const res = await fetch(`${base}/api/schedule`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return {
      week: 'Tuần (chưa có dữ liệu)',
      note: '',
      highlights: [],
      days: [],
    };
  }

  return res.json();
}

// Component render cho 1 dòng sự kiện
function Row({
  time,
  host,
  content,
  prepare,
  participants,
  location,
}: {
  time: string;
  host: string;
  content: string;
  prepare: string;
  participants: string;
  location: string;
}) {
  return (
    <tr className="border-t">
      <td className="py-2 px-3 whitespace-nowrap align-top">{time}</td>
      <td className="py-2 px-3 align-top">{host}</td>
      <td className="py-2 px-3 align-top">{content}</td>
      <td className="py-2 px-3 align-top">{prepare}</td>
      <td className="py-2 px-3 align-top">{participants}</td>
      <td className="py-2 px-3 align-top">{location}</td>
    </tr>
  );
}

// ⚠️ MUST: Page phải export default 1 React component (hoặc async) trả về JSX
export default async function Page(): Promise<JSX.Element> {
  const data = await getSchedule();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-700 tracking-wide">
            LỊCH LÀM VIỆC
          </h1>
          <p className="text-gray-600">
            {data?.week || 'Tuần (chưa có dữ liệu)'}
          </p>
        </div>

        {/* Nút In/Lưu PDF (client) – nếu bạn đã tạo PrintButton ở components */}
        {/* <PrintButton /> */}
      </header>

      {/* Highlight (nếu có) */}
      {Array.isArray(data?.highlights) && data.highlights.length > 0 && (
        <section className="mb-6 bg-yellow-50 border border-yellow-200 rounded p-4">
          <h2 className="font-semibold mb-2">Nội dung trọng tâm</h2>
          <ul className="list-disc pl-5 space-y-1">
            {data.highlights.map((h: string, idx: number) => (
              <li key={idx}>{h}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Bảng lịch theo ngày */}
      <section className="bg-white shadow rounded">
        {Array.isArray(data?.days) && data.days.length > 0 ? (
          data.days.map((day: any) => (
            <div key={day.title} className="border-b last:border-b-0">
              <div className="bg-blue-900 text-white px-4 py-2 font-semibold">
                {day.title}
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="text-left py-2 px-3 w-20">GIỜ</th>
                      <th className="text-left py-2 px-3 w-64">CHỦ TRÌ/DỰ</th>
                      <th className="text-left py-2 px-3">NỘI DUNG</th>
                      <th className="text-left py-2 px-3 w-56">CHUẨN BỊ</th>
                      <th className="text-left py-2 px-3 w-64">THÀNH PHẦN</th>
                      <th className="text-left py-2 px-3 w-56">ĐỊA ĐIỂM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(day.items) && day.items.length > 0 ? (
                      day.items.map((it: any, idx: number) => (
                        <Row
                          key={`${day.title}-${idx}`}
                          time={it.time || ''}
                          host={it.host || ''}
                          content={it.content || ''}
                          prepare={it.prepare || ''}
                          participants={it.participants || ''}
                          location={it.location || ''}
                        />
                      ))
                    ) : (
                      <tr>
                        <td className="py-3 px-3 text-gray-500" colSpan={6}>
                          Không có lịch.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-gray-500">Tuần này chưa có dữ liệu.</div>
        )}
      </section>

      {/* Ghi chú (nếu có) */}
      {data?.note && (
        <footer className="mt-6 text-sm text-gray-600">
          {data.note}
        </footer>
      )}
    </main>
  );
}
