'use client';

import { Sparkles, ArrowRight, Clock, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const destinyNumbers = [
  { num: 1, title: '開拓者', trait: 'リーダーシップと独立心', desc: '生まれながらのリーダー。自分の道を自ら切り拓く開拓者タイプです。独立心が強く、新しいことに挑戦するエネルギーに満ちています。', career: '起業家、経営者、フリーランス', love: '対等な関係を求め、束縛を嫌う' },
  { num: 2, title: '調和者', trait: '協調性と繊細さ', desc: '場の空気を読み、人と人との橋渡しをする天性の外交官。繊細な感受性で相手の気持ちを察する能力に長けています。', career: 'カウンセラー、外交官、アーティスト', love: '深い精神的つながりを重視する' },
  { num: 3, title: '表現者', trait: '創造性とコミュニケーション力', desc: '言葉や芸術を通じて自己を表現する才能の持ち主。楽観的な性格で、周囲を明るく照らすムードメーカーです。', career: '作家、デザイナー、芸能人、マーケター', love: '楽しさと刺激を求めるロマンチスト' },
  { num: 4, title: '建設者', trait: '安定志向と堅実さ', desc: '確実に物事を積み上げていく堅実な努力家。計画性があり、長期的な視野で物事を考えることができます。', career: 'エンジニア、建築家、会計士', love: '信頼と安定を最も大切にする' },
  { num: 5, title: '冒険者', trait: '自由と変化への渇望', desc: '変化を恐れず、自由を何よりも大切にする冒険家タイプ。好奇心旺盛で、多様な経験を通じて成長します。', career: '旅行家、ジャーナリスト、営業職', love: '刺激的で自由な関係を好む' },
  { num: 6, title: '守護者', trait: '愛と責任感', desc: '深い愛情と責任感で家族やコミュニティを守る存在。美的感覚にも優れ、調和のとれた環境を作り出す力があります。', career: '医療従事者、教育者、デザイナー', love: '献身的で家庭的。尽くすタイプ' },
  { num: 7, title: '探究者', trait: '知性と神秘への追求', desc: '物事の本質を深く探究する知性の持ち主。分析力に優れ、真理を追い求める孤高の研究者タイプです。', career: '研究者、哲学者、プログラマー', love: '精神的なつながりを最重要視する' },
  { num: 8, title: '実現者', trait: '実行力と物質的成功', desc: 'ビジョンを現実に変換する圧倒的な実行力の持ち主。ビジネスとの相性が抜群で、成功への嗅覚に優れています。', career: '経営者、投資家、プロデューサー', love: '同じ志を持つパートナーを求める' },
  { num: 9, title: '博愛者', trait: '人道主義と理想主義', desc: '広い視野で世界を見つめ、人類への深い愛を持つ博愛主義者。理想を追い求め、社会貢献に生きがいを感じます。', career: 'NPO、社会起業家、芸術家', love: '精神的な成長を共にできる相手' },
  { num: 11, title: 'スピリチュアルメッセンジャー', trait: '直感力と霊感', desc: 'マスターナンバー。高い直感力と深い洞察力を持ち、見えない世界と現実世界の橋渡しをする特別な存在です。', career: 'ヒーラー、占い師、アーティスト', love: 'ソウルメイトとの運命的な出会い' },
  { num: 22, title: 'マスタービルダー', trait: '壮大なビジョンと実現力', desc: 'マスターナンバー。壮大な理想を現実世界で形にする力を持った希少な存在。世界レベルで影響を与える可能性があります。', career: '社会変革者、大規模プロジェクトリーダー', love: '共にビジョンを追う運命の人' },
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
