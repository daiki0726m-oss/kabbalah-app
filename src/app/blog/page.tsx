'use client';

import { Sparkles, ChevronRight, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const articles = [
  {
    slug: 'what-is-kabbalah',
    title: 'カバラ数秘術とは？4,000年の歴史と現代での活用法',
    description: 'ユダヤ教の神秘思想に根ざすカバラ数秘術の起源から、ピタゴラス・テスラなど偉人たちの活用事例、現代での鑑定方法まで徹底解説。',
    category: '基礎知識',
    readTime: '8分',
  },
  {
    slug: 'how-to-calculate',
    title: '【3ステップ】運命数の計算方法を完全解説',
    description: '生年月日からカバラ数秘術の運命数（ライフパスナンバー）を計算する方法を、具体例付きで初心者にも分かりやすく解説します。',
    category: '計算方法',
    readTime: '5分',
  },
  {
    slug: 'destiny-numbers',
    title: '運命数1〜9・11・22の性格・才能・適職を完全ガイド',
    description: '運命数ごとの本質的な性格、隠された才能、向いている仕事、恋愛傾向を数秘術のプロが徹底分析。あなたの番号を見つけてください。',
    category: '性格診断',
    readTime: '12分',
  },
];

const destinyArticles = [
  { num: 1, title: '王冠（ケテル）', desc: 'セフィラ: ケテル。太陽の支配を受け、「無から有を生み出す」開拓者。' },
  { num: 2, title: '知恵（コクマー）', desc: 'セフィラ: コクマー。月の支配を受け、場の空気を映し取る直感の泉。' },
  { num: 3, title: '理解（ビナー）', desc: 'セフィラ: ビナー。木星の拡大のエネルギーで、言霊の力を持つ創造の母。' },
  { num: 4, title: '慈悲（ケセド）', desc: 'セフィラ: ケセド。土星の制限と構造で、混沌に秩序をもたらす構築者。' },
  { num: 5, title: '峻厳（ゲブラー）', desc: 'セフィラ: ゲブラー。水星のスピードで五感を駆使する変容の炎。' },
  { num: 6, title: '美（ティファレト）', desc: 'セフィラ: ティファレト。金星の愛と美で調和を生む生命の樹の心臓。' },
  { num: 7, title: '勝利（ネツァク）', desc: 'セフィラ: ネツァク。海王星の深遠さで真理を見抜く聖なる完全数。' },
  { num: 8, title: '栄光（ホド）', desc: 'セフィラ: ホド。無限大∞のシンボルを持つカルマの数字。' },
  { num: 9, title: '基盤（イェソド）', desc: 'セフィラ: イェソド。1〜8を内包する完結の数字。博愛の器。' },
];

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-[#0C0A14] text-[#BEB5A5] selection:bg-[#D4AF37]/30 selection:text-white">
      <nav className="w-full bg-[#0C0A14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-xs font-light tracking-[0.25em] text-[#D4AF37]/80 uppercase flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} /><span>Kabbalah</span>
          </Link>
          <span className="text-[10px] tracking-[0.15em] text-[#7A7068] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>Column</span>
        </div>
      </nav>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Knowledge Base</p>
          <h1 className="text-2xl font-light text-[#F5F0E8] tracking-widest mb-4" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            カバラ数秘術コラム
          </h1>
          <p className="text-sm text-[#7A7068] tracking-wider leading-relaxed">
            4,000年の叡智を、分かりやすく解説
          </p>
        </div>

        <div className="space-y-6">
          {articles.map((article, i) => (
            <Link key={i} href={`/blog/${article.slug}`} className="block group">
              <article className="bg-white/[0.03] border border-white/[0.08] rounded-sm p-6 hover:border-[#D4AF37]/20 transition-all duration-300 hover:bg-white/[0.05]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[9px] tracking-[0.15em] text-[#D4AF37] uppercase font-bold px-2 py-0.5 border border-[#D4AF37]/30 rounded-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{article.category}</span>
                  <span className="flex items-center gap-1 text-[10px] text-[#7A7068] tracking-wider"><Clock className="w-3 h-3" />{article.readTime}</span>
                </div>
                <h2 className="text-base font-medium text-[#F5F0E8] tracking-wider mb-2 group-hover:text-[#D4AF37] transition-colors" style={{ fontFamily: '"Noto Serif JP", serif' }}>
                  {article.title}
                </h2>
                <p className="text-xs text-[#7A7068] tracking-wider leading-relaxed mb-3">{article.description}</p>
                <div className="flex items-center gap-1 text-[10px] text-[#D4AF37] tracking-wider group-hover:gap-2 transition-all">
                  続きを読む <ChevronRight className="w-3 h-3" />
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Destiny Number Grid */}
        <div className="mt-12">
          <h2 className="text-sm font-medium text-[#F5F0E8] tracking-widest mb-6 text-center" style={{ fontFamily: '"Noto Serif JP", serif' }}>運命数を深掘り</h2>
          <div className="grid grid-cols-3 gap-3">
            {destinyArticles.map((d) => (
              <Link key={d.num} href={`/blog/destiny-number/${d.num}`} className="group bg-white/[0.03] border border-white/[0.08] rounded-sm p-4 hover:border-[#D4AF37]/20 transition-all text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#D4AF37]/10">
                  <span className="text-lg font-bold text-[#D4AF37]" style={{ fontFamily: 'Inter, sans-serif' }}>{d.num}</span>
                </div>
                <p className="text-xs font-medium text-[#F5F0E8] group-hover:text-[#D4AF37] transition-colors">{d.title}</p>
                <p className="text-[10px] text-[#7A7068] mt-1 leading-relaxed">{d.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-white/[0.03] border border-[#D4AF37]/20 rounded-sm p-8">
          <p className="text-sm text-[#F5F0E8] tracking-wider mb-2" style={{ fontFamily: '"Noto Serif JP", serif' }}>あなたの運命数を知りたい方へ</p>
          <p className="text-xs text-[#7A7068] tracking-wider mb-6">生年月日だけで、無料で鑑定書を生成します</p>
          <Link href="/" className="inline-flex items-center gap-2 px-8 py-3 text-sm tracking-widest font-bold text-[#0C0A14] rounded-sm" style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)', boxShadow: '0 0 20px rgba(212,175,55,0.15)' }}>
            ✦ 無料で鑑定する <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <footer className="py-8 text-center border-t border-white/5">
        <p className="text-[10px] text-[#7A7068] tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>&copy; 2026 Kabbalah</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=Inter:wght@400;600;700&display=swap');` }} />
    </main>
  );
}
