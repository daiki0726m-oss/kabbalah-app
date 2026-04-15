'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShieldCheck, Sparkles, Crown, Star, Calendar, Heart } from 'lucide-react';

function SubscribeContent() {
  const searchParams = useSearchParams();
  const dobParam = searchParams.get('dob') || '';
  const [dob, setDob] = useState(dobParam);
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fieldsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load KOMOJU fields script
    if (!document.querySelector('script[src*="multipay.komoju.com"]')) {
      const script = document.createElement('script');
      script.src = 'https://multipay.komoju.com/fields.js';
      script.type = 'module';
      document.head.appendChild(script);
    }

    // Restore DOB from localStorage
    if (!dobParam) {
      const savedDob = localStorage.getItem('kabbalah_dob');
      if (savedDob) setDob(savedDob);
    }
  }, [dobParam]);

  // Render KOMOJU fields when sessionId is available
  useEffect(() => {
    if (!sessionId || !fieldsContainerRef.current) return;

    const container = fieldsContainerRef.current;
    container.innerHTML = '';

    const fields = document.createElement('komoju-fields');
    fields.setAttribute('session-id', sessionId);
    fields.setAttribute('publishable-key', process.env.NEXT_PUBLIC_KOMOJU_PUBLISHABLE_KEY || '');
    fields.setAttribute('payment-type', 'credit_card');
    fields.setAttribute('locale', 'ja');
    container.appendChild(fields);
  }, [sessionId]);

  const handleCreateSession = async () => {
    if (!dob) {
      setError('生年月日を入力してください。');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/subscription/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dob }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      localStorage.setItem('kabbalah_dob', dob);
      setSessionId(data.sessionId);
    } catch (err: any) {
      setError(err.message || 'エラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const fields = document.querySelector('komoju-fields');
    if (fields && typeof (fields as any).submit === 'function') {
      (fields as any).submit();
    }
  };

  return (
    <main className="min-h-screen bg-[#0C0A14] text-[#BEB5A5] selection:bg-[#D4AF37]/30 selection:text-white">
      <nav className="w-full bg-[#0C0A14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="text-xs font-light tracking-[0.25em] text-[#D4AF37]/80 uppercase flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} /><span>Kabbalah</span>
          </a>
        </div>
      </nav>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <div className="max-w-lg mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#D4AF37]/15 flex items-center justify-center border border-[#D4AF37]/30">
            <Crown className="w-7 h-7 text-[#D4AF37]" strokeWidth={1.5} />
          </div>
          <h1 className="text-lg md:text-xl font-light text-[#F5F0E8] tracking-widest mb-2" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            30日間メンバーシップ
          </h1>
          <p className="text-xs text-[#7A7068] tracking-wider">毎日の運勢 × 相性診断 × 月間レポート</p>
        </div>

        <div className="text-center mb-8 bg-white/[0.04] border border-[#D4AF37]/20 rounded-sm p-6">
          <p className="text-3xl text-[#F5F0E8] font-medium mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            ¥480<span className="text-sm text-[#7A7068] font-normal">/月（税込）</span>
          </p>
          <p className="text-xs text-[#D4AF37] tracking-wider">☕ コーヒー1杯分で、毎日の運命がわかる</p>
        </div>

        <div className="space-y-3 mb-8">
          {[
            { icon: Star, label: '毎日のパーソナル運勢', desc: '運命数×日付で毎日変わるあなた専用の運勢' },
            { icon: Calendar, label: '月間ディープレポート', desc: '仕事運・恋愛運・金運・健康運を月単位で詳細分析' },
            { icon: Heart, label: '相性診断 無制限', desc: '気になる人との相性を何人でもチェック' },
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-3 bg-white/[0.03] border border-white/5 rounded-sm p-4">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0 mt-0.5">
                <f.icon className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-[#F5F0E8] tracking-wider font-medium">{f.label}</p>
                <p className="text-xs text-[#7A7068] tracking-wider mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {!sessionId && (
          <>
            <div className="mb-6">
              <label className="block text-xs text-[#7A7068] tracking-wider mb-2">生年月日</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-white/[0.06] border border-white/10 rounded-sm px-4 py-3 text-[#F5F0E8] text-sm tracking-wider focus:outline-none focus:border-[#D4AF37]/50"
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-sm">
                <p className="text-xs text-red-400 tracking-wider">{error}</p>
              </div>
            )}

            <button
              onClick={handleCreateSession}
              disabled={loading}
              className="w-full py-4 rounded-sm font-bold tracking-widest text-sm transition-all disabled:opacity-30 text-[#0C0A14] flex justify-center items-center"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)', boxShadow: '0 0 20px rgba(212,175,55,0.2)' }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#0C0A14] border-t-transparent rounded-full animate-spin" />
              ) : (
                '✦ お支払いに進む'
              )}
            </button>
          </>
        )}

        {sessionId && (
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-sm p-6">
            <p className="text-xs text-[#7A7068] tracking-wider mb-4 text-center">クレジットカード情報を入力してください</p>
            <form onSubmit={handleSubmit}>
              <div ref={fieldsContainerRef} />
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-sm font-bold tracking-widest text-sm transition-all text-[#0C0A14] mt-4 disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)', boxShadow: '0 0 20px rgba(212,175,55,0.2)' }}
              >
                {submitting ? <><div className="w-4 h-4 border-2 border-[#0C0A14] border-t-transparent rounded-full animate-spin" />処理中...</> : '¥480 を支払う'}
              </button>
            </form>
          </div>
        )}

        <p className="mt-3 text-center text-[10px] text-[#7A7068] tracking-wider flex items-center justify-center gap-1" style={{ fontFamily: 'Inter, sans-serif' }}>
          <ShieldCheck className="w-3 h-3 inline -mt-0.5" />自動更新なし・SSL暗号化決済
        </p>

        <div className="mt-8 text-center">
          <a href="/" className="text-xs text-[#7A7068] tracking-widest hover:text-[#D4AF37] transition-colors">← トップページに戻る</a>
        </div>
      </div>

      <footer className="py-8 text-center border-t border-white/5">
        <p className="text-[10px] text-[#7A7068] tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>&copy; 2026 Kabbalah</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=Inter:wght@400;600;700&display=swap');
        komoju-fields { display: block; }
      `}} />
    </main>
  );
}

export default function SubscribePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0C0A14]" />}>
      <SubscribeContent />
    </Suspense>
  );
}
