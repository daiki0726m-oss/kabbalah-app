'use client';

import { Sparkles, ArrowRight, Clock, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function HowToCalculatePage() {
  return (
    <main className="min-h-screen bg-[#0C0A14] text-[#BEB5A5] selection:bg-[#D4AF37]/30 selection:text-white">
      <nav className="w-full bg-[#0C0A14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-xs font-light tracking-[0.25em] text-[#D4AF37]/80 uppercase flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} /><span>Kabbalah</span>
          </Link>
        </div>
      </nav>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <article className="max-w-2xl mx-auto px-6 py-12">
        <Link href="/blog" className="inline-flex items-center gap-1 text-[10px] text-[#7A7068] tracking-wider hover:text-[#D4AF37] transition-colors mb-8">
          <ChevronLeft className="w-3 h-3" /> コラム一覧に戻る
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-[9px] tracking-[0.15em] text-[#D4AF37] uppercase font-bold px-2 py-0.5 border border-[#D4AF37]/30 rounded-sm" style={{ fontFamily: 'Inter, sans-serif' }}>計算方法</span>
          <span className="flex items-center gap-1 text-[10px] text-[#7A7068] tracking-wider"><Clock className="w-3 h-3" />5分</span>
        </div>

        <h1 className="text-xl md:text-2xl font-light text-[#F5F0E8] tracking-widest leading-relaxed mb-8" style={{ fontFamily: '"Noto Serif JP", serif' }}>
          【3ステップ】運命数の<br className="md:hidden" />計算方法を完全解説
        </h1>

        <div className="prose-dark space-y-8 text-sm leading-[2.2] tracking-wider">
          <p>
            カバラ数秘術における<b>運命数（ライフパスナンバー）</b>は、あなたの人生の本質的なテーマを示す最も重要な数字です。計算方法はとてもシンプルで、<b>生年月日の各桁を一桁になるまで足し続ける</b>だけ。ここでは具体例を使って解説します。
          </p>

          <h2 className="text-base font-medium text-[#F5F0E8] tracking-widest pt-4 border-t border-white/5" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            Step 1: 生年月日を分解する
          </h2>
          <p>
            例として、<b>1990年5月23日</b>生まれの人の運命数を計算してみましょう。
          </p>
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-sm p-5">
            <p className="text-center text-[#D4AF37] tracking-[0.3em] font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>1 9 9 0 / 0 5 / 2 3</p>
          </div>
          <p>
            生年月日のすべての桁を個別の数字として扱います。
          </p>

          <h2 className="text-base font-medium text-[#F5F0E8] tracking-widest pt-4 border-t border-white/5" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            Step 2: すべての桁を足す
          </h2>
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-sm p-5 space-y-2">
            <p className="text-center text-[#BEB5A5] tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
              1 + 9 + 9 + 0 + 0 + 5 + 2 + 3 = <span className="text-[#D4AF37] font-bold">29</span>
            </p>
          </div>
          <p>
            合計が<b>2桁以上</b>になった場合は、次のステップに進みます。ただし、<b>11</b>と<b>22</b>は「マスターナンバー」と呼ばれる特別な数字なので、<b>そのまま確定</b>させます。
          </p>

          <h2 className="text-base font-medium text-[#F5F0E8] tracking-widest pt-4 border-t border-white/5" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            Step 3: 一桁になるまで繰り返す
          </h2>
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-sm p-5 space-y-2">
            <p className="text-center text-[#BEB5A5] tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
              29 → 2 + 9 = <span className="text-2xl text-[#D4AF37] font-bold">11</span>
            </p>
          </div>
          <p>
            結果は<b>11</b>。これはマスターナンバーなので、ここで確定です！この人の運命数は<b>「11」</b>——直感力と霊感に優れた「スピリチュアルメッセンジャー」の数字です。
          </p>

          <h2 className="text-base font-medium text-[#F5F0E8] tracking-widest pt-4 border-t border-white/5" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            もう一つの例
          </h2>
          <p><b>1985年12月7日</b>生まれの場合：</p>
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-sm p-5 space-y-2">
            <p className="text-center text-[#BEB5A5] tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
              1 + 9 + 8 + 5 + 1 + 2 + 0 + 7 = <span className="text-[#D4AF37] font-bold">33</span>
            </p>
            <p className="text-center text-[#BEB5A5] tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
              33 → 3 + 3 = <span className="text-2xl text-[#D4AF37] font-bold">6</span>
            </p>
          </div>
          <p>
            この人の運命数は<b>「6」</b>——愛と調和を司る「癒しの守護者」の数字です。
          </p>

          <h2 className="text-base font-medium text-[#F5F0E8] tracking-widest pt-4 border-t border-white/5" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            マスターナンバーとは？
          </h2>
          <p>
            カバラ数秘術には<b>「11」</b>と<b>「22」</b>という2つの特別な数字があります。これらは「マスターナンバー」と呼ばれ、通常の一桁化を行わずにそのまま確定させます。
          </p>
          <ul className="space-y-3 pl-4">
            <li className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-3 before:w-1.5 before:h-1.5 before:bg-[#D4AF37]/50 before:rounded-full">
              <b>マスターナンバー11</b> — 高い直感力と霊的感受性。人を導く使命を持つ
            </li>
            <li className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-3 before:w-1.5 before:h-1.5 before:bg-[#D4AF37]/50 before:rounded-full">
              <b>マスターナンバー22</b> — 壮大なビジョンと実現力。世界レベルで影響を与える可能性
            </li>
          </ul>

          <div className="bg-[#1B1530] border border-[#D4AF37]/20 rounded-sm p-6 mt-4">
            <p className="text-xs text-[#D4AF37] tracking-wider font-bold mb-2">💡 ポイント</p>
            <p className="text-sm text-[#BEB5A5] leading-[2] tracking-wider">
              計算自体は簡単ですが、運命数の<b>「本当の意味」</b>を深く読み解くには、数秘術の知識と経験が必要です。光の側面だけでなく、影の側面、才能の活かし方、人生の転機まで含めた総合的な鑑定をお試しください。
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-white/[0.03] border border-[#D4AF37]/20 rounded-sm p-8 text-center">
          <p className="text-base text-[#F5F0E8] tracking-wider mb-2" style={{ fontFamily: '"Noto Serif JP", serif' }}>自動で運命数を鑑定しませんか？</p>
          <p className="text-xs text-[#7A7068] tracking-wider mb-6">生年月日を入力するだけ。光・影・才能の3面鑑定を無料でお届けします</p>
          <Link href="/" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm tracking-widest font-bold text-[#0C0A14] rounded-sm" style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)', boxShadow: '0 0 20px rgba(212,175,55,0.15)' }}>
            ✦ 無料で鑑定する <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>

      <footer className="py-8 text-center border-t border-white/5">
        <p className="text-[10px] text-[#7A7068] tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>&copy; 2026 Kabbalah</p>
      </footer>
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=Inter:wght@400;600;700&display=swap'); .prose-dark b { color: #D4AF37; }` }} />
    </main>
  );
}
