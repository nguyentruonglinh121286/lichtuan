// components/ScheduleDay.tsx
type Item = {
  time: string; host: string; content: string;
  prepare?: string; participants?: string; location?: string;
};

export default function ScheduleDay({ title, items }: { title: string; items: Item[] }) {
  return (
    <div className="mb-8 last:mb-0">
      <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 p-2 rounded-md bg-blue-100 border-l-4 border-blue-500">
        {title}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-200 text-blue-800 uppercase text-xs">
              <th className="px-4 py-3 border border-gray-300 w-[7%]">Giờ</th>
              <th className="px-4 py-3 border border-gray-300 w-[15%]">Chủ trì</th>
              <th className="px-4 py-3 border border-gray-300 w-[45%]">Nội dung</th>
              <th className="px-4 py-3 border border-gray-300 w-[15%]">Chuẩn bị</th>
              <th className="px-4 py-3 border border-gray-300 w-[10%]">Thành phần tham dự</th>
              <th className="px-4 py-3 border border-gray-300 w-[8%]">Địa điểm</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr 
                key={i}
                className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="p-3 border border-gray-300 align-top">{it.time || ''}</td>
                <td className="p-3 border border-gray-300 align-top">{it.host || ''}</td>
                <td className="p-3 border border-gray-300 align-top">
                  {(it.content || '').split('\n').map((l, k) => <div key={k}>{l}</div>)}
                </td>
                <td className="p-3 border border-gray-300 align-top">{it.prepare || ''}</td>
                <td className="p-3 border border-gray-300 align-top">{it.participants || ''}</td>
                <td className="p-3 border border-gray-300 align-top">{it.location || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}