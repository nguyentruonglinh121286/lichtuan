// components/ScheduleDay.tsx (chỗ dùng day.items.map)
const items = Array.isArray(day?.items) ? day.items : [];
return (
  <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
    {/* ... header ngày ... */}
    {items.length === 0 ? (
      <div className="px-4 py-3 text-sm text-gray-500">Không có nội dung.</div>
    ) : (
      <ul className="divide-y divide-gray-100">
        {items.map((it, i) => (
          <li key={i} className="px-4 py-3">
            {/* render it.time, it.host, it.content... với optional chaining */}
            <div className="text-sm">
              <span className="font-medium">{it?.time}</span>{' '}
              {it?.host && <span>– {it.host}</span>}
              {it?.content && <span>: {it.content}</span>}
            </div>
            {(it?.prepare || it?.participants || it?.location || it?.note) && (
              <div className="mt-1 text-xs text-gray-600">
                {it?.prepare && <div>Chuẩn bị: {it.prepare}</div>}
                {it?.participants && <div>Thành phần: {it.participants}</div>}
                {it?.location && <div>Địa điểm: {it.location}</div>}
                {it?.note && <div>Ghi chú: {it.note}</div>}
              </div>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);
