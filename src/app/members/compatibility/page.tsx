'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Heart, Briefcase, Users, Star, Lock, Crown, ArrowRight } from 'lucide-react';

interface CompatibilityResult {
  overallScore: number;
  loveScore: number;
  workScore: number;
  friendScore: number;
  overallMessage: string;
  loveAdvice: string;
  workAdvice: string;
  communicationTip: string;
  cautionNote: string;
}

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-[#BEB5A5] tracking-wider">{label}</span>
        <span className="text-xs font-medium" style={{ color, fontFamily: 'Inter, sans-serif' }}>{score}%</span>
      </div>
      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export default function CompatibilityPage() {
  const [isMember, setIsMember] = useState<boolean | null>(null);
  const [myDob, setMyDob] = useState('');
  const [partnerDob, setPartnerDob] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [error, setError] = useState('');
  const [checkCount, setCheckCount] = useState(0);

  useEffect(() => {
    fetch('/api/subscription/status')
      .then(r => r.json())
      .then(data => setIsMember(data.active))
      .catch(() => setIsMember(false));

    const savedDob = localStorage.getItem('kabbalah_dob') || '';
    if (savedDob) setMyDob(savedDob);

    const count = parseInt(localStorage.getItem('compat_count') || '0');
    setCheckCount(count);
  }, []);

  const handleCheck = async () => {
    if (!myDob || !partnerDob) {
      setError('両方の生年月日を入力してください。');
      return;
    }

    // Non-members: limit to 1 free check
    if (!isMember && checkCount >= 1) {
      setError('無料での相性診断は1回までです。月額メンバーに登録すると無制限でご利用いただけます。');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name1: 'あなた', dob1: myDob, name2: '相手', dob2: partnerDob }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      // Map existing API response to our format
      const c = data.compatibility;
      setResult({
        overallScore: c.compatibilityScore || 75,
        loveScore: Math.min(100, (c.compatibilityScore || 75) + Math.floor(Math.random() * 10 - 5)),
        workScore: Math.min(100, (c.compatibilityScore || 75) + Math.floor(Math.random() * 10 - 5)),
        friendScore: Math.min(100, (c.compatibilityScore || 75) + Math.floor(Math.random() * 10 - 5)),
        overallMessage: c.overallAnalysis || '',
        loveAdvice: c.strengths || '',
        workAdvice: c.challenges || '',
        communicationTip: c.advice || '',
        cautionNote: c.challenges || '',
      });

      if (!isMember) {
        const newCount = checkCount + 1;
        setCheckCount(newCount);
        localStorage.setItem('compat_count', newCount.toString());
      }
    } catch (err: any) {
      setError(err.message || 'エラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0C0A14] text-[#BEB5A5] selection:bg-[#D4AF37]/30 selection:text-white">
      <nav className="w-full bg-[#0C0A14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="text-xs font-light tracking-[0.25em] text-[#D4AF37]/80 uppercase flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} /><span>Kabbalah</span>
          </a>
          {isMember && (
            <span className="text-[10px] text-[#D4AF37] tracking-wider bg-[#D4AF37]/10 px-2 py-1 rounded-full border border-[#D4AF37]/20">MEMBER</span>
          )}
        </div>
      </nav>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <div className="max-w-lg mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <p className="text-[10px] text-[#D4AF37] tracking-[0.2em] uppercase mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>COMPATIBILITY</p>
          <h1 className="text-lg text-[#F5F0E8] tracking-widest mb-1" style={{ fontFamily: '"Noto Serif JP", serif' }}>相性診断</h1>
          <p className="text-xs text-[#7A7068] tracking-wider">二人の運命数から、魂レベルの相性を鑑定</p>
        </div>

        {/* Input Form */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs text-[#7A7068] tracking-wider mb-1.5">あなたの生年月日</label>
            <input type="date" value={myDob} onChange={(e) => setMyDob(e.target.value)}
              className="w-full bg-white/[0.06] border border-white/10 rounded-sm px-4 py-3 text-[#F5F0E8] text-sm tracking-wider focus:outline-none focus:border-[#D4AF37]/50" />
          </div>
          <div>
            <label className="block text-xs text-[#7A7068] tracking-wider mb-1.5">相手の生年月日</label>
            <input type="date" value={partnerDob} onChange={(e) => setPartnerDob(e.target.value)}
              className="w-full bg-white/[0.06] border border-white/10 rounded-sm px-4 py-3 text-[#F5F0E8] text-sm tracking-wider focus:outline-none focus:border-[#D4AF37]/50" />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-sm">
            <p className="text-xs text-red-400 tracking-wider">{error}</p>
            {!isMember && checkCount >= 1 && (
              <a href="/subscribe" className="inline-block mt-2 text-xs text-[#D4AF37] tracking-wider underline">月額メンバーに登録する →</a>
            )}
          </div>
        )}

        <button onClick={handleCheck} disabled={loading}
          className="w-full py-3.5 rounded-sm text-sm tracking-widest text-[#0C0A14] font-bold disabled:opacity-30 flex justify-center items-center"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)' }}>
          {loading ? <div className="w-5 h-5 border-2 border-[#0C0A14] border-t-transparent rounded-full animate-spin" /> : '✦ 相性を鑑定する'}
        </button>

        {!isMember && (
          <p className="text-center text-[10px] text-[#7A7068] tracking-wider mt-2">
            無料: あと{Math.max(0, 1 - checkCount)}回 ｜ <a href="/subscribe" className="text-[#D4AF37]">月額メンバーなら無制限</a>
          </p>
        )}

        {/* Result */}
        {result && (
          <div className="mt-8 space-y-5">
            {/* Overall Score */}
            <div className="bg-white/[0.04] border border-white/10 rounded-sm p-6 text-center">
              <p className="text-[10px] text-[#7A7068] tracking-wider mb-3">総合相性</p>
              <p className="text-4xl font-bold text-[#D4AF37] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{result.overallScore}<span className="text-lg">%</span></p>
              <p className="text-sm text-[#F5F0E8] tracking-wider leading-relaxed">{result.overallMessage}</p>
            </div>

            {/* Score Bars */}
            <div className="bg-white/[0.04] border border-white/5 rounded-sm p-5 space-y-4">
              <ScoreBar label="💕 恋愛相性" score={result.loveScore} color="#E8A0BF" />
              <ScoreBar label="💼 仕事相性" score={result.workScore} color="#6EC6FF" />
              <ScoreBar label="👥 友人相性" score={result.friendScore} color="#7ECB8B" />
            </div>

            {isMember ? (
              <>
                {/* Detailed Advice */}
                <div className="space-y-3">
                  {[
                    { label: '恋愛アドバイス', text: result.loveAdvice, icon: '💕' },
                    { label: '仕事関係のコツ', text: result.workAdvice, icon: '💼' },
                    { label: 'コミュニケーションのポイント', text: result.communicationTip, icon: '💬' },
                    { label: '注意点', text: result.cautionNote, icon: '⚠️' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/5 rounded-sm p-4">
                      <p className="text-xs text-[#D4AF37] tracking-wider font-medium mb-1">{item.icon} {item.label}</p>
                      <p className="text-sm text-[#BEB5A5] tracking-wider leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="relative">
                <div className="space-y-3 opacity-20 blur-[2px] pointer-events-none">
                  {['恋愛アドバイス', '仕事関係のコツ', 'コミュニケーション', '注意点'].map((l, i) => (
                    <div key={i} className="bg-white/[0.04] border border-white/5 rounded-sm p-4 h-16" />
                  ))}
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Lock className="w-5 h-5 text-[#D4AF37] mb-2" />
                  <p className="text-sm text-[#F5F0E8] tracking-wider mb-3">詳しいアドバイスは月額メンバー限定</p>
                  <a href="/subscribe" className="px-5 py-2 rounded-sm text-xs tracking-widest text-[#0C0A14] font-bold"
                    style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)' }}>月額¥480で全て見る</a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 pt-8">
          <a href="/members/daily" className="flex-1 text-center py-3 rounded-sm bg-white/[0.06] border border-white/10 text-xs text-[#BEB5A5] tracking-wider hover:border-[#D4AF37]/30 transition-colors">
            ⭐ 今日の運勢
          </a>
          <a href="/" className="flex-1 text-center py-3 rounded-sm bg-white/[0.06] border border-white/10 text-xs text-[#BEB5A5] tracking-wider hover:border-[#D4AF37]/30 transition-colors">
            🏠 トップページ
          </a>
        </div>
      </div>

      <footer className="py-8 text-center border-t border-white/5">
        <p className="text-[10px] text-[#7A7068] tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>&copy; 2026 Kabbalah</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=Inter:wght@400;600;700&display=swap');` }} />
    </main>
  );
}
