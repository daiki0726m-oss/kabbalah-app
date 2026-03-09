"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, BookOpen, Heart, Compass, Sparkles, Feather } from "lucide-react";

export default function PremiumHumanMentorshipLP() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("1985");
  const [birthMonth, setBirthMonth] = useState("1");
  const [birthDay, setBirthDay] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

          <a href="#form" className="mt-16 inline-flex flex-col items-center gap-3 text-sm tracking-widest text-[#8A7A6A] hover:text-[#CFA770] transition-colors cursor-pointer">
            まずは無料で少し読んでみる
            <ChevronDown className="w-5 h-5 animate-bounce" strokeWidth={1.5} />
          </a>
        </div>
      </section>

      {/* --- THE MENTOR'S LETTER (Human Connection) --- */}
      <section className="w-full py-24 px-6 bg-white border-y border-[#EAE3D9] relative">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Atmospheric Visual */}
          <div className="w-full relative aspect-[4/5] rounded-sm overflow-hidden shadow-sm order-2 lg:order-1">
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
          <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-sm overflow-hidden shadow-sm order-1 lg:order-2">
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
                  第一章：あなたの本質と、隠された裏の顔
                </h3>
                <p className="text-sm text-[#6A5A4A] leading-relaxed tracking-widest">
                  あなたが生まれ持った特別な才能（光）と、無意識のうちに抱えている欲求やカルマ（影）。表向きの性格だけでなく、人生で繰り返しやすい失敗の理由を詳細に解き明かします。
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
                  第二章：運命のパートナーと、訪れる愛の形
                </h3>
                <p className="text-sm text-[#6A5A4A] leading-relaxed tracking-widest">
                  魂が深く共鳴する相手の具体的な特徴（容姿・職業・性格）や、その人と出会う可能性が高い時期。また、現在の関係が行き詰まっているなら、それを打破するためのアプローチをお伝えします。
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
                  第三章：人生の黄金期と、今のあなたがすべきこと
                </h3>
                <p className="text-sm text-[#6A5A4A] leading-relaxed tracking-widest">
                  あなたの人生を9年周期のバイオリズムで読み解き、今が「準備の時期」なのか「勝負の時期」なのかを断言。次に大きなチャンスが訪れるタイミングを具体的な年齢・時期レベルで提示します。
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FORM SECTION (Warm Initiation) --- */}
      <section id="form" className="w-full py-24 px-6 bg-white border-t border-[#EAE3D9]">
        <div className="max-w-2xl mx-auto">
          
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
      <footer className="bg-[#FAF4EA] py-10 text-center border-t border-[#EAE3D9]">
        <div className="text-[10px] text-[#8A7A6A] tracking-[0.2em] font-sans uppercase">
          &copy; 2026 Kabbalah 鑑定室
        </div>
      </footer>
    </main>
  );
}
