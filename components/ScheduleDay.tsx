export default function ScheduleDay({ day }: { day: any }) {
  const title = String(day?.title ?? '');
  const items: any[] = Array.isArray(day?.items) ? day.items : [];

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header ngày */}
      <div className="bg-gray-50 px-4 py-3">
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      </div>

      {/* Danh sách công việc */}
      {items.length === 0 ? (
        <div className="px-4 py-3 text-sm text-gray-500">Không có nội dung.</div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {items.map((it, i) => {
            const time = it?.time ?? '';
            const host = it?.host ?? '';
            const content = it?.content ?? '';
            const prepare = it?.prepare ?? '';
            const participants = it?.participants ?? '';
            const location = it?.location ?? '';
            const note = it?.note ?? '';

            return (
              <li key={i} className="px-4 py-3">
                <div className="text-sm text-gray-800">
                  {time && <span className="font-medium">{time}</span>}
                  {(host || content) && (
                    <>
                      {time && ' – '}
                      {host && <span>{host}</span>}
                      {host && content && ': '}
                      {content && <span>{content}</span>}
                    </>
                  )}
                </div>

                {(prepare || participants || location || note) && (
                  <div className="mt-1 space-y-0.5 text-xs text-gray-600">
                    {prepare && <div>Chuẩn bị: {prepare}</div>}
                    {participants && <div>Thành phần: {participants}</div>}
                    {location && <div>Địa điểm: {location}</div>}
                    {note && <div>Ghi chú: {note}</div>}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
