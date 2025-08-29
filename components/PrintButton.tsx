'use client';

export default function PrintButton() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <button
      onClick={handlePrint}
      className="rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 print:hidden"
    >
      In / Lưu PDF
    </button>
  );
}
