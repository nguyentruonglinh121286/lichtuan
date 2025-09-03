// components/ScheduleDay.tsx
export default function ScheduleDay({ day }: { day: any }) {
  const items = Array.isArray(day.items) ? day.items : [];
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-0 shadow-sm">
      <div className="rounded-t-2xl bg-gradient-to-r from-sky-600 to-blue-600 px-4 py-3 text-white">
        <h4 className="text-lg font-semibold">{day.title}</h4>
      </div>

      <div className="overflow-x-auto p-4">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-slate-50 text-slate-600">
            <tr>
              <th className="w-[80px] border-b p-2 text-left">GIỜ</th>
              <th className="w-[160px] border-b p-2 text-left">CHỦ TRÌ/DỰ</th>
              <th className="border-b p-2 text-left">NỘI DUNG</th>
              <th className="w-[140px] border-b p-2 text-left">CHUẨN BỊ</th>
              <th className="w-[180px] border-b p-2 text-left">THÀNH PHẦN</th>
              <th className="w-[160px] border-b p-2 text-left">ĐỊA ĐIỂM</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td className="p-3 text-slate-500" colSpan={6}>
                  Không có lịch.
                </td>
              </tr>
            ) : (
              items.map((it: any, idx: number) => (
                <tr key={idx} className="even:bg-slate-50/40 hover:bg-sky-50/60">
                  <td className="p-2 align-top font-medium text-slate-700">{it.time || ''}</td>
                  <td className="p-2 align-top">{it.host || ''}</td>
                  <td className="p-2 align-top">{it.content || ''}</td>
                  <td className="p-2 align-top text-slate-700">{it.prepare || ''}</td>
                  <td className="p-2 align-top">{it.participants || ''}</td>
                  <td className="p-2 align-top">{it.location || ''}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
}
