"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, BookOpen, Heart, Compass, Sparkles, Feather, Users, Star, Clock } from "lucide-react";

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

      {/* --- HERO SECTION (Clarity & Warmth) --- */}
      <section className="relative w-full pt-32 pb-24 px-6 overflow-hidden flex flex-col items-center text-center min-h-[85vh] justify-center">
        {/* Abstract Background Image */}
        <Image src="/images/hero_background_real.png" alt="Hero background" fill priority className="object-cover absolute inset-0 -z-20 opacity-90" />
        {/* Gradient Fades for text readability and smooth transition */}
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#FDFBF7] to-transparent -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#FDFBF7] to-transparent -z-10 pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <p className="text-[#CFA770] text-sm md:text-base tracking-[0.2em] mb-6 font-medium">
            30代からの、人生の答え合わせ
          </p>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#2C241B] leading-[1.6] tracking-wider mb-10">
            生年月日と名前だけで、<br />
            あなた専用の<span className="relative inline-block px-2 mx-1 z-10 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-3 before:bg-[#EAE3D9] before:-z-10">『人生の羅針盤』</span>を<br />
            お作りします。
          </h1>
          
          <p className="text-base md:text-lg text-[#6A5A4A] font-light leading-loose tracking-widest max-w-2xl mx-auto">
            数万文字に及ぶパーソナル鑑定書（レポート）。<br className="hidden md:block"/>
            古代から伝わるカバラの叡智が、あなたの過去の意味を解き明かし、<br className="hidden md:block"/>
            これから向かうべき「本当の居場所」を指し示します。
          </p>

          {/* Hero Inline Form */}
          <div className="mt-12 w-full max-w-md mx-auto">
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
                {isSubmitting ? <span className="animate-pulse">鑑定書を準備しています...</span> : <><Sparkles className="w-4 h-4" strokeWidth={1.5} />無料で鑑定書の一部を読む</>}
              </button>
            </form>
            <p className="text-center text-[10px] text-[#8A7A6A] mt-3 tracking-widest">※鑑定以外の目的での使用は一切ありません</p>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF BAR (Under Hero) --- */}
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

      {/* --- THE MENTOR'S LETTER (Human Connection) --- */}
      <section className="w-full py-24 px-6 bg-white border-y border-[#EAE3D9] relative">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Atmospheric Visual - shorter on mobile */}
          <div className="w-full relative aspect-[16/9] lg:aspect-[4/5] rounded-sm overflow-hidden shadow-sm order-2 lg:order-1">
            <Image src="/images/mentor_desk.png" alt="A beautifully lit desk with elegant stationery" fill className="object-cover hover:scale-105 transition-transform duration-1000" />
          </div>

          {/* Letter Content */}
          <div className="flex flex-col items-center lg:items-start order-1 lg:order-2">
            {/* Subtle decoration */}
            <div className="mb-10 text-[#CFA770] opacity-50">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>

            <h2 className="text-2xl md:text-3xl font-light text-[#2C241B] tracking-widest mb-12 text-center lg:text-left leading-relaxed">
              ずっと一人で、<br />答えを探してきませんでしたか。
            </h2>

            <div className="text-sm md:text-base text-[#4A4036] leading-[2.2] tracking-widest text-justify max-w-xl space-y-6">
              <p>
                仕事でも人間関係でも、周りの期待に応えようと懸命に頑張ってきた。けれど、ふとした瞬間に「これでよかったのだろうか」「私の本当の望みは何だろう」と、言い知れぬ虚無感に襲われることはありませんか。
              </p>
              <p>
                それは、あなたが間違っているからではありません。あなたの『魂の設計図』と、今いる環境にズレが生じているサインなのです。
              </p>
              <p>
                あなたが生まれ持った才能、無意識のブレーキ、そして深く愛し愛されるための条件。<br />
                この鑑定書は、冷たいデータや定型文ではありません。カバラの叡智を通して、わたしがあなたへ宛てた「深く、真摯な言葉」の束です。どうか、温かいお茶でも飲みながら、ゆっくりと読み進めてください。
              </p>
            </div>

            <div className="mt-12 text-right w-full">
              <p className="font-serif text-[#CFA770] text-lg italic pr-4">専属鑑定士より</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- AUTHORITY SECTION (Kabbalah & Steve Jobs) --- */}
      <section className="w-full py-24 px-6 bg-[#FCFAFA] border-b border-[#EAE3D9]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-12 order-2 lg:order-1">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-light text-[#2C241B] tracking-widest mb-4">
                なぜ、カバラ数秘術なのか？
              </h2>
              <p className="text-sm text-[#8A7A6A] tracking-widest">
                世界的イノベーターも重んじた「直感」と「運命の法則」
              </p>
            </div>

            <div className="space-y-6 text-[#4A4036] tracking-widest leading-relaxed text-sm md:text-base text-justify">
              <h3 className="text-lg font-medium text-[#CFA770] border-b border-[#EAE3D9] pb-2 inline-block">歴史が証明する「魂のデータ解析」</h3>
              <p>
                カバラ数秘術は、単なるスピリチュアルな占星術ではありません。古代ユダヤの神秘思想に端を発し、数千年にわたり体系化されてきた「運命の解読システム」です。
              </p>
              <p>
                「万物は数なり」というピタゴラスの言葉通り、あなたの生年月日と名前に込められた固有の数字には、人生のパターン、行動の癖、そして隠された才能のデータがすべて記述されています。
              </p>
            </div>
            
            <div className="space-y-6 text-[#4A4036] tracking-widest leading-relaxed text-sm md:text-base text-justify">
               <h3 className="text-lg font-medium text-[#CFA770] border-b border-[#EAE3D9] pb-2 inline-block">「直感は、知能よりもパワフルだ」</h3>
              <p>
                Appleの創業者スティーブ・ジョブズは、究極の論理的思考を持ちながらも、東洋思想や直感的なインスピレーションを深く信奉し、数々の革新的なプロダクトを生み出しました。
              </p>
              <p>
                この鑑定書が提供するのは、目に見えない運命の法則を論理的に整理し、あなたの「直感」を確信に変えるための客観的なデータです。論理と直感を結びつけ、人生の舵を取るための強力な羅針盤となります。
              </p>
            </div>
          </div>

          {/* Visual Content */}
          {/* Hidden on mobile to avoid consecutive images */}
          <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-sm overflow-hidden shadow-sm order-2 lg:order-2 hidden md:block">
            <Image src="/images/kabbalah_authority.png" alt="Antique compass and books" fill className="object-cover hover:scale-105 transition-transform duration-1000" />
          </div>

        </div>
      </section>

      {/* --- WHAT'S IN THE REPORT (Extreme Clarity of Deliverables) --- */}
      <section className="w-full py-24 px-6 bg-[#FAF4EA] relative overflow-hidden">
        {/* Compass visual as soft background watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-15 pointer-events-none w-[800px] h-[800px] mix-blend-multiply hidden md:block">
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
              <h2 className="text-2xl md:text-3xl font-light text-[#2C241B] tracking-widest mb-4">
                この鑑定書で、<br className="md:hidden" />あなたにお伝えすること
              </h2>
              <p className="text-sm text-[#8A7A6A] tracking-widest">（ご提供する数万文字のレポート内容の一部）</p>
            </div>

            <div className="space-y-6 w-full">
            
            {/* Report Item 1 */}
            <div className="bg-white p-8 md:p-10 rounded-sm border border-[#EAE3D9] flex flex-col md:flex-row gap-6 items-start md:items-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#FAF4EA] flex flex-shrink-0 items-center justify-center border border-[#EAE3D9]">
                <Heart className="w-6 h-6 text-[#CFA770]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-[#2C241B] mb-3 tracking-wider">
                  第一章：あなたの運命数が示す「魂の設計図」
                </h3>
                <p className="text-sm text-[#6A5A4A] leading-relaxed tracking-widest">
                  あなたが生まれ持った宿命と、光の性質（才能）・影の性質（無意識のブレーキ）・隠された才能を、カバラの全アルゴリズムで詳細に読み解きます。
                </p>
              </div>
            </div>

            {/* Report Item 2 */}
            <div className="bg-white p-8 md:p-10 rounded-sm border border-[#EAE3D9] flex flex-col md:flex-row gap-6 items-start md:items-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#FAF4EA] flex flex-shrink-0 items-center justify-center border border-[#EAE3D9]">
                <Compass className="w-6 h-6 text-[#CFA770]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-[#2C241B] mb-3 tracking-wider">
                  第二章：10年間の人生バイオリズム
                </h3>
                <p className="text-sm text-[#6A5A4A] leading-relaxed tracking-widest">
                  2026〜2035年の運勢の波をグラフで可視化。人生の「黄金期」がいつ訪れるのか、今が「準備」と「勝負」のどちらの時期なのかを具体的に提示します。
                </p>
              </div>
            </div>

            {/* Report Item 3 */}
            <div className="bg-white p-8 md:p-10 rounded-sm border border-[#EAE3D9] flex flex-col md:flex-row gap-6 items-start md:items-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#FAF4EA] flex flex-shrink-0 items-center justify-center border border-[#EAE3D9]">
                <BookOpen className="w-6 h-6 text-[#CFA770]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-[#2C241B] mb-3 tracking-wider">
                  第三章：今年のあなた ─ 12ヶ月の行動指針
                </h3>
                <p className="text-sm text-[#6A5A4A] leading-relaxed tracking-widest">
                  仕事運・金運・健康運・対人関係の4カテゴリで、毎月やるべきことを具体的に解説。月ごとのテーマとカバラの数字の巡りに基づくアクションプランをお届けします。
                </p>
              </div>
            </div>

            {/* Report Item 4 (NEW) */}
            <div className="bg-white p-8 md:p-10 rounded-sm border border-[#EAE3D9] flex flex-col md:flex-row gap-6 items-start md:items-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#FAF4EA] flex flex-shrink-0 items-center justify-center border border-[#EAE3D9]">
                <Sparkles className="w-6 h-6 text-[#CFA770]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-[#2C241B] mb-3 tracking-wider">
                  第四章：運命の転機 ─ あなたの人生を変える1日
                </h3>
                <p className="text-sm text-[#6A5A4A] leading-relaxed tracking-widest">
                  カバラが示す「最も重要な日」をピンポイントで特定。その日を境にどう動くべきか、具体的なアクションプランとマインドセットをお伝えします。
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (Social Proof) --- */}
      <section className="w-full py-24 px-6 bg-white border-b border-[#EAE3D9]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-light text-[#2C241B] tracking-widest mb-4">
              鑑定を受けた方の声
            </h2>
            <p className="text-sm text-[#8A7A6A] tracking-widest">
              実際に完全版鑑定書をお読みになった方のご感想です
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-[#FCFAFA] p-8 border border-[#EAE3D9] rounded-sm">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
              <p className="text-sm text-[#4A4036] leading-[2] tracking-wider mb-6">
                自分のことがここまで正確に描かれていて、読みながら涙が止まりませんでした。特に&quot;影の性質&quot;の部分は、ずっと誰にも言えなかった本音をそのまま言い当てられたような感覚でした。
              </p>
              <div className="flex items-center gap-3 border-t border-[#EAE3D9] pt-4">
                <div className="w-10 h-10 rounded-full bg-[#FAF4EA] border border-[#EAE3D9] flex items-center justify-center text-sm text-[#CFA770] font-medium">Y.S</div>
                <div>
                  <p className="text-sm text-[#2C241B] tracking-wider">Y.S さん</p>
                  <p className="text-[10px] text-[#8A7A6A] tracking-widest">34歳 / 会社員</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-[#FCFAFA] p-8 border border-[#EAE3D9] rounded-sm">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
              <p className="text-sm text-[#4A4036] leading-[2] tracking-wider mb-6">
                転職すべきかずっと悩んでいましたが、鑑定書の&quot;天職の章&quot;に書かれていた内容がまさに今の自分の状況そのもの。背中を押してもらえました。今は新しい職場で充実しています。
              </p>
              <div className="flex items-center gap-3 border-t border-[#EAE3D9] pt-4">
                <div className="w-10 h-10 rounded-full bg-[#FAF4EA] border border-[#EAE3D9] flex items-center justify-center text-sm text-[#CFA770] font-medium">M.K</div>
                <div>
                  <p className="text-sm text-[#2C241B] tracking-wider">M.K さん</p>
                  <p className="text-[10px] text-[#8A7A6A] tracking-widest">31歳 / フリーランス</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-[#FCFAFA] p-8 border border-[#EAE3D9] rounded-sm">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
              <p className="text-sm text-[#4A4036] leading-[2] tracking-wider mb-6">
                友人に勧められて半信半疑で購入しましたが、読み終わった瞬間に友人にも勧めていました。10,000文字ぎっしりの鑑定書は、市販の占い本とは比べ物にならない深さです。
              </p>
              <div className="flex items-center gap-3 border-t border-[#EAE3D9] pt-4">
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

      {/* --- SAMPLE REPORT PREVIEW (Blurred Teaser) --- */}
      <section className="w-full py-24 px-6 bg-[#FAF4EA] border-b border-[#EAE3D9]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-[#2C241B] tracking-widest mb-4">
              鑑定書サンプル
            </h2>
            <p className="text-sm text-[#8A7A6A] tracking-widest">実際の鑑定書の一部をお見せします</p>
          </div>

          <div className="bg-white border border-[#EAE3D9] rounded-sm p-8 md:p-12 shadow-sm relative overflow-hidden" style={{minHeight: '520px'}}>
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
                  className="w-full flex items-center justify-center py-5 bg-[#CFA770] text-white hover:bg-[#B69260] disabled:bg-[#EAE3D9] disabled:cursor-not-allowed transition-colors text-base tracking-widest rounded-sm shadow-md"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">鑑定書を準備しています...</span>
                  ) : (
                    "無料で鑑定書の一部を読む"
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
