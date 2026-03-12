"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BookOpen, Heart, Compass, Sparkles, Users, Star, Clock, Shield, Lock, ArrowRight, Quote } from "lucide-react";
import { motion, useInView } from "framer-motion";

/* ─── Animation Helpers ─── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

export default function KabbalahLP() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("1990");
  const [birthMonth, setBirthMonth] = useState("1");
  const [birthDay, setBirthDay] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [nameCompleted, setNameCompleted] = useState(false);
  const [dobCompleted, setDobCompleted] = useState(false);



  const loadingMessages = ["魂の暗号を受信中...", "運命数を算出中...", "鑑定書を編纂中..."];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);
    setLoadingPhase(0);
    const dob = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;
    // GA4 event
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'generate_lead', { event_category: 'form', event_label: 'free_reading' });
    }
    setTimeout(() => setLoadingPhase(1), 1200);
    setTimeout(() => setLoadingPhase(2), 2400);
    setTimeout(() => { router.push(`/result?name=${encodeURIComponent(name)}&dob=${encodeURIComponent(dob)}`); }, 3600);
  };

  const years = Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - 18 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-[#0C0A14] text-[#BEB5A5] selection:bg-[#D4AF37]/30 selection:text-white">

      {/* ── MYSTICAL LOADING OVERLAY ── */}
      {isSubmitting && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-[#0C0A14] flex flex-col items-center justify-center gap-8">
          {/* Rotating geometry */}
          <div className="relative w-24 h-24">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }} className="absolute inset-0 border border-[#D4AF37]/30 rounded-full"></motion.div>
            <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 12, ease: 'linear' }} className="absolute inset-2 border border-[#D4AF37]/20 rounded-full"></motion.div>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 6, ease: 'linear' }} className="absolute inset-4 border border-[#D4AF37]/40 rounded-full"></motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#D4AF37] animate-pulse" strokeWidth={1.5} />
            </div>
          </div>
          <div className="text-center">
            <motion.p key={loadingPhase} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-sm text-[#D4AF37] tracking-[0.15em]" style={{ fontFamily: '"Noto Serif JP", serif' }}>
              {loadingMessages[loadingPhase]}
            </motion.p>
            <p className="text-[10px] text-[#7A7068] tracking-widest mt-3 uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>{name} 様の鑑定書を準備しています</p>
          </div>
        </motion.div>
      )}

      {/* ── NAV ── */}
      <nav className="w-full fixed top-0 z-50 bg-[#0C0A14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="text-xs font-light tracking-[0.25em] text-[#D4AF37]/80 uppercase flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Kabbalah</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/blog" className="text-[10px] tracking-[0.15em] uppercase text-[#7A7068] hover:text-[#D4AF37] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>Column</a>
            <button onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })} className="text-[10px] tracking-[0.15em] uppercase text-[#D4AF37] border border-[#D4AF37]/30 px-4 py-1.5 hover:bg-[#D4AF37]/10 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
              Free Reading
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════ */}
      {/* ═══ ① HERO — Cosmic Dark FV ═══ */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-24 overflow-hidden">
        <Image src="/images/dark_hero_cosmic.png" alt="" fill priority className="object-cover absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0A14] via-transparent to-[#0C0A14] pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} className="text-[#D4AF37]/70 text-xs tracking-[0.3em] uppercase mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            Kabbalah Numerology
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
            className="text-3xl md:text-5xl font-light text-[#F5F0E8] tracking-wider leading-[1.7] mb-8"
            style={{ fontFamily: '"Noto Serif JP", serif' }}>
            あなたの生年月日には、<br />
            まだ誰も読み解いていない<br className="md:hidden" />
            <span className="text-[#D4AF37]">魂の暗号</span>が<br className="md:hidden" />
            眠っています。
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 0.8 }} className="text-sm text-[#BEB5A5] tracking-widest leading-loose max-w-md mx-auto mb-10">
            4,000年の叡智・カバラ数秘術が、<br className="md:hidden" />
            あなたの「隠された才能」「人生の転機」<br className="md:hidden" />
            「運命の日」を数万文字のレポートで解き明かします。
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.6 }} className="flex flex-col items-center gap-6">
            <button onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-10 py-4 text-sm tracking-[0.15em] font-bold text-[#0C0A14] rounded-sm overflow-hidden transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)' }}>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <span className="relative flex items-center gap-2">✦ 無料で運命を解読する</span>
            </button>

            <div className="flex items-center gap-5 text-[10px] text-[#7A7068] tracking-[0.15em]" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-[#D4AF37]/60" />30秒</span>
              <span className="flex items-center gap-1.5"><Lock className="w-3 h-3 text-[#D4AF37]/60" />登録不要</span>
              <span className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-[#D4AF37]/60" />完全無料</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* ═══ ② WHY KABBALAH — Authority ═══ */}
      {/* ═══════════════════════════════════════════ */}
      <section className="w-full py-24 px-6 bg-[#151221] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <Image src="/images/kabbalah_geometry_bg.png" alt="" fill className="object-cover" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-xs text-[#D4AF37] tracking-[0.25em] uppercase font-bold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Why Kabbalah?</p>
              <h2 className="text-2xl md:text-3xl font-light text-[#F5F0E8] tracking-widest leading-relaxed mb-5" style={{ fontFamily: '"Noto Serif JP", serif' }}>
                星占いでも、タロットでもない。
              </h2>
              <p className="text-sm text-[#7A7068] tracking-widest">
                カバラが「唯一、数学で証明できる占い」である理由
              </p>
            </div>
          </FadeIn>

          {/* History Card */}
          <FadeIn delay={0.1}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-8 md:p-10 mb-12">
              <h3 className="text-base font-medium text-[#F5F0E8] tracking-widest mb-6 text-center" style={{ fontFamily: '"Noto Serif JP", serif' }}>
                カバラ数秘術とは？
              </h3>
              <div className="text-sm text-[#BEB5A5] leading-[2.2] tracking-wider space-y-5">
                <p>カバラ（Kabbalah）── 古代ヘブライ語で<span className="text-[#D4AF37]">「受け取られたもの」</span>。</p>
                <p>紀元前2000年頃、古代ユダヤの神秘思想家たちが「生命の樹（セフィロトの樹）」という宇宙の設計図を体系化。そこから導かれた<span className="text-[#D4AF37]">数字の法則</span>が、カバラ数秘術の根幹です。</p>
                <p>星の配置や偶然のカードに頼る他の占いとは異なり、カバラはあなたの生年月日から導かれる「運命数」を数学的アルゴリズムで算出します。<br /><span className="text-[#7A7068] text-xs">── 占う人によって結果が変わることは、ありません。</span></p>
              </div>
            </div>
          </FadeIn>

          {/* 3 Differentiators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {[
              { icon: <Compass className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />, title: "数学的な正確さ", desc: "感覚や直感に頼らず、\n生年月日を数学的に解析。\n誰が計算しても同じ結果。" },
              { icon: <BookOpen className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />, title: "人生全体の設計図", desc: "「今日の運勢」ではなく、\n才能・天職・人間関係・\n10年先の転機まで俯瞰。" },
              { icon: <ArrowRight className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />, title: "具体的な行動指針", desc: "月ごとのアクションプランを\n仕事・金運・健康・人間関係\n4軸で具体的に提示。" },
            ].map((item, i) => (
              <FadeIn key={i} delay={0.1 * (i + 1)}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-6 text-center h-full">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">{item.icon}</div>
                  <h4 className="text-sm font-medium text-[#F5F0E8] tracking-widest mb-3">{item.title}</h4>
                  <p className="text-xs text-[#7A7068] leading-[2] tracking-wider whitespace-pre-line">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Famous People */}
          <FadeIn>
            <div className="text-center mb-10">
              <h3 className="text-lg font-light text-[#F5F0E8] tracking-widest mb-2" style={{ fontFamily: '"Noto Serif JP", serif' }}>
                歴史上の偉人たちも信じた「数の力」
              </h3>
              <p className="text-xs text-[#7A7068] tracking-widest">カバラと数秘術に導かれた人物たち</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {[
              { initial: "Π", name: "ピタゴラス", era: "古代ギリシャの数学者 / 紀元前570年", quote: "「万物は数なり」", desc: "数秘術の父。宇宙のすべてを数で説明できると提唱。" },
              { initial: "T", name: "ニコラ・テスラ", era: "発明家・物理学者 / 1856-1943", quote: "「3, 6, 9の偉大さを知れば、宇宙の鍵を手にするだろう」", desc: "数字に異常な執着を持ち、部屋番号も3で割れる数しか選ばなかった。" },
              { initial: "M", name: "マドンナ", era: "歌手・プロデューサー / 1958-", quote: "「カバラは私の人生のあらゆる判断の指針になっている」", desc: "90年代後半からカバラを熱心に学び、人生の重要な決断に活用。" },
              { initial: "L", name: "レオナルド・ダ・ヴィンチ", era: "芸術家・科学者 / 1452-1519", quote: "「数の比率の中に、宇宙の美しさが隠されている」", desc: "黄金比（1:1.618）に執着し、数の神秘が美と真理を貫くと信じた。" },
            ].map((p, i) => (
              <FadeIn key={i} delay={0.08 * (i + 1)}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-6">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex-shrink-0 flex items-center justify-center text-[#D4AF37] text-sm font-serif">{p.initial}</div>
                    <div>
                      <p className="text-sm font-medium text-[#F5F0E8] tracking-wider">{p.name}</p>
                      <p className="text-[10px] text-[#7A7068] tracking-widest">{p.era}</p>
                    </div>
                  </div>
                  <blockquote className="pl-4 border-l-2 border-[#D4AF37]/30 mb-3">
                    <p className="text-sm text-[#BEB5A5] leading-[2] tracking-wider italic">{p.quote}</p>
                  </blockquote>
                  <p className="text-xs text-[#7A7068] leading-[1.9] tracking-wider">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* ═══ ③ REPORT CONTENTS — Darkest ═══ */}
      {/* ═══════════════════════════════════════════ */}
      <section className="w-full py-24 px-6 bg-[#0C0A14] relative">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-xs text-[#D4AF37] tracking-[0.25em] uppercase font-bold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>What You Will Receive</p>
              <h2 className="text-2xl md:text-3xl font-light text-[#F5F0E8] tracking-widest leading-relaxed mb-4" style={{ fontFamily: '"Noto Serif JP", serif' }}>
                生年月日だけで、<br className="md:hidden" />
                ここまで解き明かされます。
              </h2>
              <p className="text-sm text-[#7A7068] tracking-widest">名前と生年月日だけで、数万文字の鑑定書をお届けします</p>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {[
              { icon: <Heart className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />, chapter: "第一章", title: "運命数が示す「魂の設計図」", desc: "光の性質（才能）・影の性質（無意識のブレーキ）・隠された才能を詳細に読み解きます。" },
              { icon: <Compass className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />, chapter: "第二章", title: "10年間の人生バイオリズム", desc: "2026〜2035年の運勢の波をグラフで可視化。人生の「黄金期」がいつ訪れるかを特定します。" },
              { icon: <BookOpen className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />, chapter: "第三章", title: "今年のあなた ─ 12ヶ月の行動指針", desc: "仕事・金運・健康・対人関係の4軸で、毎月のアクションプランを具体的に解説します。" },
              { icon: <Sparkles className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />, chapter: "第四章", title: "運命の転機 ─ 人生を変える1日", desc: "カバラが示す「最も重要な日」を特定し、その日の行動指針をお伝えします。" },
            ].map((item, i) => (
              <FadeIn key={i} delay={0.08 * (i + 1)}>
                <div className="bg-white/[0.03] backdrop-blur-sm p-6 md:p-8 rounded-sm border border-white/[0.06] flex flex-col md:flex-row gap-5 items-start md:items-center">
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex-shrink-0 flex items-center justify-center border border-[#D4AF37]/20">{item.icon}</div>
                  <div>
                    <p className="text-[10px] text-[#D4AF37] tracking-[0.2em] uppercase font-bold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{item.chapter}</p>
                    <h3 className="text-base font-medium text-[#F5F0E8] mb-2 tracking-wider">{item.title}</h3>
                    <p className="text-sm text-[#7A7068] leading-relaxed tracking-wider">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-10 text-center">
              <button onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-sm text-[#D4AF37] tracking-widest transition-colors border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 px-6 py-3 rounded-sm">
                <Sparkles className="w-4 h-4" strokeWidth={1.5} />あなたの運命数を確認する
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* ═══ ④ SAMPLE PREVIEW ═══ */}
      {/* ═══════════════════════════════════════════ */}
      <section className="w-full py-24 px-6 bg-[#1A150E]">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-light text-[#F5F0E8] tracking-widest mb-4" style={{ fontFamily: '"Noto Serif JP", serif' }}>
                これはある方の鑑定書の、<br className="md:hidden" />ほんの一部です。
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-sm p-8 md:p-12 relative overflow-hidden" style={{ minHeight: '480px' }}>
              <div className="mb-4">
                <p className="text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase font-bold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Chapter 1: 魂の設計図</p>
                <p className="text-sm text-[#BEB5A5] leading-[2.2] tracking-wider">
                  あなたが生まれ持った運命数は、「自由」と「冒険」を司る数字です。幼い頃から「なぜ？」「もっと知りたい」という好奇心が人一倍強く、同年代の子どもたちが遊んでいる間も、一人で本を読んだり、知らない場所を探検したりすることに夢中だったのではないでしょうか。
                </p>
              </div>
              <div className="mt-4 space-y-4 select-none" style={{ filter: 'blur(4px)' }}>
                <p className="text-sm text-[#BEB5A5] leading-[2.2] tracking-wider">
                  その本質は大人になった今も変わりません。安定した環境よりも変化に富んだ環境を好み、一箇所に留まることに焦りを感じます。それは弱さではありません。あなたの魂が「もっと広い世界」を求めているサインなのです。
                </p>
                <p className="text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Chapter 2: 10年間の人生バイオリズム</p>
                <p className="text-sm text-[#BEB5A5] leading-[2.2] tracking-wider">
                  今後10年間、あなたの人生は大きな波を描きます。直近の数年間にかけて、パーソナルイヤーが示す「収穫のサイクル」に入ります。この時期に蓄えた種が…
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#1A150E] via-[#1A150E]/95 to-transparent flex items-end justify-center pb-8">
                <button onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 text-sm tracking-[0.15em] font-bold text-[#0C0A14] rounded-sm"
                  style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)' }}>
                  ✦ あなた専用の鑑定書を読む
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* ═══ ⑤ TESTIMONIALS ═══ */}
      {/* ═══════════════════════════════════════════ */}
      <section className="w-full py-24 px-6 bg-[#151221]">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-3xl font-light text-[#F5F0E8] tracking-widest mb-4" style={{ fontFamily: '"Noto Serif JP", serif' }}>
                鑑定書を受け取った方の声
            </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { initials: "Y.S", name: "Y.S さん", meta: "34歳 / 会社員", review: "自分のことがここまで正確に描かれていて、読みながら涙が止まりませんでした。特に「影の性質」の部分は、ずっと誰にも言えなかった本音をそのまま言い当てられたような感覚でした。" },
              { initials: "M.K", name: "M.K さん", meta: "31歳 / 会社員", review: "転職すべきかずっと悩んでいましたが、鑑定書の内容がまさに今の自分の状況そのもの。背中を押してもらえました。今は新しい職場で充実しています。" },
              { initials: "A.T", name: "A.T さん", meta: "37歳 / 主婦", review: "友人に勧められて半信半疑で試しましたが、読み終わった瞬間に友人にも勧めていました。数万文字の鑑定書は、市販の占い本とは比べ物にならない深さです。" },
            ].map((t, i) => (
              <FadeIn key={i} delay={0.1 * (i + 1)}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-6 md:p-8 relative">
                  <Quote className="w-8 h-8 text-[#D4AF37]/20 absolute top-4 right-4" strokeWidth={1} />
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />)}
                  </div>
                  <p className="text-sm text-[#BEB5A5] leading-[2] tracking-wider mb-6">{t.review}</p>
                  <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="w-9 h-9 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-xs text-[#D4AF37]">{t.initials}</div>
                    <div>
                      <p className="text-sm text-[#F5F0E8] tracking-wider">{t.name}</p>
                      <p className="text-[10px] text-[#7A7068] tracking-widest">{t.meta}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* ═══ ⑥ FORM — Ritualized CTA ═══ */}
      {/* ═══════════════════════════════════════════ */}
      <section id="form" className="w-full py-28 px-6 bg-[#0C0A14] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <Image src="/images/kabbalah_geometry_bg.png" alt="" fill className="object-cover" />
        </div>

        <div className="max-w-md mx-auto relative z-10">
          <FadeIn>
            <div className="flex items-center justify-center gap-2 mb-8 text-xs text-[#7A7068] tracking-widest">
              <Shield className="w-4 h-4 text-[#D4AF37]/60" />
              お一人ずつ<span className="text-[#F5F0E8] font-medium">専用の鑑定書</span>をお作りします
            </div>

            <div className="text-center mb-10">
              <h2 className="text-xl md:text-2xl font-light text-[#F5F0E8] tracking-widest leading-relaxed mb-4" style={{ fontFamily: '"Noto Serif JP", serif' }}>
                あなたの「魂の暗号」を<br />
                解読する準備ができました。
              </h2>
              <p className="text-sm text-[#7A7068] tracking-widest">
                必要なのは、お名前と生年月日だけです。
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-sm p-8 md:p-10 shadow-[0_0_60px_-15px_rgba(212,175,55,0.1)]">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-xs tracking-widest text-[#7A7068]">お名前 <span className="text-[#D4AF37]">*</span></label>
                  <input type="text" value={name}
                    onChange={(e) => { setName(e.target.value); setNameCompleted(e.target.value.trim().length > 0); }}
                    placeholder="ニックネーム可"
                    className={`w-full bg-white/5 border ${nameCompleted ? 'border-[#D4AF37]/50' : 'border-white/10'} p-4 text-base text-[#F5F0E8] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-all rounded-sm placeholder-[#7A7068]/50`}
                    required />
                  {nameCompleted && <p className="text-[10px] text-[#D4AF37]/60 tracking-widest animate-pulse">あなたの名前のエネルギーを受け取りました</p>}
                </div>

                {/* DOB */}
                <div className="space-y-2">
                  <label className="block text-xs tracking-widest text-[#7A7068]">生年月日 <span className="text-[#D4AF37]">*</span></label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: birthYear, setter: setBirthYear, options: years, label: "年" },
                      { value: birthMonth, setter: setBirthMonth, options: months, label: "月" },
                      { value: birthDay, setter: setBirthDay, options: days, label: "日" },
                    ].map((field, i) => (
                      <div key={i} className="relative">
                        <select value={field.value}
                          onChange={(e) => { field.setter(e.target.value); if (i === 2) setDobCompleted(true); }}
                          className={`w-full bg-white/5 border ${dobCompleted ? 'border-[#D4AF37]/50' : 'border-white/10'} p-4 text-sm text-[#F5F0E8] appearance-none focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-all cursor-pointer rounded-sm`}>
                          {field.options.map(v => <option key={v} value={v} className="bg-[#151221] text-[#F5F0E8]">{v}</option>)}
                        </select>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7A7068] pointer-events-none">{field.label}</span>
                      </div>
                    ))}
                  </div>
                  {dobCompleted && <p className="text-[10px] text-[#D4AF37]/60 tracking-widest animate-pulse">運命数の解析準備が整いました</p>}
                </div>

                {/* Submit */}
                <button type="submit" disabled={isSubmitting || !name}
                  className="w-full py-5 text-sm tracking-[0.15em] font-bold text-[#0C0A14] rounded-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all relative overflow-hidden group"
                  style={{ background: isSubmitting ? '#8B7535' : 'linear-gradient(135deg, #D4AF37, #F5D76E)', boxShadow: !isSubmitting && name ? '0 0 30px rgba(212,175,55,0.25)' : 'none' }}>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  <span className="relative">
                    {isSubmitting ? "魂の暗号を解読しています..." : "✦ 運命の扉を開く"}
                  </span>
                </button>
              </form>

              <p className="text-center text-[10px] text-[#7A7068] mt-5 tracking-widest leading-relaxed">
                ※30秒で完了。登録は一切不要です。<br />
                ※鑑定以外の目的での使用は一切ありません。
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0C0A14] py-10 pb-24 md:pb-10 text-center border-t border-white/5">
        <div className="flex items-center justify-center gap-4 mb-3">
          <a href="/legal/tokushouhou" className="text-[10px] text-[#7A7068] tracking-wider hover:text-[#D4AF37] transition-colors">特定商取引法に基づく表記</a>
          <span className="text-[#7A7068]/30">|</span>
          <a href="/legal/privacy" className="text-[10px] text-[#7A7068] tracking-wider hover:text-[#D4AF37] transition-colors">プライバシーポリシー</a>
          <span className="text-[#7A7068]/30">|</span>
          <a href="/legal/terms" className="text-[10px] text-[#7A7068] tracking-wider hover:text-[#D4AF37] transition-colors">利用規約</a>
          <span className="text-[#7A7068]/30">|</span>
          <a href="/blog" className="text-[10px] text-[#7A7068] tracking-wider hover:text-[#D4AF37] transition-colors">コラム</a>
        </div>
        <p className="text-[10px] text-[#7A7068] tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>&copy; 2026 Kabbalah</p>
      </footer>

      {/* ── STICKY CTA (Mobile) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0C0A14]/95 backdrop-blur-xl border-t border-white/5 p-3">
        <button onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full py-3.5 text-sm tracking-[0.12em] font-bold text-[#0C0A14] rounded-sm"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)', boxShadow: '0 0 20px rgba(212,175,55,0.2)' }}>
          ✦ あなたの運命数を知る
        </button>
      </div>

      {/* ── Global Styles ── */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=Noto+Sans+JP:wght@300;400;500&family=Inter:wght@400;600;700&display=swap');
      `}} />
    </main>
  );
}
