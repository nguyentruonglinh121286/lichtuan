import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lịch tuần online',
  description: 'Trang xem lịch công tác (công khai)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <div className="container py-6">
          {children}
        </div>
      </body>
    </html>
  );
}
