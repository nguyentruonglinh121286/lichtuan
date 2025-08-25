# Lịch Tuần Online (Next.js + Vercel Blob)

- Public: xem lịch **không cần đăng nhập** (`/`).
- Admin: cập nhật lịch (JSON) với **mật khẩu** (`/admin`).
- Dữ liệu lưu trên **Vercel Blob** (public JSON). Không cần Postgres/Prisma.

## 1) Cấu hình môi trường (Vercel)
Tạo 2 biến môi trường trong **Project → Settings → Environment Variables**:
- `ADMIN_PASSWORD` – mật khẩu vào trang admin (tự đặt).
- `BLOB_READ_WRITE_TOKEN` – token của Vercel Blob (Dashboard → Storage → Blob → Create Access Token).

Sau đó **Redeploy**.

## 2) Deploy mới từ GitHub
- Push repo này lên GitHub.
- Vercel → New Project → Import repo → Deploy.
- Sau khi deploy: vào `/admin`, nhập mật khẩu, bấm **Load sample** rồi **Publish** để tạo `schedule.json` lần đầu.

## 3) Cấu trúc JSON
```json
{
  "week": "Tuần 35 (25/8–31/8/2025)",
  "note": "Lịch tuần thay giấy mời đối với nội bộ cơ quan Liên đoàn Lao động Thành phố",
  "days": [
    {
      "title": "Thứ Hai (25/8)",
      "items": [
        {
          "time": "07g30",
          "host": "Tập thể Thường trực",
          "content": "Chào cờ đầu tuần",
          "prepare": "",
          "participants": "CB-NV cơ quan",
          "location": "PH B"
        }
      ]
    }
  ]
}
```

## 4) Tuỳ biến
- Giao diện dùng Tailwind. Sửa trong `app/page.tsx` nếu muốn đổi bảng.
- Nếu muốn nhập từ DOCX/CSV, có thể đổi UI admin để parse dữ liệu rồi lưu JSON (client-side).
