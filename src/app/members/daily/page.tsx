'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Star, Heart, Briefcase, Coins, Activity, Compass, AlertCircle, Crown, Lock } from 'lucide-react';

interface DailyFortune {
  destinyNumber: number;
  personalDay: number;
  date: string;
  overallScore: number;
  overallMessage: string;
  love: string;
  work: string;
  money: string;
  health: string;
  luckyColor: string;
  luckyNumber: number;
  luckyDirection: string;
  actionAdvice: string;
  cautionNote: string;
}

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 80 ? '#D4AF37' : score >= 60 ? '#BEB5A5' : '#7A7068';
  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${score * 2.64} 264`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1.5s ease-out' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-[#F5F0E8]" style={{ fontFamily: 'Inter, sans-serif' }}>{score}</span>
        <span className="text-[9px] text-[#7A7068] tracking-wider">/ 100</span>
      </div>
    </div>
  );
}

export default function DailyPage() {
  const [fortune, setFortune] = useState<DailyFortune | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMember, setIsMember] = useState<boolean | null>(null);
  const [dob, setDob] = useState('');
  const [inputDob, setInputDob] = useState('');

  useEffect(() => {
    // Check subscription status
    fetch('/api/subscription/status')
      .then(r => r.json())
      .then(data => setIsMember(data.active))
      .catch(() => setIsMember(false));

    // Get DOB from localStorage or cookie
    const savedDob = localStorage.getItem('kabbalah_dob') || getCookie('sub_dob') || '';
    if (savedDob) {
      setDob(savedDob);
      setInputDob(savedDob);
    }
  }, []);

  useEffect(() => {
    if (!dob) { setLoading(false); return; }
    setLoading(true);
    fetch('/api/daily-fortune', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dob }),
    })
      .then(r => r.json())
      .then(data => { setFortune(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [dob]);

  function getCookie(name: string) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : '';
  }

  const handleDobSubmit = () => {
    if (inputDob) {
      localStorage.setItem('kabbalah_dob', inputDob);
      setDob(inputDob);
    }
  };

  const todayLabel = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

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
        {/* Date Header */}
        <div className="text-center mb-8">
          <p className="text-[10px] text-[#D4AF37] tracking-[0.2em] uppercase mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>DAILY FORTUNE</p>
          <h1 className="text-lg text-[#F5F0E8] tracking-widest mb-1" style={{ fontFamily: '"Noto Serif JP", serif' }}>今日のあなたの運勢</h1>
          <p className="text-xs text-[#7A7068] tracking-wider">{todayLabel}</p>
        </div>

        {/* DOB Input (if not set) */}
        {!dob && (
          <div className="bg-white/[0.04] border border-white/10 rounded-sm p-6 mb-8">
            <p className="text-sm text-[#F5F0E8] tracking-wider mb-4 text-center">生年月日を入力してください</p>
            <input
              type="date"
              value={inputDob}
              onChange={(e) => setInputDob(e.target.value)}
              className="w-full bg-white/[0.06] border border-white/10 rounded-sm px-4 py-3 text-[#F5F0E8] text-sm tracking-wider focus:outline-none focus:border-[#D4AF37]/50 mb-3"
            />
            <button onClick={handleDobSubmit}
              className="w-full py-3 rounded-sm text-sm tracking-widest text-[#0C0A14] font-bold"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)' }}>
              運勢を見る
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && dob && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-xs text-[#7A7068] tracking-wider">今日の運勢を鑑定中...</p>
          </div>
        )}

        {/* Fortune Display */}
        {fortune && !loading && (
          <div className="space-y-6">
            {/* Score */}
            <div className="bg-white/[0.04] border border-white/10 rounded-sm p-6 text-center">
              <p className="text-[10px] text-[#7A7068] tracking-wider mb-3">運命数 {fortune.destinyNumber} × 個人日数 {fortune.personalDay}</p>
              <ScoreGauge score={fortune.overallScore} />
              <p className="text-sm text-[#F5F0E8] tracking-wider mt-4 leading-relaxed">{fortune.overallMessage}</p>
            </div>

            {/* Lucky Items */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'ラッキーカラー', value: fortune.luckyColor, icon: '🎨' },
                { label: 'ラッキーナンバー', value: fortune.luckyNumber.toString(), icon: '🔢' },
                { label: 'ラッキー方位', value: fortune.luckyDirection, icon: '🧭' },
              ].map((item, i) => (
                <div key={i} className="bg-white/[0.04] border border-white/5 rounded-sm p-3 text-center">
                  <p className="text-lg mb-1">{item.icon}</p>
                  <p className="text-xs text-[#F5F0E8] font-medium">{item.value}</p>
                  <p className="text-[9px] text-[#7A7068] mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Category Fortunes - show preview for non-members */}
            {isMember ? (
              <>
                <div className="space-y-3">
                  {[
                    { icon: Heart, label: '恋愛運', text: fortune.love, color: '#E8A0BF' },
                    { icon: Briefcase, label: '仕事運', text: fortune.work, color: '#6EC6FF' },
                    { icon: Coins, label: '金運', text: fortune.money, color: '#D4AF37' },
                    { icon: Activity, label: '健康運', text: fortune.health, color: '#7ECB8B' },
                  ].map((cat, i) => (
                    <div key={i} className="bg-white/[0.04] border border-white/5 rounded-sm p-4 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: cat.color + '15' }}>
                        <cat.icon className="w-4 h-4" style={{ color: cat.color }} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-xs font-medium tracking-wider mb-1" style={{ color: cat.color }}>{cat.label}</p>
                        <p className="text-sm text-[#BEB5A5] tracking-wider leading-relaxed">{cat.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Advice */}
                <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-sm p-5">
                  <p className="text-xs text-[#D4AF37] tracking-wider font-medium mb-2">✦ 今日の開運アクション</p>
                  <p className="text-sm text-[#F5F0E8] tracking-wider leading-relaxed">{fortune.actionAdvice}</p>
                </div>

                {/* Caution */}
                <div className="bg-white/[0.02] border border-white/5 rounded-sm p-4 flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-[#7A7068] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-[10px] text-[#7A7068] tracking-wider mb-1">今日の注意点</p>
                    <p className="text-sm text-[#BEB5A5] tracking-wider">{fortune.cautionNote}</p>
                  </div>
                </div>
              </>
            ) : (
              /* Non-member: show locked content */
              <div className="relative">
                <div className="space-y-3 opacity-30 blur-[2px] pointer-events-none">
                  {['恋愛運', '仕事運', '金運', '健康運'].map((label, i) => (
                    <div key={i} className="bg-white/[0.04] border border-white/5 rounded-sm p-4 h-20" />
                  ))}
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/30 mb-3">
                    <Lock className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <p className="text-sm text-[#F5F0E8] tracking-wider mb-1">詳しい運勢は月額メンバー限定</p>
                  <p className="text-xs text-[#7A7068] tracking-wider mb-4">恋愛・仕事・金運・健康運 + 開運アクション</p>
                  <a href="/subscribe" className="px-6 py-2.5 rounded-sm text-sm tracking-widest text-[#0C0A14] font-bold inline-flex items-center gap-1"
                    style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)' }}>
                    <Crown className="w-3.5 h-3.5" />月額¥480で全て見る
                  </a>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 pt-4">
              <a href="/members/compatibility" className="flex-1 text-center py-3 rounded-sm bg-white/[0.06] border border-white/10 text-xs text-[#BEB5A5] tracking-wider hover:border-[#D4AF37]/30 transition-colors">
                💕 相性診断
              </a>
              <a href="/" className="flex-1 text-center py-3 rounded-sm bg-white/[0.06] border border-white/10 text-xs text-[#BEB5A5] tracking-wider hover:border-[#D4AF37]/30 transition-colors">
                🏠 トップページ
              </a>
            </div>
          </div>
        )}
      </div>

      <footer className="py-8 text-center border-t border-white/5">
        <p className="text-[10px] text-[#7A7068] tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>&copy; 2026 Kabbalah</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=Inter:wght@400;600;700&display=swap');` }} />
    </main>
  );
}
