"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, BookOpen, Heart, Compass, Sparkles, Feather, Users, Star, Clock, Shield, Lock } from "lucide-react";

export default function PremiumHumanMentorshipLP() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("1985");
  const [birthMonth, setBirthMonth] = useState("1");
  const [birthDay, setBirthDay] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Social proof counter
  const [dailyCount, setDailyCount] = useState(0);
  useEffect(() => {
    const today = new Date();
    const seed = today.getDate() + today.getMonth() * 31;
    setDailyCount(47 + (seed % 38));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);
    const dob = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;
    setTimeout(() => {
      router.push(`/result?name=${encodeURIComponent(name)}&dob=${encodeURIComponent(dob)}`);
    }, 800);
  };

  const years = Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - 18 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#4A4036] font-serif selection:bg-[#E5D3B3] selection:text-[#4A4036]">

      {/* --- TOP NAVIGATION --- */}
      <nav className="w-full fixed top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EAE3D9]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-sm font-light tracking-widest text-[#4A4036] flex items-center gap-2">
            <Feather className="w-4 h-4 text-[#CFA770]" strokeWidth={1.5} />
            <span>Kabbalah 鑑定室</span>
          </div>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* === HERO SECTION — "Pain → Solution" Structure (FIX #1) === */}
      {/* ============================================================ */}
      <section className="relative w-full pt-28 pb-20 px-6 overflow-hidden flex flex-col items-center text-center min-h-[90vh] justify-center">
        {/* Abstract Background Image */}
        <Image src="/images/hero_background_real.png" alt="Hero background" fill priority className="object-cover absolute inset-0 -z-20 opacity-90" />
        {/* Gradient Fades for text readability and smooth transition */}
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#FDFBF7] to-transparent -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#FDFBF7] to-transparent -z-10 pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Emotional hook — "pain" */}
          <p className="text-[#8A7A6A] text-sm md:text-base tracking-[0.15em] mb-6 font-light leading-loose">
            このまま今の仕事を続けて、本当にいいんだろうか。<br className="md:hidden" />
            私の人生、このままで終わるの…？
          </p>

          {/* Solution */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium text-[#2C241B] leading-[1.6] tracking-wider mb-6">
            その答えは、<br className="md:hidden" />あなたの<span className="relative inline-block px-2 mx-1 z-10 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-3 before:bg-[#EAE3D9] before:-z-10">生年月日</span>に<br />
            刻まれています。
          </h1>

          <p className="text-sm md:text-base text-[#6A5A4A] font-light leading-loose tracking-widest max-w-lg mx-auto mb-4">
            カバラ数秘術が、あなたの「本当の才能」「人生の転機」「2026年の行動指針」を数万文字のレポートで解き明かします。
          </p>

          {/* What you get for FREE  */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-[#CFA770] tracking-widest mb-8">
            <span>✓ 運命数の算出</span>
            <span>✓ 光と影の性質</span>
            <span>✓ 隠された才能</span>
            <span>✓ 10年バイオリズム</span>
          </div>

          {/* Hero Inline Form + Trust badges (FIX #3) */}
          <div className="w-full max-w-md mx-auto">
            {/* Trust badges above form */}
            <div className="flex items-center justify-center gap-4 mb-4 text-[10px] text-[#8A7A6A] tracking-widest">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#CFA770]" />30秒で完了</span>
              <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-[#CFA770]" />完全無料</span>
              <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-[#CFA770]" />登録不要</span>
            </div>

            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm border border-[#EAE3D9] rounded-sm p-5 shadow-lg space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="お名前（ニックネーム可）"
                className="w-full bg-white border border-[#EAE3D9] p-3 text-base text-[#2C241B] focus:outline-none focus:border-[#CFA770] focus:ring-1 focus:ring-[#CFA770] transition-colors rounded-sm text-center"
                required
              />
              <div className="grid grid-cols-3 gap-2">
                <div className="relative">
                  <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} className="w-full bg-white border border-[#EAE3D9] p-3 text-sm text-[#2C241B] appearance-none focus:outline-none focus:border-[#CFA770] transition-colors cursor-pointer rounded-sm">
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#8A7A6A] pointer-events-none">年</span>
                </div>
                <div className="relative">
                  <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} className="w-full bg-white border border-[#EAE3D9] p-3 text-sm text-[#2C241B] appearance-none focus:outline-none focus:border-[#CFA770] transition-colors cursor-pointer rounded-sm">
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#8A7A6A] pointer-events-none">月</span>
                </div>
                <div className="relative">
                  <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)} className="w-full bg-white border border-[#EAE3D9] p-3 text-sm text-[#2C241B] appearance-none focus:outline-none focus:border-[#CFA770] transition-colors cursor-pointer rounded-sm">
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#8A7A6A] pointer-events-none">日</span>
                </div>
              </div>
              <button type="submit" disabled={isSubmitting || !name} className="w-full flex items-center justify-center gap-2 py-4 bg-[#CFA770] text-white hover:bg-[#B69260] disabled:bg-[#EAE3D9] disabled:cursor-not-allowed transition-colors text-sm tracking-widest rounded-sm shadow-md">
                {isSubmitting ? <span className="animate-pulse">鑑定書を準備しています...</span> : <><Sparkles className="w-4 h-4" strokeWidth={1.5} />あなたの運命数を無料で診断する</>}
              </button>
            </form>
            <p className="text-center text-[10px] text-[#8A7A6A] mt-3 tracking-widest">※鑑定以外の目的での使用は一切ありません</p>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF BAR (Under Hero) (FIX #6 — reviews higher) --- */}
      <div className="w-full py-4 bg-white border-b border-[#EAE3D9]">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
          <div className="flex items-center gap-2 text-xs text-[#8A7A6A] tracking-widest">
            <Users className="w-4 h-4 text-[#CFA770]" />
            本日 <span className="text-[#2C241B] font-medium">{dailyCount}名</span> が鑑定を受けました
          </div>
          <div className="hidden sm:block w-[1px] h-4 bg-[#EAE3D9]"></div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />)}
            <span className="text-[10px] text-[#8A7A6A] tracking-wider ml-1">「人生が変わりました」Y.Sさん / 34歳</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* === WHAT'S IN THE REPORT — DARK BG (FIX #2 reorder + #4) === */}
      {/* ============================================================ */}
      <section className="w-full py-24 px-6 bg-[#2C241B] relative overflow-hidden">
        {/* Compass visual as soft background watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-10 pointer-events-none w-[800px] h-[800px] mix-blend-multiply hidden md:block">
          <Image src="/images/compass_graphic.png" alt="" fill className="object-contain" />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-center">

          {/* Visual Content */}
          <div className="lg:col-span-5 relative w-full aspect-[4/5] rounded-sm overflow-hidden shadow-sm hidden lg:block">
            <Image src="/images/report_contents.png" alt="Sealed personalized letter" fill className="object-cover hover:scale-105 transition-transform duration-1000" />
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7">
            <div className="text-center lg:text-left mb-16">
              <p className="text-xs text-[#CFA770] tracking-[0.2em] uppercase font-sans font-bold mb-3">What You Will Receive</p>
              <h2 className="text-2xl md:text-3xl font-light text-white tracking-widest mb-4">
                無料であなたに<br className="md:hidden" />お届けする鑑定内容
              </h2>
              <p className="text-sm text-[#A09080] tracking-widest">名前と生年月日だけで、ここまで分かります</p>
            </div>

            <div className="space-y-4 w-full">

              {/* Report Item 1 */}
              <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-sm border border-white/10 flex flex-col md:flex-row gap-5 items-start md:items-center">
                <div className="w-14 h-14 rounded-full bg-[#CFA770]/15 flex flex-shrink-0 items-center justify-center border border-[#CFA770]/30">
                  <Heart className="w-5 h-5 text-[#CFA770]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-medium text-white mb-2 tracking-wider">
                    第一章：あなたの運命数が示す「魂の設計図」
                  </h3>
                  <p className="text-sm text-[#A09080] leading-relaxed tracking-widest">
                    あなたが生まれ持った宿命と、光の性質（才能）・影の性質（無意識のブレーキ）・隠された才能を、カバラの全アルゴリズムで詳細に読み解きます。
                  </p>
                </div>
              </div>

              {/* Report Item 2 */}
              <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-sm border border-white/10 flex flex-col md:flex-row gap-5 items-start md:items-center">
                <div className="w-14 h-14 rounded-full bg-[#CFA770]/15 flex flex-shrink-0 items-center justify-center border border-[#CFA770]/30">
                  <Compass className="w-5 h-5 text-[#CFA770]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-medium text-white mb-2 tracking-wider">
                    第二章：10年間の人生バイオリズム
                  </h3>
                  <p className="text-sm text-[#A09080] leading-relaxed tracking-widest">
                    2026〜2035年の運勢の波をグラフで可視化。人生の「黄金期」がいつ訪れるのか、今が「準備」と「勝負」のどちらの時期なのかを具体的に提示します。
                  </p>
                </div>
              </div>

              {/* Report Item 3 */}
              <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-sm border border-white/10 flex flex-col md:flex-row gap-5 items-start md:items-center">
                <div className="w-14 h-14 rounded-full bg-[#CFA770]/15 flex flex-shrink-0 items-center justify-center border border-[#CFA770]/30">
                  <BookOpen className="w-5 h-5 text-[#CFA770]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-medium text-white mb-2 tracking-wider">
                    第三章：今年のあなた ─ 12ヶ月の行動指針
                  </h3>
                  <p className="text-sm text-[#A09080] leading-relaxed tracking-widest">
                    仕事運・金運・健康運・対人関係の4カテゴリで、毎月やるべきことを具体的に解説。月ごとのテーマとカバラの数字の巡りに基づくアクションプランをお届けします。
                  </p>
                </div>
              </div>

              {/* Report Item 4 */}
              <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-sm border border-white/10 flex flex-col md:flex-row gap-5 items-start md:items-center">
                <div className="w-14 h-14 rounded-full bg-[#CFA770]/15 flex flex-shrink-0 items-center justify-center border border-[#CFA770]/30">
                  <Sparkles className="w-5 h-5 text-[#CFA770]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-medium text-white mb-2 tracking-wider">
                    第四章：運命の転機 ─ あなたの人生を変える1日
                  </h3>
                  <p className="text-sm text-[#A09080] leading-relaxed tracking-widest">
                    カバラが示す「最も重要な日」をピンポイントで特定。その日を境にどう動くべきか、具体的なアクションプランとマインドセットをお伝えします。
                  </p>
                </div>
              </div>
            </div>

            {/* Mini CTA after report contents */}
            <div className="mt-8 text-center lg:text-left">
              <a href="#form" className="inline-flex items-center gap-2 text-sm text-[#CFA770] hover:text-[#D4AF37] tracking-widest transition-colors border border-[#CFA770]/40 hover:border-[#D4AF37]/60 px-6 py-3 rounded-sm">
                <Sparkles className="w-4 h-4" strokeWidth={1.5} />
                無料で鑑定を始める
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* === TESTIMONIALS — Moved up for early social proof (#6) === */}
      {/* ============================================================ */}
      <section className="w-full py-20 px-6 bg-[#FFF9F0] border-b border-[#EAE3D9]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-[#2C241B] tracking-widest mb-4">
              鑑定を受けた方の声
            </h2>
            <p className="text-sm text-[#8A7A6A] tracking-widest">
              実際に完全版鑑定書をお読みになった方のご感想です
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-white p-6 md:p-8 border border-[#EAE3D9] rounded-sm shadow-sm">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
              <p className="text-sm text-[#4A4036] leading-[2] tracking-wider mb-5">
                自分のことがここまで正確に描かれていて、読みながら涙が止まりませんでした。特に&quot;影の性質&quot;の部分は、ずっと誰にも言えなかった本音をそのまま言い当てられたような感覚でした。
              </p>
              <div className="flex items-center gap-3 border-t border-[#EAE3D9] pt-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF4EA] border border-[#EAE3D9] flex items-center justify-center text-sm text-[#CFA770] font-medium">Y.S</div>
                <div>
                  <p className="text-sm text-[#2C241B] tracking-wider">Y.S さん</p>
                  <p className="text-[10px] text-[#8A7A6A] tracking-widest">34歳 / 会社員</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-6 md:p-8 border border-[#EAE3D9] rounded-sm shadow-sm">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
              <p className="text-sm text-[#4A4036] leading-[2] tracking-wider mb-5">
                転職すべきかずっと悩んでいましたが、鑑定書の&quot;天職の章&quot;に書かれていた内容がまさに今の自分の状況そのもの。背中を押してもらえました。今は新しい職場で充実しています。
              </p>
              <div className="flex items-center gap-3 border-t border-[#EAE3D9] pt-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF4EA] border border-[#EAE3D9] flex items-center justify-center text-sm text-[#CFA770] font-medium">M.K</div>
                <div>
                  <p className="text-sm text-[#2C241B] tracking-wider">M.K さん</p>
                  <p className="text-[10px] text-[#8A7A6A] tracking-widest">31歳 / フリーランス</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-6 md:p-8 border border-[#EAE3D9] rounded-sm shadow-sm">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
              <p className="text-sm text-[#4A4036] leading-[2] tracking-wider mb-5">
                友人に勧められて半信半疑で購入しましたが、読み終わった瞬間に友人にも勧めていました。10,000文字ぎっしりの鑑定書は、市販の占い本とは比べ物にならない深さです。
              </p>
              <div className="flex items-center gap-3 border-t border-[#EAE3D9] pt-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF4EA] border border-[#EAE3D9] flex items-center justify-center text-sm text-[#CFA770] font-medium">A.T</div>
                <div>
                  <p className="text-sm text-[#2C241B] tracking-wider">A.T さん</p>
                  <p className="text-[10px] text-[#8A7A6A] tracking-widest">37歳 / 主婦</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* === MENTOR'S LETTER — Shortened (FIX #5)                 === */}
      {/* ============================================================ */}
      <section className="w-full py-20 px-6 bg-white border-b border-[#EAE3D9] relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Subtle decoration */}
          <div className="mb-8 text-[#CFA770] opacity-50 mx-auto w-fit">
            <Feather className="w-8 h-8" strokeWidth={1} />
          </div>

          <h2 className="text-2xl md:text-3xl font-light text-[#2C241B] tracking-widest mb-10 leading-relaxed">
            ずっと一人で、<br />答えを探してきませんでしたか。
          </h2>

          <div className="text-sm md:text-base text-[#4A4036] leading-[2.2] tracking-widest text-justify max-w-2xl mx-auto space-y-6">
            <p>
              仕事でも人間関係でも、周りの期待に応えようと懸命に頑張ってきた。けれど、ふとした瞬間に「これでよかったのだろうか」と、言い知れぬ虚無感に襲われることはありませんか。
            </p>
            <p>
              それは、あなたの『魂の設計図』と、今いる環境にズレが生じているサインです。この鑑定書は、カバラの叡智を通して、わたしがあなたへ宛てた「深く、真摯な言葉」の束です。
            </p>
          </div>

          <div className="mt-8">
            <p className="font-serif text-[#CFA770] text-base italic">専属鑑定士より</p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* === AUTHORITY — "Why Kabbalah?" with History & Famous People  */}
      {/* ============================================================ */}
      <section className="w-full py-24 px-6 bg-[#FDFBF7] border-b border-[#EAE3D9] relative overflow-hidden">
        {/* Sacred Geometry Background */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <Image src="/images/kabbalah_geometry_bg.png" alt="" fill className="object-cover" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">

          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-xs text-[#CFA770] tracking-[0.2em] uppercase font-sans font-bold mb-3">Why Kabbalah Numerology?</p>
            <h2 className="text-2xl md:text-3xl font-light text-[#2C241B] tracking-widest mb-5 leading-relaxed">
              4,000年の叡智が証明する、<br className="md:hidden" />
              「数」が人生を変える力
            </h2>
            <p className="text-sm text-[#8A7A6A] tracking-widest leading-loose max-w-2xl mx-auto">
              星占い、タロット、手相 ─ 占いは数あれど、<br className="md:hidden" />
              カバラ数秘術だけが持つ<span className="text-[#CFA770] font-medium">「3つの決定的な違い」</span>があります。
            </p>
          </div>

          {/* --- Kabbalah History --- */}
          <div className="bg-white border border-[#EAE3D9] rounded-sm p-8 md:p-10 mb-12 shadow-sm">
            <h3 className="text-base md:text-lg font-medium text-[#2C241B] tracking-widest mb-6 text-center">
              📜 カバラ数秘術とは？
            </h3>
            <div className="text-sm text-[#4A4036] leading-[2.2] tracking-wider space-y-5">
              <p>
                カバラ（Kabbalah）とは、古代ヘブライ語で<span className="text-[#CFA770] font-medium">「受け取られたもの」</span>を意味します。
              </p>
              <p>
                紀元前2000年頃、古代ユダヤの神秘思想家たちが<br className="md:hidden" />
                「生命の樹（セフィロトの樹）」という宇宙の設計図を体系化。<br />
                そこから導かれた<span className="text-[#CFA770] font-medium">数字の法則</span>こそが、カバラ数秘術の根幹です。
              </p>
              <p>
                星の配置や偶然のカードに頼る他の占いとは異なり、<br className="md:hidden" />
                カバラは<span className="font-medium text-[#2C241B]">あなたの生年月日から導かれる「運命数」</span>を<br className="md:hidden" />
                数学的アルゴリズムで算出します。<br />
                <span className="text-[#8A7A6A] text-xs">─ つまり、占う人によって結果が変わることがありません。</span>
              </p>
            </div>
          </div>

          {/* --- 3 Key Differentiators --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Differentiator 1 */}
            <div className="bg-white border border-[#EAE3D9] rounded-sm p-6 text-center shadow-sm">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#FAF4EA] border border-[#CFA770]/30 flex items-center justify-center">
                <span className="text-lg">🔢</span>
              </div>
              <h4 className="text-sm font-medium text-[#2C241B] tracking-widest mb-3">数学的な正確さ</h4>
              <p className="text-xs text-[#8A7A6A] leading-[2] tracking-wider">
                感覚や直感に頼らず、<br />
                生年月日を数学的に解析。<br />
                <span className="text-[#CFA770] font-medium">誰が計算しても同じ結果</span>が<br />
                導き出されます。
              </p>
            </div>
            {/* Differentiator 2 */}
            <div className="bg-white border border-[#EAE3D9] rounded-sm p-6 text-center shadow-sm">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#FAF4EA] border border-[#CFA770]/30 flex items-center justify-center">
                <span className="text-lg">🌳</span>
              </div>
              <h4 className="text-sm font-medium text-[#2C241B] tracking-widest mb-3">人生全体の設計図</h4>
              <p className="text-xs text-[#8A7A6A] leading-[2] tracking-wider">
                「今日の運勢」ではなく、<br />
                才能・天職・人間関係・<br />
                10年先の転機まで<br />
                <span className="text-[#CFA770] font-medium">人生を俯瞰</span>できます。
              </p>
            </div>
            {/* Differentiator 3 */}
            <div className="bg-white border border-[#EAE3D9] rounded-sm p-6 text-center shadow-sm">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#FAF4EA] border border-[#CFA770]/30 flex items-center justify-center">
                <span className="text-lg">🗓️</span>
              </div>
              <h4 className="text-sm font-medium text-[#2C241B] tracking-widest mb-3">具体的な行動指針</h4>
              <p className="text-xs text-[#8A7A6A] leading-[2] tracking-wider">
                「気をつけましょう」で終わらず、<br />
                <span className="text-[#CFA770] font-medium">月ごとのアクションプラン</span>を<br />
                仕事・金運・健康・人間関係の<br />
                4軸で具体的に提示します。
              </p>
            </div>
          </div>

          {/* --- Famous Practitioners --- */}
          <div className="text-center mb-10">
            <h3 className="text-lg md:text-xl font-light text-[#2C241B] tracking-widest mb-3">
              歴史上の偉人たちも信じた<br className="md:hidden" />「数の力」
            </h3>
            <p className="text-xs text-[#8A7A6A] tracking-widest">
              カバラと数秘術に導かれた人物たち
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {/* Pythagoras */}
            <div className="bg-white border border-[#EAE3D9] rounded-sm p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2C241B] flex-shrink-0 flex items-center justify-center text-white text-lg font-serif">Π</div>
                <div>
                  <p className="text-sm font-medium text-[#2C241B] tracking-wider mb-1">ピタゴラス</p>
                  <p className="text-[10px] text-[#8A7A6A] tracking-widest mb-3">古代ギリシャの数学者 / 紀元前570年</p>
                </div>
              </div>
              <blockquote className="mt-3 pl-4 border-l-2 border-[#CFA770]/40">
                <p className="text-sm text-[#4A4036] leading-[2] tracking-wider italic">
                  「万物は数なり」
                </p>
              </blockquote>
              <p className="text-xs text-[#8A7A6A] leading-[1.9] tracking-wider mt-3">
                数秘術の父。宇宙のすべてを数で説明できると提唱し、<br className="md:hidden" />
                カバラの数的体系に哲学的基盤を与えた人物です。
              </p>
            </div>

            {/* Tesla */}
            <div className="bg-white border border-[#EAE3D9] rounded-sm p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2C241B] flex-shrink-0 flex items-center justify-center text-white text-lg font-serif">T</div>
                <div>
                  <p className="text-sm font-medium text-[#2C241B] tracking-wider mb-1">ニコラ・テスラ</p>
                  <p className="text-[10px] text-[#8A7A6A] tracking-widest mb-3">発明家・物理学者 / 1856-1943</p>
                </div>
              </div>
              <blockquote className="mt-3 pl-4 border-l-2 border-[#CFA770]/40">
                <p className="text-sm text-[#4A4036] leading-[2] tracking-wider italic">
                  「3, 6, 9の偉大さを知れば、<br className="md:hidden" />
                  宇宙の鍵を手にするだろう」
                </p>
              </blockquote>
              <p className="text-xs text-[#8A7A6A] leading-[1.9] tracking-wider mt-3">
                交流電流の発明者。数字に異常な執着を持ち、<br className="md:hidden" />
                ホテルの部屋番号も3で割れる数しか選ばなかったと言われています。
              </p>
            </div>

            {/* Madonna */}
            <div className="bg-white border border-[#EAE3D9] rounded-sm p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2C241B] flex-shrink-0 flex items-center justify-center text-white text-lg font-serif">M</div>
                <div>
                  <p className="text-sm font-medium text-[#2C241B] tracking-wider mb-1">マドンナ</p>
                  <p className="text-[10px] text-[#8A7A6A] tracking-widest mb-3">歌手・プロデューサー / 1958-</p>
                </div>
              </div>
              <blockquote className="mt-3 pl-4 border-l-2 border-[#CFA770]/40">
                <p className="text-sm text-[#4A4036] leading-[2] tracking-wider italic">
                  「カバラは私の人生の<br className="md:hidden" />
                  あらゆる判断の指針になっている」
                </p>
              </blockquote>
              <p className="text-xs text-[#8A7A6A] leading-[1.9] tracking-wider mt-3">
                世界的ポップアイコン。1990年代後半からカバラを<br className="md:hidden" />
                熱心に学び、人生の重要な決断にカバラの教えを活用しています。
              </p>
            </div>

            {/* Da Vinci */}
            <div className="bg-white border border-[#EAE3D9] rounded-sm p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2C241B] flex-shrink-0 flex items-center justify-center text-white text-lg font-serif">L</div>
                <div>
                  <p className="text-sm font-medium text-[#2C241B] tracking-wider mb-1">レオナルド・ダ・ヴィンチ</p>
                  <p className="text-[10px] text-[#8A7A6A] tracking-widest mb-3">芸術家・科学者 / 1452-1519</p>
                </div>
              </div>
              <blockquote className="mt-3 pl-4 border-l-2 border-[#CFA770]/40">
                <p className="text-sm text-[#4A4036] leading-[2] tracking-wider italic">
                  「数の比率の中に、<br className="md:hidden" />
                  宇宙の美しさが隠されている」
                </p>
              </blockquote>
              <p className="text-xs text-[#8A7A6A] leading-[1.9] tracking-wider mt-3">
                万能の天才。黄金比（1:1.618）に執着し、<br className="md:hidden" />
                数の神秘が美と真理を貫くと信じて作品を創り続けました。
              </p>
            </div>
          </div>

          {/* Closing Message */}
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm text-[#4A4036] leading-[2.2] tracking-wider">
              4,000年の歴史と、数々の天才が信じた「数の法則」。<br />
              その叡智をもとに、あなた専用の鑑定書を無料でお届けします。
            </p>
            <div className="mt-6">
              <a href="#form" className="inline-flex items-center gap-2 text-sm text-[#CFA770] hover:text-[#D4AF37] tracking-widest transition-colors border border-[#CFA770]/40 hover:border-[#D4AF37]/60 px-6 py-3 rounded-sm">
                <Sparkles className="w-4 h-4" strokeWidth={1.5} />
                無料で鑑定を始める
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- SAMPLE REPORT PREVIEW (Blurred Teaser) --- */}
      <section className="w-full py-24 px-6 bg-[#FAF4EA] border-b border-[#EAE3D9]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-[#2C241B] tracking-widest mb-4">
              鑑定書サンプル
            </h2>
            <p className="text-sm text-[#8A7A6A] tracking-widest">実際の鑑定書の一部をお見せします</p>
          </div>

          <div className="bg-white border border-[#EAE3D9] rounded-sm p-8 md:p-12 shadow-sm relative overflow-hidden" style={{ minHeight: '520px' }}>
            {/* Visible sample */}
            <div className="mb-2">
              <p className="text-[10px] tracking-[0.15em] text-[#CFA770] uppercase font-sans font-bold mb-3">第一章：あなたの運命数が示す「魂の設計図」</p>
              <p className="text-sm text-[#4A4036] leading-[2.2] tracking-wider">
                あなたが生まれ持った運命数は、「自由」と「冒険」を司る数字です。幼い頃から「なぜ？」「もっと知りたい」という好奇心が人一倍強く、同年代の子どもたちが遊んでいる間も、一人で本を読んだり、知らない場所を探検したりすることに夢中だったのではないでしょうか。
              </p>
            </div>

            {/* Blurred sample - enhanced volume */}
            <div className="mt-4 space-y-4 select-none" style={{ filter: 'blur(4px)' }}>
              <p className="text-sm text-[#4A4036] leading-[2.2] tracking-wider">
                その本質は大人になった今も変わりません。安定した環境よりも変化に富んだ環境を好み、一箇所に留まることに焦りを感じます。それは弱さではありません。あなたの魂が「もっと広い世界」を求めているサインなのです。
              </p>
              <p className="text-sm text-[#4A4036] leading-[2.2] tracking-wider">
                あなたの光の性質は、周囲の人々に肋動を与える力を持っています。何気ない一言が誰かの人生を変えた経験が、きっとあるはずです。それは偶然ではなく、この運命数が持つ「対人影響力」の現れなのです。
              </p>
              <p className="text-[10px] tracking-[0.15em] text-[#CFA770] uppercase font-sans font-bold">第二章：10年間の人生バイオリズム</p>
              <p className="text-sm text-[#4A4036] leading-[2.2] tracking-wider">
                2026年から2035年までの10年間、あなたの人生は大きな波を描きます。まず2027年にかけて、パーソナルイヤーが示す「収穋のサイクル」に入ります。この時期に蓄えた種が…
              </p>
              <p className="text-[10px] tracking-[0.15em] text-[#CFA770] uppercase font-sans font-bold">第三章：今年のあなた ─ 12ヶ月の行動指針</p>
              <p className="text-sm text-[#4A4036] leading-[2.2] tracking-wider">
                1月のテーマ：「静かな再構築」。仕事運――新しいプロジェクトの構想を練る最適な時期です。金運――計画的な支出を心がけ、…
              </p>
            </div>

            {/* Fade overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/95 to-transparent flex items-end justify-center pb-8">
              <a href="#form" className="inline-flex items-center gap-2 text-sm text-white bg-[#CFA770] hover:bg-[#B69260] tracking-widest transition-colors px-6 py-3 rounded-sm shadow-md">
                <Sparkles className="w-4 h-4" strokeWidth={1.5} />
                無料で鑑定を始める
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- FORM SECTION (Warm Initiation) --- */}
      <section id="form" className="w-full py-24 px-6 bg-white border-t border-[#EAE3D9]">
        <div className="max-w-2xl mx-auto">

          {/* Real-time counter */}
          <div className="flex items-center justify-center gap-2 mb-8 text-xs text-[#8A7A6A] tracking-widest">
            <Users className="w-4 h-4 text-[#CFA770]" />
            本日 <span className="text-[#2C241B] font-medium">{dailyCount}名</span> が鑑定を受けました
          </div>

          <div className="text-center mb-12">
            <Sparkles className="w-8 h-8 text-[#CFA770] mx-auto mb-4" strokeWidth={1} />
            <h2 className="text-2xl md:text-3xl font-light text-[#2C241B] tracking-widest mb-4">
              まずは、鑑定の一部を<br className="md:hidden" />無料でお届けします
            </h2>
            <p className="text-sm text-[#8A7A6A] tracking-widest leading-relaxed">
              あなたの本当の姿を知るために、<br />
              お名前と生年月日を教えてください。
            </p>
          </div>

          {/* Trust badges above form (FIX #3) */}
          <div className="flex items-center justify-center gap-5 mb-6 text-xs text-[#8A7A6A] tracking-widest">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#CFA770]" />30秒で完了</span>
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#CFA770]" />完全無料</span>
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-[#CFA770]" />登録不要</span>
          </div>

          <div className="bg-[#FCFAFA] p-8 md:p-14 border border-[#EAE3D9] rounded-sm shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]">
            <form onSubmit={handleSubmit} className="space-y-10">

              {/* Name Input */}
              <div className="space-y-3">
                <label className="block text-sm tracking-widest font-medium text-[#4A4036]">
                  お名前（ニックネーム可） <span className="text-[#CFA770] text-xs">必須</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例：はなこ"
                  className="w-full bg-white border border-[#EAE3D9] p-4 text-lg text-[#2C241B] focus:outline-none focus:border-[#CFA770] focus:ring-1 focus:ring-[#CFA770] transition-colors rounded-sm"
                  required
                />
              </div>

              {/* Birth Date Input */}
              <div className="space-y-3">
                <label className="block text-sm tracking-widest font-medium text-[#4A4036]">
                  生年月日 <span className="text-[#CFA770] text-xs">必須</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative">
                    <select
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      className="w-full bg-white border border-[#EAE3D9] p-4 text-base md:text-lg text-[#2C241B] appearance-none focus:outline-none focus:border-[#CFA770] focus:ring-1 focus:ring-[#CFA770] transition-colors cursor-pointer rounded-sm"
                    >
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#8A7A6A] pointer-events-none">年</span>
                  </div>
                  <div className="relative">
                    <select
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className="w-full bg-white border border-[#EAE3D9] p-4 text-base md:text-lg text-[#2C241B] appearance-none focus:outline-none focus:border-[#CFA770] focus:ring-1 focus:ring-[#CFA770] transition-colors cursor-pointer rounded-sm"
                    >
                      {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#8A7A6A] pointer-events-none">月</span>
                  </div>
                  <div className="relative">
                    <select
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      className="w-full bg-white border border-[#EAE3D9] p-4 text-base md:text-lg text-[#2C241B] appearance-none focus:outline-none focus:border-[#CFA770] focus:ring-1 focus:ring-[#CFA770] transition-colors cursor-pointer rounded-sm"
                    >
                      {days.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#8A7A6A] pointer-events-none">日</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || !name}
                  className="w-full flex items-center justify-center gap-2 py-5 bg-[#CFA770] text-white hover:bg-[#B69260] disabled:bg-[#EAE3D9] disabled:cursor-not-allowed transition-colors text-base tracking-widest rounded-sm shadow-md"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">鑑定書を準備しています...</span>
                  ) : (
                    <><Sparkles className="w-4 h-4" strokeWidth={1.5} />あなたの運命数を無料で診断する</>
                  )}
                </button>
                <p className="text-center text-xs text-[#8A7A6A] mt-4 tracking-widest leading-relaxed">
                  ※お預かりした情報は、鑑定以外の目的では一切使用いたしません。<br />
                  ※鑑定の重要な核心部分は、ご納得いただいた方のみ有料でお読みいただけます。
                </p>
              </div>

            </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#FAF4EA] py-10 pb-24 md:pb-10 text-center border-t border-[#EAE3D9]">
        <div className="text-[10px] text-[#8A7A6A] tracking-[0.2em] font-sans uppercase">
          &copy; 2026 Kabbalah 鑑定室
        </div>
      </footer>

      {/* --- STICKY CTA BAR (Mobile Only) --- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-[#EAE3D9] p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <button
          onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#CFA770] text-white hover:bg-[#B69260] transition-colors text-sm tracking-widest rounded-sm shadow-md"
        >
          <Sparkles className="w-4 h-4" strokeWidth={1.5} />
          無料で鑑定する
        </button>
      </div>
    </main>
  );
}
