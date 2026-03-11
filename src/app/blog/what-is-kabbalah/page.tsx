'use client';

import { Sparkles, ArrowRight, Clock, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export default function WhatIsKabbalahPage() {
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
          <span className="text-[9px] tracking-[0.15em] text-[#D4AF37] uppercase font-bold px-2 py-0.5 border border-[#D4AF37]/30 rounded-sm" style={{ fontFamily: 'Inter, sans-serif' }}>基礎知識</span>
          <span className="flex items-center gap-1 text-[10px] text-[#7A7068] tracking-wider"><Clock className="w-3 h-3" />8分</span>
        </div>

        <h1 className="text-xl md:text-2xl font-light text-[#F5F0E8] tracking-widest leading-relaxed mb-8" style={{ fontFamily: '"Noto Serif JP", serif' }}>
          カバラ数秘術とは？<br className="md:hidden" />4,000年の歴史と現代での活用法
        </h1>

        <div className="prose-dark space-y-8 text-sm leading-[2.2] tracking-wider">
          <p>
            「カバラ数秘術」という言葉を聞いたことはありますか？カバラ（Kabbalah）とは、ヘブライ語で<b>「受け取られたもの」</b>を意味し、ユダヤ教の神秘主義思想に深く根ざした叡智の体系です。その歴史は紀元前にまで遡り、<b>約4,000年</b>もの間、口伝として受け継がれてきました。
          </p>

          <h2 className="text-base font-medium text-[#F5F0E8] tracking-widest pt-4 border-t border-white/5" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            カバラ数秘術の起源
          </h2>
          <p>
            カバラ数秘術の原点は、古代バビロニアに遡ります。当時の知識人たちは、宇宙の法則が「数」に宿ると信じていました。この思想はやがてユダヤ教の神秘主義と融合し、旧約聖書の文字にも数的な意味が隠されているという<b>「ゲマトリア」</b>の技法として発展しました。
          </p>
          <p>
            後に古代ギリシャの哲学者<b>ピタゴラス</b>がこの叡智に触れ、「万物は数なり」という有名な言葉を残しました。ピタゴラスは数学者であると同時に神秘家でもあり、数が持つ振動（バイブレーション）が人間の運命に影響を与えると確信していたのです。
          </p>

          <h2 className="text-base font-medium text-[#F5F0E8] tracking-widest pt-4 border-t border-white/5" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            なぜ「数」で運命が分かるのか
          </h2>
          <p>
            カバラ数秘術の根幹にあるのは、<b>「すべての物事は数に還元でき、数にはそれぞれ固有の振動（エネルギー）がある」</b>という考え方です。生年月日はあなたがこの世に生を受けた瞬間の「宇宙のリズム」を刻んだもの。その数を一桁に還元することで、あなたの魂が本来持つ性質——<b>運命数（ライフパスナンバー）</b>が導き出されます。
          </p>
          <p>
            これは単なる占いとは異なります。4,000年にわたり検証されてきた「数の法則」に基づく、体系的な分析手法なのです。
          </p>

          <h2 className="text-base font-medium text-[#F5F0E8] tracking-widest pt-4 border-t border-white/5" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            偉人たちとカバラ数秘術
          </h2>
          <p>
            歴史上の偉人たちの中にも、数秘術の力を信じた人物は少なくありません。
          </p>
          <ul className="space-y-3 pl-4">
            <li className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-3 before:w-1.5 before:h-1.5 before:bg-[#D4AF37]/50 before:rounded-full">
              <b>ピタゴラス</b> — 「万物は数なり」の哲学で数秘術の基盤を構築
            </li>
            <li className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-3 before:w-1.5 before:h-1.5 before:bg-[#D4AF37]/50 before:rounded-full">
              <b>ニコラ・テスラ</b> — 「3・6・9の数字の壮大さが分かれば、宇宙への鍵を手にする」と語った天才発明家
            </li>
            <li className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-3 before:w-1.5 before:h-1.5 before:bg-[#D4AF37]/50 before:rounded-full">
              <b>マドンナ</b> — カバラ研究で知られ、自身の人生の指針として活用
            </li>
          </ul>

          <h2 className="text-base font-medium text-[#F5F0E8] tracking-widest pt-4 border-t border-white/5" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            現代のカバラ数秘術
          </h2>
          <p>
            現代では、カバラ数秘術は単なる歴史的な遺産ではなく、<b>自己理解と人生設計のツール</b>として世界中で活用されています。自分の運命数を知ることで、
          </p>
          <ul className="space-y-2 pl-4">
            <li className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-3 before:w-1.5 before:h-1.5 before:bg-[#D4AF37]/50 before:rounded-full">本質的な性格と才能の発見</li>
            <li className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-3 before:w-1.5 before:h-1.5 before:bg-[#D4AF37]/50 before:rounded-full">人生の転機となる時期の予測</li>
            <li className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-3 before:w-1.5 before:h-1.5 before:bg-[#D4AF37]/50 before:rounded-full">相性の良い人間関係の把握</li>
            <li className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-3 before:w-1.5 before:h-1.5 before:bg-[#D4AF37]/50 before:rounded-full">最適なキャリアの方向性</li>
          </ul>
          <p>
            これらを体系的に知ることができます。
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-white/[0.03] border border-[#D4AF37]/20 rounded-sm p-8 text-center">
          <p className="text-base text-[#F5F0E8] tracking-wider mb-2" style={{ fontFamily: '"Noto Serif JP", serif' }}>あなたの運命数を無料で鑑定</p>
          <p className="text-xs text-[#7A7068] tracking-wider mb-6">生年月日を入力するだけ。30秒で鑑定書が届きます</p>
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
