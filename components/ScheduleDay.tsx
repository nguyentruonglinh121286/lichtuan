type Item = {
  time: string;
  host?: string;
  content: string;
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
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 font-semibold text-gray-700">
        {day.title} {day.note ? <span className="ml-2 text-sm text-gray-500">({day.note})</span> : null}
      </div>
      <ul className="divide-y divide-gray-200">
        {day.items.map((item, idx) => (
          <li key={idx} className="px-4 py-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <span className="font-medium text-blue-700">{item.time}</span>
              {item.host && <span className="text-sm text-gray-600">Chủ trì: {item.host}</span>}
            </div>
            <div className="mt-1 text-gray-800">{item.content}</div>
            {item.prepare && <div className="text-sm text-gray-500">Chuẩn bị: {item.prepare}</div>}
            {item.participants && <div className="text-sm text-gray-500">Thành phần: {item.participants}</div>}
            {item.location && <div className="text-sm text-gray-500">Địa điểm: {item.location}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
