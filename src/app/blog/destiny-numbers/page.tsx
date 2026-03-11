'use client';

import { Sparkles, ArrowRight, Clock, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const destinyNumbers = [
  { num: 1, title: '王冠（ケテル）', trait: 'セフィラ: ケテル ─ 太陽', desc: 'カバラの生命の樹の最高位「ケテル」に対応。万物の源、最初の閃きを意味し、「無から有を生み出す」原初のエネルギーが宿る開拓者タイプです。', career: '起業家、経営者、クリエイティブディレクター', love: '対等に渡り合えるパートナーを求める' },
  { num: 2, title: '知恵（コクマー）', trait: 'セフィラ: コクマー ─ 月', desc: '月の支配を受け、他者の感情や場の空気を鏡のように映し取る天性の感受性の持ち主。人と人の間に安全な空間を作る力があります。', career: 'カウンセラー、外交官、音楽家', love: '深い精神的つながりを最重視する' },
  { num: 3, title: '理解（ビナー）', trait: 'セフィラ: ビナー ─ 木星', desc: '木星の拡大のエネルギーを受け、「理解する母」としての創造力を持つ。言葉で現実を変える「言霊」の力を持つ表現者タイプです。', career: '作家、デザイナー、マーケター', love: '楽しさと刺激を求めるロマンチスト' },
  { num: 4, title: '慈悲（ケセド）', trait: 'セフィラ: ケセド ─ 土星', desc: '土星の「制限と構造」のエネルギーを受け、計画を立て着実に積み上げる堅実な構築者。混沌に秩序をもたらす才能があります。', career: 'エンジニア、建築家、PM', love: '信頼と安定を最も大切にする' },
  { num: 5, title: '峻厳（ゲブラー）', trait: 'セフィラ: ゲブラー ─ 水星', desc: '水星のスピードと多才さを宿し、五感すべてが鋭い変革者タイプ。退屈は文字通りあなたの敵。変化をエネルギーに変えます。', career: '旅行家、ジャーナリスト、海外営業', love: '刺激的で自由な関係を好む' },
  { num: 6, title: '美（ティファレト）', trait: 'セフィラ: ティファレト ─ 金星', desc: '生命の樹の中心「心臓」に位置する調和の数字。金星の愛と美のエネルギーで、分断されたものを一つに結ぶ力を持ちます。', career: '医療従事者、デザイナー、教育者', love: '献身的で家庭的。愛に生きるタイプ' },
  { num: 7, title: '勝利（ネツァク）', trait: 'セフィラ: ネツァク ─ 海王星', desc: 'カバラにおいて最も霊的な聖なる完全数。海王星の深遠なエネルギーで、情報の海から本質を切り出す鋭利な知性を持ちます。', career: '研究者、プログラマー、心理学者', love: '精神的なつながりを最重要視する' },
  { num: 8, title: '栄光（ホド）', trait: 'セフィラ: ホド ─ 土星/∞', desc: '無限大（∞）のシンボルを持つ「カルマの数字」。蒔いた種が何倍にもなって返ってくるエネルギーで物質世界を動かします。', career: '経営者、投資家、金融', love: '同じ志を持つパートナーを求める' },
  { num: 9, title: '基盤（イェソド）', trait: 'セフィラ: イェソド ─ 火星', desc: '1〜8の全てを内包する完結の数字。火星の情熱と浄化のエネルギーで、人類への深い博愛を体現する稀有な存在です。', career: 'NPO、社会起業家、芸術家', love: '精神的な成長を共にできる相手' },
  { num: 11, title: 'マスター直感者（ダアト）', trait: '隠されたセフィラ: ダアト', desc: 'マスターナンバー。生命の樹の隠された門「ダアト」に対応。1の独立心が二倍に増幅され、通常の知覚を超えた直感力を持ちます。', career: 'ヒーラー、心理学者、芸術家', love: 'ソウルメイトとの運命的な出会い' },
  { num: 22, title: 'マスター建築家（マルクト）', trait: 'セフィラ: マルクト ─ ケテル直結', desc: 'マスターナンバー。最下位マルクトと最上位ケテルを直結する最強の数字。壮大なビジョンを物質世界に建設する使命を持ちます。', career: '社会変革者、大規模PJリーダー', love: '共にビジョンを追う運命の人' },
  { num: 33, title: 'マスターヒーラー（ツィムツーム）', trait: 'カバラ最深の概念: ツィムツーム', desc: 'マスターナンバー最高峰。神の自己収縮「ツィムツーム」に共鳴し、存在そのものが周囲に深い癒しをもたらす最も稀少な数字です。', career: 'ヒーラー、教育者、慈善活動家', love: '無条件の愛を体現するステージへ' },
];

export default function DestinyNumbersPage() {
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
          <span className="text-[9px] tracking-[0.15em] text-[#D4AF37] uppercase font-bold px-2 py-0.5 border border-[#D4AF37]/30 rounded-sm" style={{ fontFamily: 'Inter, sans-serif' }}>性格診断</span>
          <span className="flex items-center gap-1 text-[10px] text-[#7A7068] tracking-wider"><Clock className="w-3 h-3" />12分</span>
        </div>

        <h1 className="text-xl md:text-2xl font-light text-[#F5F0E8] tracking-widest leading-relaxed mb-4" style={{ fontFamily: '"Noto Serif JP", serif' }}>
          運命数1〜9・11・22の<br className="md:hidden" />性格・才能・適職を完全ガイド
        </h1>
        <p className="text-sm text-[#7A7068] tracking-wider leading-relaxed mb-12">
          カバラ数秘術の運命数（ライフパスナンバー）ごとの本質的な性格、才能、適職、恋愛傾向を解説します。あなたの運命数はいくつですか？
        </p>

        <div className="space-y-6">
          {destinyNumbers.map((d) => (
            <div key={d.num} className="bg-white/[0.03] border border-white/[0.08] rounded-sm overflow-hidden">
              <div className="bg-white/[0.03] px-6 py-4 border-b border-white/[0.06] flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/30 flex items-center justify-center bg-[#D4AF37]/10 shrink-0">
                  <span className="text-xl font-bold text-[#D4AF37]" style={{ fontFamily: 'Inter, sans-serif' }}>{d.num}</span>
                </div>
                <div>
                  <h2 className="text-base font-medium text-[#F5F0E8] tracking-wider" style={{ fontFamily: '"Noto Serif JP", serif' }}>
                    運命数{d.num} ─ {d.title}
                  </h2>
                  <p className="text-[10px] text-[#D4AF37] tracking-wider">{d.trait}</p>
                </div>
              </div>
              <div className="px-6 py-5 space-y-4 text-sm leading-[2] tracking-wider">
                <p>{d.desc}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-sm p-3">
                    <p className="text-[9px] text-[#D4AF37] tracking-[0.15em] uppercase font-bold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>適職</p>
                    <p className="text-xs text-[#BEB5A5]">{d.career}</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-sm p-3">
                    <p className="text-[9px] text-[#D4AF37] tracking-[0.15em] uppercase font-bold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>恋愛</p>
                    <p className="text-xs text-[#BEB5A5]">{d.love}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-white/[0.03] border border-[#D4AF37]/20 rounded-sm p-8 text-center">
          <p className="text-base text-[#F5F0E8] tracking-wider mb-2" style={{ fontFamily: '"Noto Serif JP", serif' }}>あなたの運命数をもっと深く知る</p>
          <p className="text-xs text-[#7A7068] tracking-wider mb-6">光・影・才能の3面鑑定＋10年バイオリズムを無料でお届け</p>
          <Link href="/" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm tracking-widest font-bold text-[#0C0A14] rounded-sm" style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)', boxShadow: '0 0 20px rgba(212,175,55,0.15)' }}>
            ✦ 無料で鑑定する <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>

      <footer className="py-8 text-center border-t border-white/5">
        <p className="text-[10px] text-[#7A7068] tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>&copy; 2026 Kabbalah</p>
      </footer>
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=Inter:wght@400;600;700&display=swap');` }} />
    </main>
  );
}
