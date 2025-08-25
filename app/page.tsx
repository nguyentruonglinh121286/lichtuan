// app/page.tsx
import PrintButton from '../components/PrintButton';
import ScheduleDay from '../components/ScheduleDay';

/** Đọc JSON lịch tuần (ưu tiên biến NEXT_PUBLIC_SCHEDULE_URL nếu có) */
async function getData() {
  const url = process.env.NEXT_PUBLIC_SCHEDULE_URL ?? '/api/schedule';

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    return await res.json();
  } catch {
    // Fallback rỗng để trang vẫn render
    return { week: 'Tuần (chưa có dữ liệu)', note: '', highlights: [], days: [] };
  }
}

export default async function Page() {
  const data: any = await getData();
  const week: string = data?.week ?? 'Tuần (chưa có dữ liệu)';
  const note: string = data?.note ?? '';
  const highlights: string[] = Array.isArray(data?.highlights) ? data.highlights : [];
  const days: any[] = Array.isArray(data?.days) ? data.days : [];

  return (
    <main className="p-4 md:p-8 bg-gray-50 text-gray-800 print:bg-white">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-md print:shadow-none print:p-0">
        
        {/* Nút In/PDF */}
        <div className="flex items-center justify-between gap-3 no-print mb-4">
          <div />
          <PrintButton />
        </div>

        <section className="sheet">
          {/* Tiêu đề chính của trang */}
          <header className="doc-header text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-blue-600 mb-2">LỊCH LÀM VIỆC</h1>
            <p className="text-lg md:text-xl font-bold text-gray-700">{week}</p>
            <div className="note-rotate mt-4 print:hidden">Vui lòng quay ngang khi xem trên điện thoại</div>
          </header>

          {/* Nội dung trọng tâm (tùy chọn) */}
          {highlights.length > 0 && (
            <div className="callout mb-6 p-4 border border-gray-300 rounded-md bg-gray-100">
              <b className="text-gray-900">Nội dung trọng tâm:</b>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Bảng theo ngày */}
          {days.map((d, i) => (
            <ScheduleDay
              key={i}
              title={d.title || d.day || `Ngày ${i + 1}`}
              items={d.items || d.events || []}
            />
          ))}

          {/* Ghi chú cuối trang (tùy chọn) */}
          {note && (
            <p className="mt-6 italic text-gray-500 text-sm md:text-base">
              {note}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}