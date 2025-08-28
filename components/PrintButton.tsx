'use client';

export default function PrintButton() {
  return (
    <button
      className="no-print"
      onClick={() => window.print()}
      style={{
        padding: '8px 14px',
        borderRadius: 8,
        border: '1px solid #d0d7de',
        background: '#fff',
        cursor: 'pointer',
        fontWeight: 600,
      }}
      aria-label="In hoặc lưu PDF"
      title="In / Lưu PDF"
    >
      In / Lưu PDF
    </button>
  );
}
