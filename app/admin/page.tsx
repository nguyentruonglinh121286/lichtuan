'use client';

import { useState } from 'react';
import type { Schedule } from '../../types';

function sample(): Schedule {
  return {
    week: 'Tuần 35 (25/8–31/8/2025)',
    note: 'Lịch tuần thay giấy mời đối với nội bộ cơ quan Liên đoàn Lao động Thành phố',
    days: [
      {
        title: 'Thứ Hai (25/8)',
        items: [
          { time: '07g30', host: 'Tập thể Thường trực', content: 'Chào cờ đầu tuần', participants: 'CB-NV cơ quan', location: 'PH B' }
        ]
      },
      {
        title: 'Chủ nhật (31/8)',
        items: []
      }
    ]
  };
}

export default function AdminPage() {
  const [ok, setOk] = useState(false);
  const [pwd, setPwd] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string| null>(null);

  async function checkPass(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const res = await fetch('/api/admin/check', { method: 'POST', body: JSON.stringify({ pwd }) });
    if (res.ok) setOk(true);
    else setMsg('Sai mật khẩu');
    setLoading(false);
  }

  async function loadCurrent() {
    setLoading(true);
    setMsg(null);
    const res = await fetch('/api/schedule');
    const js = await res.json();
    setText(JSON.stringify(js, null, 2));
    setLoading(false);
  }
  async function loadSample() {
    setText(JSON.stringify(sample(), null, 2));
  }
  async function publish() {
    try {
      setLoading(true);
      setMsg(null);
      const parsed = JSON.parse(text);
      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(parsed)
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg('✅ Đã publish lịch (schedule.json)');
    } catch (e: any) {
      setMsg('Lỗi: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  if (!ok) {
    return (
      <main className="card p-6 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4 text-brand-blue">Admin – Cập nhật lịch</h1>
        <form onSubmit={checkPass} className="grid gap-3">
          <label className="label">Mật khẩu</label>
          <input className="input" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} required />
          <button className="btn btn-primary mt-2" disabled={loading}>Đăng nhập</button>
          {msg && <p className="text-red-600 text-sm">{msg}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="card p-6">
      <h1 className="text-xl font-bold text-brand-blue mb-4">Soạn & Publish lịch tuần</h1>
      <div className="mb-3 flex gap-2">
        <button className="btn btn-primary" onClick={loadCurrent} disabled={loading}>Load current</button>
        <button className="btn" onClick={loadSample} disabled={loading}>Load sample</button>
        <button className="btn btn-primary" onClick={publish} disabled={loading}>Publish</button>
      </div>
      <textarea className="input" rows={24} value={text} onChange={e=>setText(e.target.value)} />
      {msg && <p className="mt-2 text-sm">{msg}</p>}
      <p className="note">Dữ liệu được lưu vào <b>Vercel Blob</b> dưới tên <code>schedule.json</code> (public).</p>
    </main>
  );
}
