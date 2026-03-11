"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useMemo } from "react";
import { Lock, Sparkles, Heart, Briefcase, Star, ShieldCheck, Compass, Sun, Moon, Gem, TrendingUp, Users, ChevronRight, Clock, Crown, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { calculateLifePathNumber, generateBiorhythm, personalityData } from "@/lib/numerology";

function ResultTeaserContent() {
  const searchParams = useSearchParams();
  const rawName = searchParams.get("name") || "あなた";
  const rawDob = searchParams.get("dob") || "1990-01-01";
  const name = decodeURIComponent(rawName);
  const dob = decodeURIComponent(rawDob);

  const [loading, setLoading] = useState(false);
  const [dailyCount, setDailyCount] = useState(0);

  const lifePathNumber = useMemo(() => calculateLifePathNumber(dob), [dob]);
  const profile = personalityData[lifePathNumber] || personalityData[7];
  const biorhythmData = useMemo(() => generateBiorhythm(dob), [dob]);

  useEffect(() => { const d = new Date(); setDailyCount(47 + ((d.getDate() + d.getMonth() * 31) % 38)); }, []);

  // Reset loading state when user navigates back from Stripe
  useEffect(() => {
    const resetLoading = () => { setLoading(false); };
    const handlePageShow = (e: PageTransitionEvent) => { if (e.persisted) setLoading(false); };
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') resetLoading(); });
    window.addEventListener('pageshow', handlePageShow);
    return () => { window.removeEventListener('pageshow', handlePageShow); };
  }, []);

  const [remainingSlots, setRemainingSlots] = useState(0);
  useEffect(() => { const h = new Date().getHours(); setRemainingSlots(Math.max(3, 30 - Math.floor(h * 1.2))); }, []);

  const handleCheckout = async (plan: 'standard' | 'premium' = 'standard') => {
    try {
      setLoading(true);
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'begin_checkout', { currency: 'JPY', value: plan === 'premium' ? 2980 : 980, items: [{ item_name: plan }] });
      }
      const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, dob, plan }) });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; } else { alert(data.error || "決済セッションの作成に失敗しました。"); setLoading(false); }
    } catch { alert("通信エラーが発生しました。"); setLoading(false); }
  };

  const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.15 * i, duration: 0.6 } }) };

  return (
    <main className="min-h-screen bg-[#0C0A14] text-[#BEB5A5] overflow-x-hidden selection:bg-[#D4AF37]/30 selection:text-white">

      {/* Nav */}
      <nav className="w-full bg-[#0C0A14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="text-xs font-light tracking-[0.25em] text-[#D4AF37]/80 uppercase flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} /><span>Kabbalah</span>
          </div>
          <span className="text-[10px] tracking-[0.15em] text-[#7A7068] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>Reading Result</span>
        </div>
      </nav>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>

      <div className="max-w-3xl mx-auto px-5 pb-20">

        {/* ===== Destiny Number Reveal ===== */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mt-12 text-center">
          <p className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>Your Destiny Number</p>

          <div className="relative inline-block mb-6">
            <div className="w-28 h-28 rounded-full border-2 border-[#D4AF37]/40 flex items-center justify-center bg-[#D4AF37]/10 shadow-[0_0_40px_rgba(212,175,55,0.15)] mx-auto">
              <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5, type: "spring" }} className="text-5xl font-bold text-[#D4AF37]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {lifePathNumber}
              </motion.span>
            </div>
            <div className="absolute inset-0 w-28 h-28 rounded-full border border-[#D4AF37]/10 scale-[1.3] mx-auto animate-pulse"></div>
          </div>

          <h1 className="text-2xl md:text-3xl font-light text-[#F5F0E8] tracking-widest leading-relaxed mb-2" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            {name} 様の運命数
          </h1>
          <p className="text-lg text-[#D4AF37] tracking-widest font-medium mb-2">─ {profile.title} ─</p>
          <p className="text-xs text-[#7A7068] tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
            生年月日 {dob.replace(/-/g, '.')} より算出
          </p>
        </motion.section>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-10">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-white/10"></div>
          <Sparkles className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-white/10"></div>
        </div>

        {/* ===== Personality Cards ===== */}
        <section className="space-y-5">
          <div className="text-center mb-8">
            <h2 className="text-lg md:text-xl font-light text-[#F5F0E8] tracking-widest" style={{ fontFamily: '"Noto Serif JP", serif' }}>
              運命数 {lifePathNumber} が示すあなたの本質
            </h2>
          </div>

          {[
            { i: 0, icon: <Sun className="w-5 h-5 text-[#F5D76E]" strokeWidth={1.5} />, label: "光の性質", labelColor: "text-[#F5D76E]", gradientFrom: "#F5D76E", gradientTo: "#D4AF37", data: profile.light },
            { i: 1, icon: <Moon className="w-5 h-5 text-[#8B8B9E]" strokeWidth={1.5} />, label: "影の性質", labelColor: "text-[#8B8B9E]", gradientFrom: "#8B8B9E", gradientTo: "#5A5A6E", data: profile.shadow },
            { i: 2, icon: <Gem className="w-5 h-5 text-[#E8656C]" strokeWidth={1.5} />, label: "隠された才能", labelColor: "text-[#E8656C]", gradientFrom: "#E8656C", gradientTo: "#D4AF37", data: profile.talent },
          ].map(({ i, icon, label, labelColor, gradientFrom, gradientTo, data }) => (
            <motion.div key={i} custom={i} initial="hidden" animate="visible" variants={cardVariants}
              className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-sm p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})` }}></div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">{icon}</div>
                <div>
                  <p className={`text-[10px] tracking-[0.15em] ${labelColor} uppercase font-bold mb-1`} style={{ fontFamily: 'Inter, sans-serif' }}>{label}</p>
                  <h3 className="text-base md:text-lg font-medium text-[#F5F0E8] tracking-wider mb-3">{data.label}</h3>
                  <p className="text-sm text-[#BEB5A5] leading-[2] tracking-wider">{data.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* ===== SNS Share ===== */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="mt-10 px-4">
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-sm p-6 text-center">
            <p className="text-xs text-[#7A7068] tracking-wider mb-3">あなたの鑑定結果を友達にシェア</p>
            <div className="flex items-center justify-center gap-3">
              {/* LINE Share */}
              <a
                href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : 'https://kabbalah-app-ruddy.vercel.app')}&text=${encodeURIComponent(`カバラ数秘術で鑑定したら、私の運命数は【${lifePathNumber}】でした！無料で鑑定できます✨`)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-white text-xs font-bold tracking-wider transition-all hover:opacity-80"
                style={{ background: '#06C755' }}
                onClick={() => { if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') (window as any).gtag('event', 'share', { method: 'LINE', content_type: 'result' }); }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.271.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
                LINE
              </a>
              {/* X (Twitter) Share */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`カバラ数秘術で鑑定したら、私の運命数は【${lifePathNumber}】でした！\n4,000年の叡智が導く運命の鑑定書、無料で試せます✨`)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : 'https://kabbalah-app-ruddy.vercel.app')}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-white text-xs font-bold tracking-wider transition-all hover:opacity-80 bg-black border border-white/20"
                onClick={() => { if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') (window as any).gtag('event', 'share', { method: 'Twitter', content_type: 'result' }); }}
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X
              </a>
            </div>
          </div>
        </motion.section>

        {/* ===== Biorhythm Chart ===== */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-16">
          <div className="text-center mb-6">
            <h2 className="text-lg md:text-xl font-light text-[#F5F0E8] tracking-widest mb-2" style={{ fontFamily: '"Noto Serif JP", serif' }}>
              今後12ヶ月の運勢バイオリズム
            </h2>
            <p className="text-xs text-[#7A7068] tracking-widest">あなたの運気の波を可視化</p>
          </div>
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-sm p-4 md:p-6 relative overflow-hidden">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={biorhythmData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#7A7068', fontSize: 10 }} dy={5} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#7A7068', fontSize: 10 }} />
                  <ReferenceLine y={50} stroke="rgba(255,255,255,0.08)" strokeDasharray="5 5" />
                  <Tooltip contentStyle={{ backgroundColor: '#151221', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', borderRadius: '4px', color: '#BEB5A5' }} labelStyle={{ color: '#D4AF37', fontWeight: 'bold' }} />
                  <Line type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={2.5} dot={{ fill: '#0C0A14', stroke: '#D4AF37', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#D4AF37', stroke: '#0C0A14', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute top-0 right-0 w-[45%] h-full bg-gradient-to-l from-[#0C0A14] via-[#0C0A14]/95 to-transparent flex items-center justify-center pointer-events-none">
              <div className="text-center pr-4">
                <Lock className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-[11px] text-[#7A7068] tracking-wider leading-relaxed">後半6ヶ月の<br />運勢は完全版で</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ===== Monthly Prediction ===== */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }} className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-lg md:text-xl font-light text-[#F5F0E8] tracking-widest mb-2" style={{ fontFamily: '"Noto Serif JP", serif' }}>
              あなたの今後12ヶ月 ─ 月別運勢
            </h2>
            <p className="text-xs text-[#7A7068] tracking-widest">{new Date().getMonth() + 1}月の詳細鑑定結果をお見せします</p>
          </div>

          <div className="space-y-4">
            {profile.monthlyTeaser.map((m) => (
              <div key={m.month} className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-sm overflow-hidden">
                <div className="bg-white/[0.03] px-5 md:px-6 py-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold tracking-widest text-[#7A7068] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>{new Date().getMonth() + 1 <= 12 ? new Date().getFullYear() : new Date().getFullYear() + 1}</span>
                    <span className="text-xl text-[#D4AF37] font-bold">{new Date().getMonth() + 1}月</span>
                    <span className="text-sm text-[#BEB5A5] tracking-wider ml-1">─ {m.title}</span>
                  </div>
                  <p className="text-sm text-[#BEB5A5] leading-[2] tracking-wider mt-3">{m.overall}</p>
                </div>
                <div className="divide-y divide-white/[0.06]">
                  {[
                    { icon: <Briefcase className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />, label: "仕事運", text: m.work },
                    { icon: <TrendingUp className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />, label: "金運", text: m.finance },
                    { icon: <Heart className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />, label: "恋愛運", text: m.love },
                    { icon: <ShieldCheck className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />, label: "健康運", text: m.health },
                  ].map((sub, j) => (
                    <div key={j} className="px-5 md:px-6 py-4 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center shrink-0 mt-0.5">{sub.icon}</div>
                      <div>
                        <p className="text-[10px] tracking-[0.15em] text-[#D4AF37] uppercase font-bold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{sub.label}</p>
                        <p className="text-sm text-[#BEB5A5] leading-[2] tracking-wider">{sub.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Month 2 Cliffhanger */}
            <div className="relative">
              <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-sm overflow-hidden">
                <div className="bg-white/[0.03] px-5 md:px-6 py-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold tracking-widest text-[#7A7068] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>{(new Date().getMonth() + 2) > 12 ? new Date().getFullYear() + 1 : new Date().getFullYear()}</span>
                    <span className="text-xl text-[#D4AF37] font-bold">{(new Date().getMonth() + 2) > 12 ? (new Date().getMonth() + 2) - 12 : new Date().getMonth() + 2}月</span>
                    <span className="text-sm text-[#BEB5A5] tracking-wider ml-1">─ 転機の月</span>
                  </div>
                  <p className="text-sm text-[#BEB5A5] leading-[2] tracking-wider mt-3">
                    {(new Date().getMonth() + 2) > 12 ? (new Date().getMonth() + 2) - 12 : new Date().getMonth() + 2}月はあなたにとって「人生の分岐点」となる重要な月です。この月に起きる出来事が、今後3年間の…
                  </p>
                </div>
                <div className="px-5 md:px-6 py-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Briefcase className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.15em] text-[#D4AF37] uppercase font-bold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>仕事運</p>
                    <p className="text-sm text-[#BEB5A5] leading-[2] tracking-wider">上半期最大のチャンスが訪れます。ただしそのチャンスは、一見「困難」の姿をして…</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-[#0C0A14] via-[#0C0A14]/90 to-transparent rounded-sm pointer-events-none"></div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-[#7A7068] tracking-widest flex items-center justify-center gap-1">
              <ChevronRight className="w-3 h-3" /> {(new Date().getMonth() + 2) > 12 ? (new Date().getMonth() + 2) - 12 : new Date().getMonth() + 2}月以降の詳細は完全版鑑定書に収録
            </p>
          </div>
        </motion.section>

        {/* ===== PAYWALL CTA ===== */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }} className="mt-16">
          {/* Urgency */}
          <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-sm p-5 mb-6 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-[#BEB5A5] tracking-wider leading-relaxed">
              <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" strokeWidth={1.5} />
              <span>この鑑定はあなたの<strong className="text-[#F5F0E8]">&quot;今&quot;の運気</strong>を反映しています。</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-xs text-[#7A7068] tracking-widest">
              本日の鑑定枠：残り <span className="text-[#F5D76E] font-bold text-sm">{remainingSlots}件</span>
            </p>
          </div>

          {/* 2-Tier Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Standard */}
            <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-sm p-6 md:p-8 text-center flex flex-col">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/20 flex items-center justify-center bg-[#D4AF37]/10 mx-auto mb-4">
                <Compass className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <h3 className="text-base md:text-lg text-[#F5F0E8] tracking-widest font-medium mb-1">スタンダード鑑定</h3>
              <p className="text-xs text-[#7A7068] tracking-wider mb-4">10,000文字のパーソナル鑑定書</p>
              <div className="space-y-2.5 text-left text-sm mb-6 flex-1">
                {["魂の設計図（光・影・才能）", "10年間の人生バイオリズム", "12ヶ月の行動指針（仕事/金/健康/対人）", "運命の転機（人生を変える1日）"].map((t, j) => (
                  <div key={j} className="flex items-start gap-2"><Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" strokeWidth={2} /><span className="text-[#BEB5A5] tracking-wider">{t}</span></div>
                ))}
                {["相性診断（1件分）", "ラッキーアクション365日分", "1年後フォローアップ鑑定権"].map((t, j) => (
                  <div key={j} className="flex items-start gap-2 opacity-30"><X className="w-4 h-4 text-[#7A7068] shrink-0 mt-0.5" strokeWidth={2} /><span className="text-[#7A7068] tracking-wider line-through">{t}</span></div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-2xl text-[#F5F0E8] mb-3 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>¥980 <span className="text-[10px] text-[#7A7068] font-normal">（税込）</span></p>
                <button onClick={() => handleCheckout('standard')} disabled={loading}
                  className="w-full py-3.5 rounded-sm bg-white/10 hover:bg-white/15 text-[#F5F0E8] font-medium tracking-widest text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 flex justify-center items-center">
                  {loading ? <div className="w-5 h-5 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div> : "鑑定書を受け取る"}
                </button>
              </div>
            </div>

            {/* Premium */}
            <div className="bg-white/[0.06] backdrop-blur-sm border-2 border-[#D4AF37]/30 rounded-sm p-6 md:p-8 text-center relative flex flex-col shadow-[0_0_40px_-10px_rgba(212,175,55,0.15)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-[#0C0A14] text-[10px] tracking-[0.15em] font-bold px-4 py-1 rounded-full uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>人気 No.1</div>
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#D4AF37]/15 mx-auto mb-4 mt-2">
                <Crown className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <h3 className="text-base md:text-lg text-[#F5F0E8] tracking-widest font-medium mb-1">プレミアム鑑定</h3>
              <p className="text-xs text-[#7A7068] tracking-wider mb-4">スタンダード全内容 + 特別鑑定</p>
              <div className="space-y-2.5 text-left text-sm mb-6 flex-1">
                {["魂の設計図（光・影・才能）", "10年間の人生バイオリズム", "12ヶ月の行動指針（仕事/金/健康/対人）", "運命の転機（人生を変える1日）"].map((t, j) => (
                  <div key={j} className="flex items-start gap-2"><Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" strokeWidth={2} /><span className="text-[#BEB5A5] tracking-wider">{t}</span></div>
                ))}
                {["相性診断（1件分）", "ラッキーアクション365日分", "1年後フォローアップ鑑定権"].map((t, j) => (
                  <div key={j} className="flex items-start gap-2 bg-[#D4AF37]/10 -mx-2 px-2 py-1 rounded"><Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" strokeWidth={2} /><span className="text-[#F5F0E8] tracking-wider font-medium">{t}</span></div>
                ))}
              </div>
              <div className="border-t border-[#D4AF37]/20 pt-4">
                <p className="text-2xl text-[#F5F0E8] mb-3 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>¥2,980 <span className="text-[10px] text-[#7A7068] font-normal">（税込）</span></p>
                <button onClick={() => handleCheckout('premium')} disabled={loading}
                  className="w-full py-3.5 rounded-sm font-bold tracking-widest text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed text-[#0C0A14] flex justify-center items-center"
                  style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)', boxShadow: '0 0 20px rgba(212,175,55,0.2)' }}>
                  {loading ? <div className="w-5 h-5 border-2 border-[#0C0A14] border-t-transparent rounded-full animate-spin"></div> : "✦ プレミアム鑑定を受け取る"}
                </button>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] text-[#7A7068] tracking-wider flex items-center justify-center gap-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            <ShieldCheck className="w-3 h-3 inline -mt-0.5" />Stripe社による安全なSSL暗号化決済
          </p>

          {/* Social Proof */}
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <p className="text-xs text-[#7A7068] tracking-widest flex items-center justify-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                過去24時間で <span className="text-[#F5F0E8] font-medium">{dailyCount}名</span> の方がこの鑑定書を受け取りました
              </p>
            </div>
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-sm p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[10px] text-[#D4AF37] font-medium shrink-0">Y.S</div>
              <div>
                <div className="flex gap-0.5 mb-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />)}</div>
                <p className="text-xs text-[#BEB5A5] leading-relaxed tracking-wider">
                  「影の性質の部分は、ずっと誰にも言えなかった本音をそのまま言い当てられたような感覚でした。」 — <span className="text-[#7A7068]">Y.Sさん / 34歳</span>
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      <footer className="bg-[#0C0A14] py-8 text-center border-t border-white/5">
        <p className="text-[10px] text-[#7A7068] tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>&copy; 2026 Kabbalah</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=Inter:wght@400;600;700&display=swap');` }} />
    </main>
  );
}

export default function ResultTeaserPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0C0A14]" />}>
      <ResultTeaserContent />
    </Suspense>
  );
}
