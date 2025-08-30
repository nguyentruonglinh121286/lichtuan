// components/ScheduleDay.tsx
type Item = {
  time?: string;
  host?: string;
  content?: string;
  prepare?: string;
  participants?: string;
  location?: string;
};

type Day = {
  title: string;
  note?: string;
  items: Item[];
};

export default function ScheduleDay({ day }: { day: Day }) {
  return (
    <section className="rounded-lg border bg-white shadow-sm">
      <header className="border-b px-4 py-2 font-semibold">{day.title}</header>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] table-fixed text-sm">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="w-20 px-2 py-2 text-left">GIỜ</th>
              <th className="w-56 px-2 py-2 text-left">CHỦ TRÌ/DỰ</th>
              <th className="px-2 py-2 text-left">NỘI DUNG</th>
              <th className="w-44 px-2 py-2 text-left">CHUẨN BỊ</th>
              <th className="w-40 px-2 py-2 text-left">THÀNH PHẦN</th>
              <th className="w-32 px-2 py-2 text-left">ĐỊA ĐIỂM</th>
            </tr>
          </thead>
          <tbody>
            {day.items?.map((it, idx) => (
              <tr key={idx} className="odd:bg-gray-50">
                <td className="px-2 py-2 align-top">{it.time ?? ''}</td>
                <td className="px-2 py-2 align-top">{it.host ?? ''}</td>
                <td className="px-2 py-2 align-top whitespace-pre-wrap">
                  {it.content ?? ''}
                </td>
                <td className="px-2 py-2 align-top">{it.prepare ?? ''}</td>
                <td className="px-2 py-2 align-top">{it.participants ?? ''}</td>
                <td className="px-2 py-2 align-top">{it.location ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {day.note ? (
        <footer className="border-t px-3 py-2 text-xs italic text-gray-600">
          {day.note}
        </footer>
      ) : null}
    </section>
  );
}
