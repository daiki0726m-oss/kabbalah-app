"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useMemo } from "react";
import { Lock, Sparkles, Heart, Briefcase, Star, ShieldCheck, Compass, Feather, Sun, Moon, Gem, TrendingUp, Users, ChevronRight, Clock, Crown, Check } from "lucide-react";
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

  // Calculate Life Path Number
  const lifePathNumber = useMemo(() => calculateLifePathNumber(dob), [dob]);
  const profile = personalityData[lifePathNumber] || personalityData[7];

  // Generate biorhythm data
  const biorhythmData = useMemo(() => generateBiorhythm(dob), [dob]);

  // Social proof counter (deterministic but looks dynamic)
  useEffect(() => {
    const today = new Date();
    const seed = today.getDate() + today.getMonth() * 31;
    setDailyCount(47 + (seed % 38));
  }, []);

  // Scarcity counter (fewer slots later in the day)
  const [remainingSlots, setRemainingSlots] = useState(0);
  useEffect(() => {
    const hour = new Date().getHours();
    const base = 30 - Math.floor(hour * 1.2);
    setRemainingSlots(Math.max(3, base));
  }, []);

  const handleCheckout = async (plan: 'standard' | 'premium' = 'standard') => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, dob, plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "決済セッションの作成に失敗しました。");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("通信エラーが発生しました。");
      setLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 * i, duration: 0.6 },
    }),
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#4A4036] font-serif overflow-x-hidden selection:bg-[#E5D3B3] selection:text-[#4A4036]">
      
      {/* Top Navigation */}
      <nav className="w-full bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EAE3D9]">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="text-sm font-light tracking-widest text-[#4A4036] flex items-center gap-2">
            <Feather className="w-4 h-4 text-[#CFA770]" strokeWidth={1.5} />
            <span>Kabbalah 鑑定室</span>
          </div>
          <span className="text-[10px] tracking-[0.15em] text-[#8A7A6A] font-sans">鑑定結果</span>
        </div>
      </nav>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>

      <div className="max-w-3xl mx-auto px-5 pb-20">
        
        {/* ===== SECTION 1: Life Path Number Reveal ===== */}
        <motion.section 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-[10px] tracking-[0.2em] text-[#CFA770] uppercase font-sans font-bold mb-6">Your Destiny Number</p>
          
          <div className="relative inline-block mb-6">
            <div className="w-28 h-28 rounded-full border-2 border-[#D4AF37]/40 flex items-center justify-center bg-white shadow-[0_0_30px_rgba(207,167,112,0.15)] mx-auto">
              <motion.span 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                className="text-5xl font-bold text-[#D4AF37] font-sans"
              >
                {lifePathNumber}
              </motion.span>
            </div>
            {/* Decorative ring */}
            <div className="absolute inset-0 w-28 h-28 rounded-full border border-[#D4AF37]/10 scale-[1.2] mx-auto"></div>
          </div>

          <h1 className="text-2xl md:text-3xl font-medium text-[#2C241B] tracking-widest leading-relaxed mb-2">
            {name} 様の運命数
          </h1>
          <p className="text-lg text-[#CFA770] tracking-widest font-medium mb-2">
            ─ {profile.title} ─
          </p>
          <p className="text-xs text-[#8A7A6A] tracking-wider font-sans">
            生年月日 {dob.replace(/-/g, '.')} より算出
          </p>
        </motion.section>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-10">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#EAE3D9]"></div>
          <Sparkles className="w-4 h-4 text-[#CFA770]" strokeWidth={1.5} />
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#EAE3D9]"></div>
        </div>

        {/* ===== SECTION 2: Personality Cards ===== */}
        <section className="space-y-5">
          <div className="text-center mb-8">
            <h2 className="text-lg md:text-xl font-light text-[#2C241B] tracking-widest">
              運命数 {lifePathNumber} が示すあなたの本質
            </h2>
          </div>

          {/* Card: Light */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-white border border-[#EAE3D9] rounded-sm p-6 md:p-8 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37]"></div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FAF4EA] border border-[#EAE3D9] flex items-center justify-center shrink-0">
                <Sun className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.15em] text-[#CFA770] uppercase font-sans font-bold mb-1">光の性質</p>
                <h3 className="text-base md:text-lg font-medium text-[#2C241B] tracking-wider mb-3">{profile.light.label}</h3>
                <p className="text-sm text-[#4A4036] leading-[2] tracking-wider">{profile.light.description}</p>
              </div>
            </div>
          </motion.div>

          {/* Card: Shadow */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-white border border-[#EAE3D9] rounded-sm p-6 md:p-8 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8A7A6A] to-[#6A5A4A]"></div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F5F0EB] border border-[#EAE3D9] flex items-center justify-center shrink-0">
                <Moon className="w-5 h-5 text-[#6A5A4A]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.15em] text-[#8A7A6A] uppercase font-sans font-bold mb-1">影の性質</p>
                <h3 className="text-base md:text-lg font-medium text-[#2C241B] tracking-wider mb-3">{profile.shadow.label}</h3>
                <p className="text-sm text-[#4A4036] leading-[2] tracking-wider">{profile.shadow.description}</p>
              </div>
            </div>
          </motion.div>

          {/* Card: Hidden Talent */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-white border border-[#EAE3D9] rounded-sm p-6 md:p-8 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#CFA770] to-[#A51C1C]/60"></div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FAF4EA] border border-[#EAE3D9] flex items-center justify-center shrink-0">
                <Gem className="w-5 h-5 text-[#A51C1C]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.15em] text-[#A51C1C] uppercase font-sans font-bold mb-1">隠された才能</p>
                <h3 className="text-base md:text-lg font-medium text-[#2C241B] tracking-wider mb-3">{profile.talent.label}</h3>
                <p className="text-sm text-[#4A4036] leading-[2] tracking-wider">{profile.talent.description}</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===== SECTION 3: Biorhythm Teaser Chart ===== */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16"
        >
          <div className="text-center mb-6">
            <h2 className="text-lg md:text-xl font-light text-[#2C241B] tracking-widest mb-2">
              2026年の運勢バイオリズム
            </h2>
            <p className="text-xs text-[#8A7A6A] tracking-widest">あなたの運気の波を可視化</p>
          </div>

          <div className="bg-white border border-[#EAE3D9] rounded-sm p-4 md:p-6 shadow-sm relative overflow-hidden">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={biorhythmData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3" vertical={false} />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#a3a3a3', fontSize: 10, fontFamily: 'serif' }} dy={5} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#a3a3a3', fontSize: 10, fontFamily: 'serif' }} />
                  <ReferenceLine y={50} stroke="#EAE3D9" strokeDasharray="5 5" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #EAE3D9', fontSize: '12px', borderRadius: '4px' }} labelStyle={{ color: '#CFA770', fontWeight: 'bold' }} />
                  <Line type="monotone" dataKey="value" stroke="#CFA770" strokeWidth={2.5} dot={{ fill: '#fff', stroke: '#CFA770', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#CFA770', stroke: '#fff', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Blur overlay on right half (months 7-12) */}
            <div className="absolute top-0 right-0 w-[45%] h-full bg-gradient-to-l from-[#FDFBF7] via-[#FDFBF7]/95 to-transparent flex items-center justify-center pointer-events-none">
              <div className="text-center pr-4">
                <Lock className="w-5 h-5 text-[#CFA770] mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-[11px] text-[#8A7A6A] tracking-wider leading-relaxed">
                  後半6ヶ月の<br />運勢は完全版で
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ===== SECTION 4: Monthly Prediction Cliffhanger ===== */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-lg md:text-xl font-light text-[#2C241B] tracking-widest mb-2">
              あなたの2026年 ─ 月別運勢
            </h2>
            <p className="text-xs text-[#8A7A6A] tracking-widest">1月の詳細鑑定結果をお見せします</p>
          </div>

          <div className="space-y-4">
            {profile.monthlyTeaser.map((m) => (
              <div key={m.month} className="bg-white border border-[#EAE3D9] rounded-sm shadow-sm overflow-hidden">
                {/* Month Header */}
                <div className="bg-gradient-to-r from-[#FAF4EA] to-white px-5 md:px-6 py-4 border-b border-[#EAE3D9]">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold tracking-widest text-[#8A7A6A] font-sans uppercase">2026</span>
                    <span className="text-xl text-[#CFA770] font-bold">{m.month}月</span>
                    <span className="text-sm text-[#4A4036] tracking-wider ml-1">─ {m.title}</span>
                  </div>
                  <p className="text-sm text-[#4A4036] leading-[2] tracking-wider mt-3">{m.overall}</p>
                </div>

                {/* Subcategories */}
                <div className="divide-y divide-[#EAE3D9]">
                  <div className="px-5 md:px-6 py-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FAF4EA] border border-[#EAE3D9] flex items-center justify-center shrink-0 mt-0.5">
                      <Briefcase className="w-4 h-4 text-[#CFA770]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.15em] text-[#CFA770] uppercase font-sans font-bold mb-1">仕事運</p>
                      <p className="text-sm text-[#4A4036] leading-[2] tracking-wider">{m.work}</p>
                    </div>
                  </div>
                  <div className="px-5 md:px-6 py-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FAF4EA] border border-[#EAE3D9] flex items-center justify-center shrink-0 mt-0.5">
                      <TrendingUp className="w-4 h-4 text-[#CFA770]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.15em] text-[#CFA770] uppercase font-sans font-bold mb-1">金運</p>
                      <p className="text-sm text-[#4A4036] leading-[2] tracking-wider">{m.finance}</p>
                    </div>
                  </div>
                  <div className="px-5 md:px-6 py-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FAF4EA] border border-[#EAE3D9] flex items-center justify-center shrink-0 mt-0.5">
                      <Heart className="w-4 h-4 text-[#CFA770]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.15em] text-[#CFA770] uppercase font-sans font-bold mb-1">恋愛運</p>
                      <p className="text-sm text-[#4A4036] leading-[2] tracking-wider">{m.love}</p>
                    </div>
                  </div>
                  <div className="px-5 md:px-6 py-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FAF4EA] border border-[#EAE3D9] flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4 text-[#CFA770]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.15em] text-[#CFA770] uppercase font-sans font-bold mb-1">健康運</p>
                      <p className="text-sm text-[#4A4036] leading-[2] tracking-wider">{m.health}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Fade-out cliffhanger for month 2 */}
            <div className="relative">
              <div className="bg-white border border-[#EAE3D9] rounded-sm shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#FAF4EA] to-white px-5 md:px-6 py-4 border-b border-[#EAE3D9]">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold tracking-widest text-[#8A7A6A] font-sans uppercase">2026</span>
                    <span className="text-xl text-[#CFA770] font-bold">2月</span>
                    <span className="text-sm text-[#4A4036] tracking-wider ml-1">─ 転機の月</span>
                  </div>
                  <p className="text-sm text-[#4A4036] leading-[2] tracking-wider mt-3">
                    2月はあなたにとって「人生の分岐点」となる重要な月です。この月に起きる出来事が、今後3年間の…
                  </p>
                </div>
                <div className="px-5 md:px-6 py-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF4EA] border border-[#EAE3D9] flex items-center justify-center shrink-0 mt-0.5">
                    <Briefcase className="w-4 h-4 text-[#CFA770]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.15em] text-[#CFA770] uppercase font-sans font-bold mb-1">仕事運</p>
                    <p className="text-sm text-[#4A4036] leading-[2] tracking-wider">上半期最大のチャンスが訪れます。ただしそのチャンスは、一見「困難」の姿をして…</p>
                  </div>
                </div>
              </div>
              {/* Gradient fade */}
              <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/90 to-transparent rounded-sm pointer-events-none"></div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-[#8A7A6A] tracking-widest flex items-center justify-center gap-1">
              <ChevronRight className="w-3 h-3" /> 2月〜12月の詳細は完全版鑑定書に収録
            </p>
          </div>
        </motion.section>

        {/* ===== SECTION 5: URGENCY + 2-TIER PAYWALL CTA ===== */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-16"
        >
          {/* Urgency Message */}
          <div className="bg-[#FAF4EA] border border-[#EAE3D9] rounded-sm p-5 mb-6 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-[#4A4036] tracking-wider leading-relaxed">
              <Clock className="w-4 h-4 text-[#CFA770] shrink-0" strokeWidth={1.5} />
              <span>
                この鑑定はあなたの<strong className="text-[#2C241B]">&quot;今&quot;の運気</strong>を反映しています。運気は常に変動するため、最も正確な鑑定書は今この瞬間に生成されたものです。
              </span>
            </div>
          </div>

          {/* Scarcity Counter */}
          <div className="text-center mb-8">
            <p className="text-xs text-[#8A7A6A] tracking-widest">
              本日の鑑定枠：残り <span className="text-[#B45309] font-bold text-sm">{remainingSlots}件</span>
            </p>
          </div>

          {/* 2-Tier Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Standard Plan */}
            <div className="bg-white border border-[#EAE3D9] rounded-sm p-6 md:p-8 shadow-sm text-center flex flex-col">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#FAF8F5] mx-auto mb-4">
                <Compass className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
              </div>

              <h3 className="text-base md:text-lg text-[#2C241B] tracking-widest font-medium mb-1">
                スタンダード鑑定
              </h3>
              <p className="text-xs text-[#8A7A6A] tracking-wider mb-4">10,000文字のパーソナル鑑定書</p>

              <div className="space-y-2 text-left text-sm mb-6 flex-1">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#CFA770] shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-[#4A4036] tracking-wider">12ヶ月分の月別運勢</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#CFA770] shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-[#4A4036] tracking-wider">天職と財を成す才能</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#CFA770] shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-[#4A4036] tracking-wider">運命の相手と出会う時期</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#CFA770] shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-[#4A4036] tracking-wider">魂の課題とカルマ</span>
                </div>
              </div>

              <div className="border-t border-[#EAE3D9] pt-4">
                <p className="text-2xl text-[#2C241B] mb-3 font-medium font-sans">
                  ¥980 <span className="text-[10px] text-[#8A7A6A] font-normal">（税込）</span>
                </p>
                <button
                  onClick={() => handleCheckout('standard')}
                  disabled={loading}
                  className="w-full py-3.5 rounded-sm shadow-sm bg-[#CFA770] hover:bg-[#B69260] text-white font-medium tracking-widest text-sm transition-all disabled:bg-[#EAE3D9] disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "鑑定書を受け取る"
                  )}
                </button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-white border-2 border-[#D4AF37]/40 rounded-sm p-6 md:p-8 shadow-md text-center relative flex flex-col">
              {/* Popular badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-white text-[10px] tracking-[0.15em] font-bold px-4 py-1 rounded-full uppercase font-sans">
                人気 No.1
              </div>

              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#FAF8F5] mx-auto mb-4 mt-2">
                <Crown className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
              </div>

              <h3 className="text-base md:text-lg text-[#2C241B] tracking-widest font-medium mb-1">
                プレミアム鑑定
              </h3>
              <p className="text-xs text-[#8A7A6A] tracking-wider mb-4">スタンダード全内容 + 特別鑑定</p>

              <div className="space-y-2 text-left text-sm mb-6 flex-1">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-[#4A4036] tracking-wider font-medium">スタンダードの全内容</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-[#4A4036] tracking-wider"><strong>相性診断</strong>（1件分）</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-[#4A4036] tracking-wider">ラッキーアクション365日分</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-[#4A4036] tracking-wider">1年後フォローアップ鑑定権</span>
                </div>
              </div>

              <div className="border-t border-[#EAE3D9] pt-4">
                <p className="text-2xl text-[#2C241B] mb-3 font-medium font-sans">
                  ¥2,980 <span className="text-[10px] text-[#8A7A6A] font-normal">（税込）</span>
                </p>
                <button
                  onClick={() => handleCheckout('premium')}
                  disabled={loading}
                  className="w-full py-3.5 rounded-sm shadow-md bg-gradient-to-r from-[#D4AF37] to-[#CFA770] hover:from-[#C9A430] hover:to-[#B69260] text-white font-medium tracking-widest text-sm transition-all disabled:bg-[#EAE3D9] disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "プレミアム鑑定を受け取る"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Security badge */}
          <p className="mt-4 text-center text-[11px] text-[#8A7A6A] tracking-wider font-sans flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 inline -mt-0.5"/>
            Stripe社による安全なSSL暗号化決済
          </p>

          {/* Social Proof + Review Digest */}
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <p className="text-xs text-[#8A7A6A] tracking-widest flex items-center justify-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#CFA770]" />
                過去24時間で <span className="text-[#2C241B] font-medium">{dailyCount}名</span> の方がこの鑑定書を受け取りました
              </p>
            </div>

            {/* Review Digest */}
            <div className="bg-[#FCFAFA] border border-[#EAE3D9] rounded-sm p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FAF4EA] border border-[#EAE3D9] flex items-center justify-center text-[10px] text-[#CFA770] font-medium shrink-0">Y.S</div>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-xs text-[#4A4036] leading-relaxed tracking-wider">
                  「影の性質の部分は、ずっと誰にも言えなかった本音をそのまま言い当てられたような感覚でした。」 — <span className="text-[#8A7A6A]">Y.Sさん / 34歳</span>
                </p>
              </div>
            </div>
          </div>
        </motion.section>

      </div>

      {/* Footer */}
      <footer className="bg-[#FAF4EA] py-8 text-center border-t border-[#EAE3D9] mt-12">
        <div className="text-[10px] text-[#8A7A6A] tracking-[0.2em] font-sans uppercase">
          &copy; 2026 Kabbalah 鑑定室
        </div>
      </footer>
    </main>
  );
}

export default function ResultTeaserPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFBF7]" />}>
      <ResultTeaserContent />
    </Suspense>
  );
}
