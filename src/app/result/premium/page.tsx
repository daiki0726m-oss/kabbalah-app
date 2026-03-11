'use client';

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Briefcase, Heart, ShieldCheck, Users, Sparkles, Star, CalendarDays, Coins, CheckCircle2, Crown, ArrowRight, ChevronDown, Gift, Bookmark, Calendar } from "lucide-react";

function PremiumLiveContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<string>('standard');
  const [customerName, setCustomerName] = useState<string>('ゲスト');
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);

  // Lucky Actions
  const [openMonth, setOpenMonth] = useState<number | null>(null);

  // Compatibility
  const [compatName, setCompatName] = useState('');
  const [compatYear, setCompatYear] = useState('1990');
  const [compatMonth, setCompatMonth] = useState('1');
  const [compatDay, setCompatDay] = useState('1');
  const [compatLoading, setCompatLoading] = useState(false);
  const [compatDone, setCompatDone] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [compatResult, setCompatResult] = useState<any>(null);

  const extractedName = sessionId?.startsWith('cs_test_dummy') && sessionId.split('_').length > 3 ? decodeURIComponent(sessionId.split('_')[3]) : 'ゲスト';

  const loadingMessages = [
    "魂のデータを受信しています...",
    "運命数から鑑定書を生成中...",
    "あなた専用のレポートを執筆中...",
    "最終チェックを行っています..."
  ];

  useEffect(() => {
    setMounted(true);
    if (!sessionId) { setError('セッションIDが見つかりません。'); setLoading(false); return; }

    // Cycle through loading messages
    const interval = setInterval(() => { setLoadingPhase(p => (p + 1) % loadingMessages.length); }, 4000);

    const fetchReport = async () => {
      try {
        const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId }) });
        if (!res.ok) throw new Error('鑑定書の生成に失敗しました。');
        const data = await res.json();
        setReport(data.report);
        if (data.plan) setPlan(data.plan);
        if (data.name) setCustomerName(data.name);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) { setError(err.message); } finally { setLoading(false); clearInterval(interval); }
    };

    fetchReport();
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#0C0A14] flex flex-col items-center justify-center p-6">
        {/* Rotating circles */}
        <div className="relative w-24 h-24 mb-8">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }} className="absolute inset-0 border border-[#D4AF37]/30 rounded-full" />
          <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 12, ease: 'linear' }} className="absolute inset-2 border border-[#D4AF37]/20 rounded-full" />
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 6, ease: 'linear' }} className="absolute inset-4 border border-[#D4AF37]/40 rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-[#D4AF37] animate-pulse" strokeWidth={1.5} />
          </div>
        </div>
        <div className="text-center space-y-4">
          <motion.p key={loadingPhase} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-sm text-[#D4AF37] tracking-[0.15em]" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            {loadingMessages[loadingPhase]}
          </motion.p>
          <p className="text-xs text-[#7A7068] tracking-[0.15em] leading-relaxed">
            鑑定歴20年の叡智を結集し、<br />
            あなた専用の鑑定書を執筆中です。<br />
            <span className="text-[10px]">※通常20〜40秒ほどかかります。画面を閉じずにお待ちください。</span>
          </p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-[#0C0A14] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl text-[#E8656C] mb-4" style={{ fontFamily: '"Noto Serif JP", serif' }}>エラーが発生しました</h2>
        <p className="text-sm text-[#7A7068]">{error || "データが見つかりませんでした。"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0A14] flex justify-center pb-12 pt-0 sm:pt-4 selection:bg-[#D4AF37]/30 selection:text-white">
      <div className="w-full max-w-lg bg-[#0C0A14] text-[#BEB5A5] min-h-screen pb-24 relative overflow-hidden">

        {/* Top Gold Ribbon */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>

        {/* 1. Cover Sheet */}
        <section className="relative px-6 pt-16 pb-12 border-b border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
            <Compass className="w-32 h-32 text-[#D4AF37]" />
          </div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#D4AF37]/10">
                <Compass className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
            </div>
            <p className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Kabbalah Premium</p>
            <h1 className="text-2xl font-light tracking-widest text-[#F5F0E8] mb-2 leading-relaxed" style={{ fontFamily: '"Noto Serif JP", serif' }}>
              {customerName} 様の<br />魂の設計図と未来への道標
            </h1>
          </motion.div>
          <div className="mt-8 pt-6 border-t border-dashed border-white/10">
            <div className="text-[14px] leading-[2] text-[#BEB5A5] tracking-wider html-content" dangerouslySetInnerHTML={{ __html: report.coverIntro?.replace(/\n/g, '<br/>') || '' }} />
          </div>
        </section>

        {/* 2. 10-Year Biorhythm */}
        <section className="py-12 border-b border-white/5">
          <div className="px-6 mb-6 text-center">
            <h3 className="text-sm font-medium tracking-[0.2em] text-[#D4AF37] mb-3 flex items-center justify-center gap-2">
              <Compass className="w-4 h-4" /> {new Date().getFullYear()}年以降の10年の運勢バイオリズム
            </h3>
            <p className="text-xs text-[#7A7068] tracking-wider">点線の位置が標準的なニュートラルラインとなります。</p>
          </div>
          <div className="h-[220px] w-full px-2 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={report.biorhythm10Years || []} margin={{ top: 10, right: 15, left: -25, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#7A7068', fontSize: 10 }} dy={10} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#7A7068', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#151221', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', borderRadius: '4px', color: '#BEB5A5' }} labelStyle={{ color: '#D4AF37', fontWeight: 'bold' }} />
                <Line type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={2} dot={{ fill: '#0C0A14', stroke: '#D4AF37', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#D4AF37', stroke: '#0C0A14', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="px-6 relative">
            <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-[#D4AF37]/50 to-transparent rounded-r ml-6"></div>
            <div className="pl-4">
              <div className="text-[14px] leading-[2] text-[#BEB5A5] tracking-wider html-content" dangerouslySetInnerHTML={{ __html: report.biorhythm10YearsText?.replace(/\n/g, '<br/>') || '' }} />
            </div>
          </div>
        </section>

        {/* 3. 12-Month Biorhythm */}
        <section className="bg-[#151221] py-12 border-b border-white/5">
          <div className="px-6 mb-6 text-center">
            <h3 className="text-sm font-medium tracking-[0.2em] text-[#D4AF37] mb-3 flex items-center justify-center gap-2">
              <Star className="w-4 h-4" /> 今後12ヶ月の運勢バイオリズム
            </h3>
          </div>
          <div className="h-[200px] w-full px-2 mb-8 mx-4 w-[calc(100%-2rem)] bg-white/[0.03] py-4 rounded-sm border border-white/[0.06]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={report.biorhythm12Months || []} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#7A7068', fontSize: 10 }} dy={5} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#7A7068', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#151221', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', borderRadius: '4px', color: '#BEB5A5' }} labelStyle={{ color: '#D4AF37', fontWeight: 'bold' }} />
                <Line type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={2} dot={{ fill: '#151221', stroke: '#D4AF37', strokeWidth: 1.5, r: 3 }} activeDot={{ r: 5, fill: '#D4AF37', stroke: '#151221', strokeWidth: 1 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="px-6 relative">
            <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-[#D4AF37]/50 to-transparent rounded-r ml-6"></div>
            <div className="pl-4">
              <div className="text-[14px] leading-[2] text-[#BEB5A5] tracking-wider html-content" dangerouslySetInnerHTML={{ __html: report.biorhythm12MonthsText?.replace(/\n/g, '<br/>') || '' }} />
            </div>
          </div>
        </section>

        {/* 4. Monthly Action Plans */}
        <section className="px-4 py-12">
          <div className="text-center mb-10 px-2 border-b border-[#D4AF37]/30 pb-4 mx-auto w-full max-w-[80%]">
            <h3 className="text-base font-medium tracking-[0.2em] text-[#F5F0E8] flex items-center justify-center gap-2" style={{ fontFamily: '"Noto Serif JP", serif' }}>
              <CalendarDays className="w-5 h-5 text-[#D4AF37]" /> 今後12ヶ月 毎月の詳細鑑定
            </h3>
          </div>

          <div className="space-y-12">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {report.monthlyPlans?.map((plan: any, idx: number) => (
              <div key={idx} className="bg-white/[0.03] border border-white/[0.06] rounded-sm overflow-hidden relative pt-8 pb-6">
                {/* Month Header */}
                <div className="text-center px-6 mb-8 border-b border-dashed border-[#D4AF37]/20 pb-6">
                  <span className="text-[10px] font-bold tracking-widest text-[#7A7068] uppercase block mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>2026</span>
                  <h4 className="text-4xl text-[#D4AF37] tracking-wider mb-3 font-bold">
                    {plan.month}<span className="text-lg ml-1 text-[#7A7068] font-medium">月</span>
                  </h4>
                  <div className="text-[15px] text-[#F5F0E8] leading-relaxed font-medium">「{plan.title}」</div>
                </div>

                <div className="space-y-6 px-5">
                  {/* Overall */}
                  <div className="relative">
                    <div className="absolute -top-3 left-3 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-[#0C0A14] text-[11px] font-bold tracking-widest py-1 px-4 rounded-full flex items-center gap-1.5 z-10">
                      <Sparkles className="w-3 h-3" />全体運
                    </div>
                    <div className="pt-6 pb-4 px-5 border border-white/[0.08] rounded-sm bg-white/[0.02] relative">
                      <div className="text-[13.5px] text-[#BEB5A5] leading-[2] tracking-wider html-content" dangerouslySetInnerHTML={{ __html: plan.overall?.replace(/\n/g, '<br/>') || '' }} />
                    </div>
                  </div>

                  {/* Sub-categories */}
                  {[
                    { icon: <Briefcase className="w-3 h-3 text-[#D4AF37]" />, label: "仕事運", content: plan.work },
                    { icon: <Coins className="w-3 h-3 text-[#D4AF37]" />, label: "金運", content: plan.finance },
                  ].map((sub, j) => (
                    <div key={j} className="relative">
                      <div className="absolute -top-3 left-3 bg-[#151221] text-[#7A7068] border border-white/10 font-bold text-[10px] tracking-widest py-1 px-3 rounded-full flex items-center gap-1.5 z-10">
                        {sub.icon}{sub.label}
                      </div>
                      <div className="pt-5 pb-4 px-4 border border-dashed border-white/[0.08] rounded-sm bg-white/[0.02] relative">
                        <div className="text-[13px] text-[#BEB5A5] leading-[2] tracking-wider html-content" dangerouslySetInnerHTML={{ __html: sub.content?.replace(/\n/g, '<br/>') || '' }} />
                      </div>
                    </div>
                  ))}

                  {[
                    { icon: <Heart className="w-3 h-3 text-[#D4AF37]" />, label: "対人・恋愛", content: plan.relationships },
                    { icon: <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />, label: "健康・からだ", content: plan.health },
                  ].map((sub, j) => (
                    <div key={j} className="relative">
                      <div className="absolute -top-3 left-3 bg-[#151221] text-[#7A7068] border border-white/10 font-bold text-[10px] tracking-widest py-1 px-3 rounded-full flex items-center gap-1.5 z-10">
                        {sub.icon}{sub.label}
                      </div>
                      <div className="pt-5 pb-4 px-4 border border-dashed border-white/[0.08] rounded-sm bg-white/[0.02] relative">
                        <div className="text-[13px] text-[#BEB5A5] leading-[2] tracking-wider html-content" dangerouslySetInnerHTML={{ __html: sub.content?.replace(/\n/g, '<br/>') || '' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Fateful Day */}
        {report.fatefulDay && (
          <section className="px-6 py-12 bg-[#1B1530] border-y border-[#D4AF37]/20">
            <div className="text-center mb-6">
              <h3 className="text-sm font-medium tracking-[0.2em] text-[#D4AF37] mb-2">人生の起点となる運命の日</h3>
              <div className="text-3xl font-bold tracking-widest text-[#F5F0E8] border-b border-[#D4AF37]/30 pb-4 inline-block" style={{ fontFamily: '"Noto Serif JP", serif' }}>
                {report.fatefulDay.date}
              </div>
            </div>
            <div className="space-y-6 text-[14px] leading-[2] text-[#BEB5A5] tracking-wider html-content">
              <div>
                <h4 className="text-[#D4AF37] font-bold mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4" />なぜこの日が起点となるのか</h4>
                <div dangerouslySetInnerHTML={{ __html: report.fatefulDay.reason?.replace(/\n/g, '<br/>') || '' }} />
              </div>
              <div className="bg-white/[0.04] border border-[#D4AF37]/20 p-4 rounded-sm mt-4">
                <h4 className="text-[#D4AF37] font-bold mb-2">この日を境にどう動くべきか</h4>
                <div dangerouslySetInnerHTML={{ __html: report.fatefulDay.action?.replace(/\n/g, '<br/>') || '' }} />
              </div>
            </div>
          </section>
        )}

        {/* 5.5 Lucky Actions 365 */}
        {report.luckyActions && report.luckyActions.length > 0 && (
          <section className="px-4 py-12 border-b border-white/5">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#D4AF37]/10 mx-auto mb-4">
                <Gift className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-medium tracking-[0.2em] text-[#F5F0E8] mb-2" style={{ fontFamily: '"Noto Serif JP", serif' }}>ラッキーアクション 365日</h3>
              <p className="text-xs text-[#7A7068] tracking-wider">毎日の開運アクションがあなたの運気を確実に上昇させます</p>
            </div>

            <div className="space-y-2">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {report.luckyActions.map((month: any, idx: number) => (
                <div key={idx} className="bg-white/[0.03] border border-white/[0.06] rounded-sm overflow-hidden">
                  <button
                    onClick={() => setOpenMonth(openMonth === idx ? null : idx)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                      <span className="text-sm text-[#F5F0E8] tracking-wider font-medium">{month.monthLabel}</span>
                      <span className="text-[10px] text-[#7A7068] tracking-wider">({month.actions?.length || 0}日分)</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[#7A7068] transition-transform ${openMonth === idx ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openMonth === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 border-t border-white/[0.04]">
                          <div className="grid grid-cols-1 gap-0">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {month.actions?.map((item: any, j: number) => (
                              <div key={j} className="flex items-start gap-3 py-2.5 border-b border-white/[0.03] last:border-b-0">
                                <span className="text-[10px] font-bold text-[#D4AF37] w-8 shrink-0 pt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{item.day}日</span>
                                <span className="text-[13px] text-[#BEB5A5] tracking-wider leading-relaxed">{item.action}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5.6 Compatibility Diagnosis */}
        {plan === 'premium' && (
          <section className="px-6 py-12 bg-[#151221] border-b border-white/5">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#D4AF37]/10 mx-auto mb-4">
                <Users className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-medium tracking-[0.2em] text-[#F5F0E8] mb-2" style={{ fontFamily: '"Noto Serif JP", serif' }}>カバラ相性診断</h3>
              <p className="text-xs text-[#7A7068] tracking-wider">気になる方の名前と生年月日を入力してください（1回限り）</p>
            </div>

            {!compatDone ? (
              <div className="max-w-sm mx-auto space-y-4">
                <div>
                  <label className="text-[10px] tracking-[0.15em] text-[#7A7068] uppercase block mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>お相手の名前</label>
                  <input
                    type="text" value={compatName} onChange={(e) => setCompatName(e.target.value)}
                    placeholder="お相手の名前"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-sm px-4 py-3 text-sm text-[#F5F0E8] placeholder:text-[#7A7068]/60 focus:border-[#D4AF37]/50 focus:outline-none transition-colors tracking-wider"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] tracking-[0.15em] text-[#7A7068] uppercase block mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>年</label>
                    <select value={compatYear} onChange={e => setCompatYear(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-sm px-3 py-3 text-sm text-[#F5F0E8] focus:border-[#D4AF37]/50 focus:outline-none">
                      {Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - 18 - i).map(y => <option key={y} value={y} className="bg-[#151221]">{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.15em] text-[#7A7068] uppercase block mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>月</label>
                    <select value={compatMonth} onChange={e => setCompatMonth(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-sm px-3 py-3 text-sm text-[#F5F0E8] focus:border-[#D4AF37]/50 focus:outline-none">
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(m => <option key={m} value={m} className="bg-[#151221]">{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.15em] text-[#7A7068] uppercase block mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>日</label>
                    <select value={compatDay} onChange={e => setCompatDay(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-sm px-3 py-3 text-sm text-[#F5F0E8] focus:border-[#D4AF37]/50 focus:outline-none">
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d} className="bg-[#151221]">{d}</option>)}
                    </select>
                  </div>
                </div>
                <button
                  onClick={async () => {
                    if (!compatName.trim()) return;
                    setCompatLoading(true);
                    try {
                      const dob2 = `${compatYear}-${compatMonth.padStart(2, '0')}-${compatDay.padStart(2, '0')}`;
                      const res = await fetch('/api/compatibility', {
                        method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name1: customerName || extractedName, dob1: '1990-01-01', name2: compatName, dob2 })
                      });
                      const data = await res.json();
                      setCompatResult(data.compatibility);
                      setCompatDone(true);
                    } catch { /* ignore */ } finally { setCompatLoading(false); }
                  }}
                  disabled={compatLoading || !compatName.trim()}
                  className="w-full py-3.5 rounded-sm font-bold tracking-widest text-sm transition-all disabled:opacity-30 text-[#0C0A14] flex justify-center items-center"
                  style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)', boxShadow: '0 0 20px rgba(212,175,55,0.15)' }}
                >
                  {compatLoading ? (
                    <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-[#0C0A14] border-t-transparent rounded-full animate-spin" /><span>相性を鑑定中...</span></div>
                  ) : '✦ 相性を鑑定する'}
                </button>
              </div>
            ) : compatResult ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Score */}
                <div className="text-center">
                  <p className="text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Compatibility Score</p>
                  <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37]/40 flex items-center justify-center bg-[#D4AF37]/10 mx-auto mb-3">
                    <span className="text-4xl font-bold text-[#D4AF37]" style={{ fontFamily: 'Inter, sans-serif' }}>{compatResult.compatibilityScore}</span>
                  </div>
                  <p className="text-xs text-[#7A7068] tracking-wider">{compatResult.person1?.name} × {compatResult.person2?.name}</p>
                </div>

                {/* Person traits */}
                <div className="grid grid-cols-2 gap-3">
                  {[compatResult.person1, compatResult.person2].map((p: { name: string; destinyNumber: number; trait: string }, i: number) => p && (
                    <div key={i} className="bg-white/[0.04] border border-white/[0.08] rounded-sm p-4 text-center">
                      <p className="text-lg font-bold text-[#D4AF37] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{p.destinyNumber}</p>
                      <p className="text-xs text-[#F5F0E8] font-medium tracking-wider mb-2">{p.name}</p>
                      <p className="text-[11px] text-[#BEB5A5] leading-relaxed">{p.trait}</p>
                    </div>
                  ))}
                </div>

                {/* Analysis sections */}
                {[
                  { label: '総合分析', content: compatResult.overallAnalysis },
                  { label: '2人の強み', content: compatResult.strengths },
                  { label: '注意すべき課題', content: compatResult.challenges },
                  { label: 'アドバイス', content: compatResult.advice },
                ].map((sec, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-sm p-5">
                    <p className="text-[10px] tracking-[0.15em] text-[#D4AF37] uppercase font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{sec.label}</p>
                    <p className="text-[13px] text-[#BEB5A5] leading-[2] tracking-wider" dangerouslySetInnerHTML={{ __html: (sec.content || '').replace(/\n/g, '<br/>') }} />
                  </div>
                ))}
              </motion.div>
            ) : null}
          </section>
        )}

        {/* 5.7 Follow-up Right */}
        {(
          <section className="px-6 py-12 border-b border-white/5">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#D4AF37]/10 mx-auto mb-4">
                <Bookmark className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-medium tracking-[0.2em] text-[#F5F0E8] mb-2" style={{ fontFamily: '"Noto Serif JP", serif' }}>1年後フォローアップ鑑定権</h3>
              <p className="text-xs text-[#7A7068] tracking-wider">プレミアム特典として、1年後に無料で再鑑定できます</p>
            </div>

            <div className="bg-white/[0.04] border border-[#D4AF37]/20 rounded-sm p-6 max-w-sm mx-auto">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#F5F0E8] font-medium tracking-wider">再鑑定可能期限</p>
                    <p className="text-xs text-[#D4AF37] tracking-wider">{new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}まで</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#F5F0E8] font-medium tracking-wider">1年間の成長を数秘術で可視化</p>
                    <p className="text-xs text-[#7A7068] tracking-wider">運命数の影響がどう変化したかを鑑定</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <p className="text-[11px] text-[#BEB5A5] tracking-wider leading-relaxed mb-3">このページをブックマークして保存してください。<br />1年後に同じURLからアクセスできます。</p>
                <button
                  onClick={() => { if (typeof window !== 'undefined') { alert('ブラウザのブックマーク機能でこのページを保存してください。\n\nURL: ' + window.location.href); } }}
                  className="w-full py-3 rounded-sm text-sm tracking-widest text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Bookmark className="w-4 h-4" /> このページをブックマーク
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 6. Conclusion */}
        <section className="px-8 py-14 text-center border-b border-white/5">
          <div className="mb-6 flex justify-center">
            <div className="w-12 h-12 flex items-center justify-center bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/30">
              <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" />
            </div>
          </div>
          <h3 className="text-base font-medium tracking-[0.2em] text-[#F5F0E8] mb-6" style={{ fontFamily: '"Noto Serif JP", serif' }}>鑑定師からのメッセージ</h3>
          <div className="text-[14px] leading-[2.0] text-[#BEB5A5] mb-8 tracking-wider html-content" dangerouslySetInnerHTML={{ __html: report.finalMessage?.replace(/\n/g, '<br/>') || '' }} />
          <div className="mt-8"><span className="block w-4 h-4 border-b border-r border-[#D4AF37]/30 rotate-45 mx-auto"></span></div>
        </section>

        {/* 7. Upsell Banner (Standard buyers) */}
        {plan === 'standard' && (
          <section className="px-6 py-14 bg-[#151221] border-t border-white/5">
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)]" style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)' }}>
                <Crown className="w-6 h-6 text-[#0C0A14]" />
              </div>
              <h3 className="text-lg font-light tracking-widest text-[#F5F0E8] mb-2" style={{ fontFamily: '"Noto Serif JP", serif' }}>プレミアム鑑定のご案内</h3>
              <p className="text-xs text-[#7A7068] tracking-wider leading-relaxed">{customerName}様の鑑定書をさらに深めませんか？</p>
            </div>

            <div className="bg-white/[0.04] rounded-sm border border-[#D4AF37]/20 p-6 space-y-4 mb-6">
              {[
                { title: "相性診断（1件分）", desc: "気になる人との相性をカバラで鑑定" },
                { title: "ラッキーアクション365日分", desc: "毎日の具体的な開運アドバイス" },
                { title: "1年後フォローアップ鑑定権", desc: "1年後に再鑑定して成長を確認" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#F5F0E8] tracking-wider">{item.title}</p>
                    <p className="text-[11px] text-[#7A7068] tracking-wider">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="mb-3">
                <span className="text-xs text-[#7A7068] line-through tracking-wider">通常 ¥2,980</span>
                <span className="text-2xl font-bold text-[#D4AF37] ml-2 tracking-wider">¥2,000</span>
                <span className="text-xs text-[#7A7068] tracking-wider ml-1">（差額のみ）</span>
              </div>
              <button
                onClick={async () => {
                  setIsUpgrading(true);
                  try {
                    const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: customerName, dob: '1990-01-01', plan: 'premium' }) });
                    const data = await res.json();
                    if (data.url) window.location.href = data.url;
                  } catch { setIsUpgrading(false); }
                }}
                disabled={isUpgrading}
                className="w-full flex items-center justify-center gap-2 py-4 text-[#0C0A14] disabled:opacity-50 transition-all text-sm tracking-widest rounded-sm font-bold"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)', boxShadow: '0 0 20px rgba(212,175,55,0.2)' }}>
                {isUpgrading ? <span className="animate-pulse">アップグレード準備中...</span> : <>✦ プレミアムにアップグレード <ArrowRight className="w-4 h-4" /></>}
              </button>
              <p className="text-[10px] text-[#7A7068] mt-3 tracking-wider">※スタンダード鑑定の全内容に加えて3つの特典が追加されます</p>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-8 text-center border-t border-white/5">
          <p className="text-[10px] text-[#7A7068] tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>&copy; 2026 Kabbalah</p>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=Inter:wght@400;600;700&display=swap');
        .html-content b {
          font-weight: bold;
          color: #D4AF37;
          background: linear-gradient(to top, rgba(212, 175, 55, 0.15) 0%, transparent 100%);
          padding: 0 2px;
          margin: 0 1px;
        }
      `}} />
    </div>
  );
}

export default function PremiumLivePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0C0A14]" />}>
      <PremiumLiveContent />
    </Suspense>
  );
}
