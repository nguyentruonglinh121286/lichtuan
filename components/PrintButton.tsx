// components/PrintButton.tsx
'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 print:hidden"
    >
      In / Lưu PDF
    </button>
  );
}
