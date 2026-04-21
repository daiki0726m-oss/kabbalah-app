"use client";

import { useParams, useRouter } from "next/navigation";
import { Sparkles, Heart, Briefcase, Star, Users, ArrowRight, Shield, Clock, Lock } from "lucide-react";
import { personalityData } from "@/lib/numerology";
import { motion } from "framer-motion";

/* ── Famous people per destiny number ── */
const FAMOUS_PEOPLE: Record<number, { name: string; field: string }[]> = {
  1: [
    { name: "スティーブ・ジョブズ", field: "Apple創業者" },
    { name: "孫正義", field: "SoftBank創業者" },
    { name: "レディー・ガガ", field: "歌手" },
    { name: "マーティン・ルーサー・キング", field: "公民権運動指導者" },
  ],
  2: [
    { name: "バラク・オバマ", field: "元アメリカ大統領" },
    { name: "マザー・テレサ", field: "修道女" },
    { name: "エマ・ワトソン", field: "女優" },
    { name: "ガンジー", field: "インド独立運動の指導者" },
  ],
  3: [
    { name: "ジミー・ヘンドリックス", field: "ギタリスト" },
    { name: "ヒラリー・クリントン", field: "元国務長官" },
    { name: "ジョン・トラボルタ", field: "俳優" },
    { name: "スナップ・ドッグ", field: "ラッパー" },
  ],
  4: [
    { name: "ビル・ゲイツ", field: "Microsoft創業者" },
    { name: "オプラ・ウィンフリー", field: "テレビ司会者" },
    { name: "アーノルド・シュワルツェネッガー", field: "俳優/政治家" },
    { name: "イライジャ・ウッド", field: "俳優" },
  ],
  5: [
    { name: "アブラハム・リンカーン", field: "第16代アメリカ大統領" },
    { name: "アンジェリーナ・ジョリー", field: "女優" },
    { name: "ミック・ジャガー", field: "ロックミュージシャン" },
    { name: "マーク・ザッカーバーグ", field: "Meta創業者" },
  ],
  6: [
    { name: "ジョン・レノン", field: "ミュージシャン" },
    { name: "アインシュタイン", field: "物理学者" },
    { name: "マイケル・ジャクソン", field: "キング・オブ・ポップ" },
    { name: "ジェシカ・アルバ", field: "女優/起業家" },
  ],
  7: [
    { name: "イチロー", field: "プロ野球選手" },
    { name: "宮崎駿", field: "アニメーション映画監督" },
    { name: "レオナルド・ディカプリオ", field: "俳優" },
    { name: "ニコラ・テスラ", field: "発明家" },
  ],
  8: [
    { name: "松下幸之助", field: "パナソニック創業者" },
    { name: "ネルソン・マンデラ", field: "元南アフリカ大統領" },
    { name: "サンドラ・ブロック", field: "女優" },
    { name: "パブロ・ピカソ", field: "画家" },
  ],
  9: [
    { name: "マハトマ・ガンジー", field: "インド独立の父" },
    { name: "ジミ・ヘンドリックス", field: "ギタリスト" },
    { name: "ボブ・マーリー", field: "レゲエミュージシャン" },
    { name: "カート・コバーン", field: "ミュージシャン" },
  ],
  11: [
    { name: "モーツァルト", field: "作曲家" },
    { name: "ミシェル・オバマ", field: "元アメリカ大統領夫人" },
    { name: "エドガー・アラン・ポー", field: "作家" },
    { name: "デヴィッド・ベッカム", field: "サッカー選手" },
  ],
  22: [
    { name: "ポール・マッカートニー", field: "ミュージシャン" },
    { name: "リチャード・ブランソン", field: "Virgin Group創業者" },
    { name: "ウィル・スミス", field: "俳優" },
    { name: "デール・カーネギー", field: "作家" },
  ],
  33: [
    { name: "アルベルト・シュバイツァー", field: "医師/神学者" },
    { name: "スティーヴン・スピルバーグ", field: "映画監督" },
    { name: "マーリン・モンロー", field: "女優" },
    { name: "フランシスコ教皇", field: "ローマ教皇" },
  ],
};

/* ── Compatibility ── */
const COMPATIBILITY: Record<number, { best: number[]; good: number[]; challenging: number[] }> = {
  1: { best: [3, 5], good: [7, 9], challenging: [4, 8] },
  2: { best: [4, 8], good: [6, 9], challenging: [1, 5] },
  3: { best: [1, 5], good: [6, 9], challenging: [4, 7] },
  4: { best: [2, 8], good: [6, 7], challenging: [1, 3, 5] },
  5: { best: [1, 3], good: [7, 9], challenging: [2, 4] },
  6: { best: [2, 9], good: [3, 4], challenging: [1, 5] },
  7: { best: [5, 7], good: [1, 4], challenging: [2, 3, 6] },
  8: { best: [2, 4], good: [6, 9], challenging: [1, 3] },
  9: { best: [3, 6], good: [1, 5], challenging: [4, 8] },
  11: { best: [2, 6], good: [7, 9], challenging: [4, 8] },
  22: { best: [4, 6], good: [8, 11], challenging: [1, 5] },
  33: { best: [6, 9], good: [3, 11], challenging: [1, 7] },
};

/* ── Career suggestions ── */
const CAREERS: Record<number, string[]> = {
  1: ["起業家", "経営者", "フリーランス", "プロデューサー", "発明家"],
  2: ["カウンセラー", "外交官", "人事", "看護師", "セラピスト"],
  3: ["作家", "デザイナー", "YouTuber", "マーケター", "教師"],
  4: ["エンジニア", "建築家", "公務員", "会計士", "プロジェクトマネージャー"],
  5: ["旅行業", "ジャーナリスト", "営業", "通訳", "イベントプランナー"],
  6: ["インテリアデザイナー", "料理人", "教育者", "医療従事者", "セラピスト"],
  7: ["研究者", "データサイエンティスト", "プログラマー", "哲学者", "心理学者"],
  8: ["投資家", "経営コンサルタント", "不動産", "金融", "弁護士"],
  9: ["NPO代表", "医師", "芸術家", "国際機関", "ボランティア"],
  11: ["スピリチュアルカウンセラー", "アーティスト", "心理学者", "映画監督", "作曲家"],
  22: ["都市計画者", "CEO", "建築家", "政治家", "大規模プロジェクトリーダー"],
  33: ["ヒーラー", "教育者", "宗教家", "慈善活動家", "芸術療法士"],
};

/* ── Number keywords for SEO ── */
const NUMBER_KEYWORDS: Record<number, string> = {
  1: "始まりの力", 2: "直感の泉", 3: "創造の母", 4: "秩序の柱",
  5: "変容の炎", 6: "調和の中心", 7: "探究の光", 8: "豊穣の力",
  9: "完成の器", 11: "直感の門", 22: "王国の創造者", 33: "聖なる教師",
};

const VALID_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];

export default function DestinyNumberPage() {
  const params = useParams();
  const router = useRouter();
  const num = parseInt(params.number as string, 10);

  if (!VALID_NUMBERS.includes(num) || !personalityData[num]) {
    return (
      <main className="min-h-screen bg-[#0C0A14] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#7A7068] mb-4">このページは存在しません</p>
          <a href="/" className="text-[#D4AF37] underline">トップに戻る</a>
        </div>
      </main>
    );
  }

  const profile = personalityData[num];
  const famous = FAMOUS_PEOPLE[num] || [];
  const compat = COMPATIBILITY[num] || { best: [], good: [], challenging: [] };
  const careers = CAREERS[num] || [];
  const keyword = NUMBER_KEYWORDS[num] || "";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#0C0A14] text-[#BEB5A5] selection:bg-[#D4AF37]/30 selection:text-white">
      {/* ── NAV ── */}
      <nav className="w-full bg-[#0C0A14]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="text-xs font-light tracking-[0.25em] text-[#D4AF37]/80 uppercase flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Kabbalah</span>
          </a>
          <a href="/" className="text-[10px] tracking-[0.15em] uppercase text-[#D4AF37] border border-[#D4AF37]/30 px-4 py-1.5 hover:bg-[#D4AF37]/10 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
            Free Reading
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="w-full py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30 flex items-center justify-center">
            <span className="text-4xl font-light text-[#D4AF37]" style={{ fontFamily: '"Noto Serif JP", serif' }}>{num}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl md:text-4xl font-light text-[#F5F0E8] tracking-wider leading-relaxed mb-4" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            運命数{num} — {keyword}
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-lg text-[#D4AF37] tracking-widest mb-3" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            {profile.title}
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-sm text-[#7A7068] tracking-wider max-w-md mx-auto leading-relaxed">
            カバラ数秘術における運命数{num}の性格・才能・相性・適職を徹底解説
          </motion.p>
        </div>
      </section>

      {/* ── LIGHT SIDE ── */}
      <section className="w-full py-16 px-6 bg-[#151221]">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] text-[#D4AF37] tracking-[0.2em] uppercase font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Light Side</p>
              <h2 className="text-lg font-medium text-[#F5F0E8] tracking-wider">{profile.light.label}</h2>
            </div>
          </div>
          <p className="text-sm text-[#BEB5A5] leading-[2.2] tracking-wider">{profile.light.description}</p>
        </div>
      </section>

      {/* ── SHADOW SIDE ── */}
      <section className="w-full py-16 px-6 bg-[#0C0A14]">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#7A7068]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] text-[#7A7068] tracking-[0.2em] uppercase font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Shadow Side</p>
              <h2 className="text-lg font-medium text-[#F5F0E8] tracking-wider">{profile.shadow.label}</h2>
            </div>
          </div>
          <p className="text-sm text-[#BEB5A5] leading-[2.2] tracking-wider">{profile.shadow.description}</p>
        </div>
      </section>

      {/* ── HIDDEN TALENT ── */}
      <section className="w-full py-16 px-6 bg-[#151221]">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] text-[#D4AF37] tracking-[0.2em] uppercase font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Hidden Talent</p>
              <h2 className="text-lg font-medium text-[#F5F0E8] tracking-wider">{profile.talent.label}</h2>
            </div>
          </div>
          <p className="text-sm text-[#BEB5A5] leading-[2.2] tracking-wider">{profile.talent.description}</p>
        </div>
      </section>

      {/* ── FAMOUS PEOPLE ── */}
      <section className="w-full py-16 px-6 bg-[#0C0A14]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-light text-[#F5F0E8] tracking-widest mb-8 text-center" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            運命数{num}の有名人
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {famous.map((person, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-sm p-5 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                  <span className="text-sm text-[#D4AF37]">{person.name[0]}</span>
                </div>
                <p className="text-sm text-[#F5F0E8] tracking-wider mb-1">{person.name}</p>
                <p className="text-[10px] text-[#7A7068] tracking-wider">{person.field}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPATIBILITY ── */}
      <section className="w-full py-16 px-6 bg-[#151221]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-light text-[#F5F0E8] tracking-widest mb-8 text-center" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            運命数{num}の相性
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-[#D4AF37]/20 rounded-sm p-6 text-center">
              <Heart className="w-6 h-6 text-[#D4AF37] mx-auto mb-3" strokeWidth={1.5} />
              <p className="text-xs text-[#D4AF37] tracking-[0.2em] uppercase font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Best Match</p>
              <div className="flex justify-center gap-3">
                {compat.best.map(n => (
                  <a key={n} href={`/destiny/${n}`} className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-sm text-[#D4AF37] hover:bg-[#D4AF37]/30 transition-colors">{n}</a>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-sm p-6 text-center">
              <Users className="w-6 h-6 text-[#BEB5A5] mx-auto mb-3" strokeWidth={1.5} />
              <p className="text-xs text-[#BEB5A5] tracking-[0.2em] uppercase font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Good Match</p>
              <div className="flex justify-center gap-3">
                {compat.good.map(n => (
                  <a key={n} href={`/destiny/${n}`} className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm text-[#BEB5A5] hover:bg-white/15 transition-colors">{n}</a>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-sm p-6 text-center">
              <Shield className="w-6 h-6 text-[#7A7068] mx-auto mb-3" strokeWidth={1.5} />
              <p className="text-xs text-[#7A7068] tracking-[0.2em] uppercase font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Challenging</p>
              <div className="flex justify-center gap-3">
                {compat.challenging.map(n => (
                  <a key={n} href={`/destiny/${n}`} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm text-[#7A7068] hover:bg-white/10 transition-colors">{n}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAREER ── */}
      <section className="w-full py-16 px-6 bg-[#0C0A14]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-light text-[#F5F0E8] tracking-widest mb-8 text-center" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            運命数{num}に向いている職業
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {careers.map((career, i) => (
              <span key={i} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-[#BEB5A5] tracking-wider">
                <Briefcase className="w-3.5 h-3.5 inline mr-2 text-[#D4AF37]" strokeWidth={1.5} />{career}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER NUMBERS NAV ── */}
      <section className="w-full py-16 px-6 bg-[#151221]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-lg font-light text-[#F5F0E8] tracking-widest mb-6" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            他の運命数を見る
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {VALID_NUMBERS.filter(n => n !== num).map(n => (
              <a key={n} href={`/destiny/${n}`}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm text-[#BEB5A5] hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all">
                {n}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full py-24 px-6 bg-[#0C0A14] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-lg mx-auto text-center relative z-10">
          <h2 className="text-2xl font-light text-[#F5F0E8] tracking-widest leading-relaxed mb-4" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            あなたの運命数は{num}ですか？
          </h2>
          <p className="text-sm text-[#7A7068] tracking-wider leading-relaxed mb-8">
            生年月日を入力するだけで、あなたの運命数と<br className="md:hidden" />
            詳細な鑑定書を無料でお届けします。
          </p>
          <a href="/#form"
            className="inline-flex items-center gap-2 px-10 py-4 text-sm tracking-[0.15em] font-bold text-[#0C0A14] rounded-sm transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)' }}>
            ✦ 無料で運命数を調べる
          </a>
          <div className="flex items-center justify-center gap-5 mt-5 text-[10px] text-[#7A7068] tracking-[0.15em]" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-[#D4AF37]/60" />30秒</span>
            <span className="flex items-center gap-1.5"><Lock className="w-3 h-3 text-[#D4AF37]/60" />登録不要</span>
            <span className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-[#D4AF37]/60" />完全無料</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0C0A14] py-10 text-center border-t border-white/5">
        <div className="flex items-center justify-center gap-4 mb-3 flex-wrap px-6">
          <a href="/" className="text-[10px] text-[#7A7068] tracking-wider hover:text-[#D4AF37] transition-colors">トップ</a>
          <span className="text-[#7A7068]/30">|</span>
          {VALID_NUMBERS.map(n => (
            <span key={n}>
              <a href={`/destiny/${n}`} className={`text-[10px] tracking-wider transition-colors ${n === num ? 'text-[#D4AF37]' : 'text-[#7A7068] hover:text-[#D4AF37]'}`}>運命数{n}</a>
              {n !== 33 && <span className="text-[#7A7068]/30 ml-4">|</span>}
            </span>
          ))}
        </div>
        <p className="text-[10px] text-[#7A7068] tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>&copy; 2026 Kabbalah</p>
      </footer>

      {/* ── Global Styles ── */}
      <style dangerouslySetInnerHTML={{
        __html: `@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=Inter:wght@400;600;700&display=swap');`
      }} />
    </main>
  );
}
