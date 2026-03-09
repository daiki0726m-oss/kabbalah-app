"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useMemo } from "react";
import { Lock, Sparkles, Heart, Briefcase, Star, ShieldCheck, Compass, Feather, Sun, Moon, Gem, TrendingUp, Users, ChevronRight } from "lucide-react";
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

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, dob }),
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

        {/* ===== SECTION 5: PAYWALL CTA ===== */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-16"
        >
          <div className="bg-white border border-[#EAE3D9] rounded-sm p-6 sm:p-10 md:p-12 shadow-sm text-center">
            
            <div className="w-14 h-14 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#FAF8F5] mx-auto mb-6">
              <Compass className="w-7 h-7 text-[#D4AF37]" strokeWidth={1.5} />
            </div>

            <h3 className="text-lg md:text-xl text-[#2C241B] tracking-widest font-medium mb-3">
              完全版鑑定書（10,000文字）
            </h3>
            <p className="text-sm text-[#6A5A4A] leading-relaxed mb-8 tracking-wide font-light max-w-md mx-auto">
              運命数 {lifePathNumber} のあなただけに綴る、<br className="sm:hidden" />カバラの全アルゴリズムが導く深い洞察。
            </p>

            {/* What's included */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left w-full mx-auto">
              <div className="flex items-start gap-3 bg-[#FAF8F5] p-4 rounded-sm border border-[#EAE3D9]">
                <TrendingUp className="w-5 h-5 text-[#CFA770] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <span className="text-[#2C241B] text-sm tracking-widest block mb-1 font-medium">10年＋12ヶ月の運勢グラフ</span>
                  <span className="text-xs text-[#8A7A6A] leading-snug block">人生の大きな波と、毎月の行動指針</span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#FAF8F5] p-4 rounded-sm border border-[#EAE3D9]">
                <Briefcase className="w-5 h-5 text-[#CFA770] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <span className="text-[#2C241B] text-sm tracking-widest block mb-1 font-medium">天職と財を成す才能</span>
                  <span className="text-xs text-[#8A7A6A] leading-snug block">本当に稼げる環境と隠された才能の活かし方</span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#FAF8F5] p-4 rounded-sm border border-[#EAE3D9]">
                <Heart className="w-5 h-5 text-[#CFA770] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <span className="text-[#2C241B] text-sm tracking-widest block mb-1 font-medium">運命の相手と出会う時期</span>
                  <span className="text-xs text-[#8A7A6A] leading-snug block">ソウルメイトの特徴と最強のタイミング</span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#FAF8F5] p-4 rounded-sm border border-[#EAE3D9]">
                <Star className="w-5 h-5 text-[#CFA770] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <span className="text-[#2C241B] text-sm tracking-widest block mb-1 font-medium">魂の課題とカルマ</span>
                  <span className="text-xs text-[#8A7A6A] leading-snug block">同じ失敗パターンの根本原因と解決策</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#EAE3D9] pt-6">
              <p className="text-2xl md:text-3xl text-[#2C241B] mb-5 font-medium font-sans tracking-wide flex items-center justify-center gap-2">
                ¥980 <span className="text-xs text-[#8A7A6A] font-normal mt-1">（税込・一括買取）</span>
              </p>
              
              <button 
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-4 rounded-sm shadow-md bg-[#CFA770] hover:bg-[#B69260] text-white font-medium tracking-widest text-base transition-all disabled:bg-[#EAE3D9] disabled:cursor-not-allowed flex justify-center items-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "完全版鑑定書を受け取る"
                )}
              </button>
              <p className="mt-4 text-[11px] text-[#8A7A6A] tracking-wider font-sans flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 inline -mt-0.5"/>
                Stripe社による安全なSSL暗号化決済
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[#8A7A6A] tracking-widest flex items-center justify-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#CFA770]" />
              本日 <span className="text-[#2C241B] font-medium">{dailyCount}名</span> の方がこの鑑定書を受け取りました
            </p>
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
