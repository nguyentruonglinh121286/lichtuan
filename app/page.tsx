// app/page.tsx

// TẮT cache / prerender để không giữ dữ liệu rỗng build-time
export const revalidate = 0;
// hoặc dùng thêm: export const dynamic = 'force-dynamic';

async function getData() {
  // DÙNG ĐƯỜNG DẪN NỘI BỘ CHO CHẮC
  const url = '/api/schedule';

  try {
    const res = await fetch(url, {
      cache: 'no-store',          // không cache ở server
      // next: { revalidate: 0 }, // tùy chọn thêm
    });
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const json = await res.json();
    return json ?? {};
  } catch (e) {
    // Fallback để UI không vỡ nếu có lỗi tạm thời
    return { week: 'Tuần (chưa có dữ liệu)', note: '', highlights: [], days: [] };
  }
}
