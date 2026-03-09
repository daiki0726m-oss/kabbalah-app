"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Lock, Sparkles, CheckCircle2, TrendingUp, Heart, Briefcase, Calendar, Star, LineChart, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ResultTeaserPage() {
  const searchParams = useSearchParams();
  const rawName = searchParams.get("name") || "あなた";
  const rawDob = searchParams.get("dob") || "1990-01-01";
  const name = decodeURIComponent(rawName);
  const dob = decodeURIComponent(rawDob);

  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, dob }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "決済セッションの作成に失敗しました。");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("通信エラーが発生しました。");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-300 font-serif overflow-x-hidden selection:bg-[#D4AF37] selection:text-white pb-32">
      
      {/* Header */}
      <nav className="w-full max-w-4xl mx-auto px-6 py-8 text-center border-b border-white/5 relative z-10">
        <h1 className="text-xl tracking-[0.3em] text-[#D4AF37]">基本鑑定結果（無料版）</h1>
        <p className="text-xs text-slate-500 mt-3 tracking-widest font-sans">Kabbalah Numerology Initial Report</p>
      </nav>

      {/* Mystical Background Polish */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto mt-12 px-5 relative z-10">
        
        {/* FREE SECTION: The Teaser */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-[#111827]/80 backdrop-blur-sm border border-[#D4AF37]/20 rounded-sm p-8 md:p-14 shadow-2xl mb-16 relative overflow-hidden"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#D4AF37]/30"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#D4AF37]/30"></div>

          <div className="text-center mb-10 pb-10 border-b border-white/5">
            <Sparkles className="text-[#D4AF37] w-8 h-8 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl text-white tracking-widest font-light mb-4">
              {name} 様の基本性質<br className="block sm:hidden"/><span className="text-lg md:text-xl text-[#D4AF37] mt-2 block">（マスターナンバー・ライフパス）</span>
            </h2>
            <p className="text-sm text-slate-400 tracking-wider">カバラ数秘術による第一層の鑑定結果</p>
          </div>
          
          <div className="space-y-6 leading-[2.2] tracking-wider text-[15px] md:text-lg text-slate-300 font-light text-justify md:text-left indent-4 md:indent-0">
            <p>
              生年月日とお名前の音韻から導き出されたあなたのマスターナンバーは、極めて直感力に優れ、人には見えない真理を捉える力を持つ特別な数字です。
            </p>
            <p>
              表向きには周囲との調和を重んじる温和な性質を見せながらも、あなたの心の奥底には「誰にも縛られず、独自の美学を貫きたい」という強い欲求（ソウル・ナンバー）が眠っています。この数年は、その内なる欲求と現実とのギャップに苦しむことが多かったのではないでしょうか。
            </p>
            <p>
              しかし、カバラのバイオリズム方程式によれば、あなたの人生は間もなく<span className="text-[#D4AF37] font-medium tracking-widest">「第一の大きなステージクリア（The Shift）」</span>を迎えます。これまでの苦労が、まったく新しい形で実を結ぶ特異点です。
            </p>
          </div>
        </motion.div>

        {/* PAYWALL SECTION: Showing the Value of the 10,000 character report */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative mt-12"
        >
          {/* Header for Paid Content */}
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl text-white tracking-widest font-light mb-4">
              専門書1冊分（10,000文字）の<br className="block sm:hidden"/>完全版鑑定書でわかること
            </h3>
            <p className="text-sm md:text-base text-slate-400 tracking-wider">
              熟練の鑑定士のみが読み解ける、あなたの人生の「5つの核心」
            </p>
          </div>

          {/* Faked Premium Content Structure (Blurred Background Layer) */}
          <div className="bg-[#111827] border border-white/5 rounded-sm p-8 md:p-12 shadow-2xl relative select-none overflow-hidden">
            
            <div className="blur-[12px] opacity-30 space-y-16 pointer-events-none">
              
              {/* Fake Category 1 */}
              <div>
                <h4 className="text-xl text-white mb-6 border-b border-white/10 pb-4">1. 2026年〜2027年の絶対的運勢バイオリズム</h4>
                {/* Visual Chart Placeholder */}
                <div className="w-full h-32 flex items-end gap-2 border-b border-white/20 pb-2 mb-6">
                  {[20, 40, 30, 60, 80, 50, 90, 100, 70, 85, 95, 110].map((h, i) => (
                    <div key={i} className="flex-1 bg-[#D4AF37] opacity-60 rounded-t-sm" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                <p className="leading-loose text-lg">このグラフが示す通り、あなたの運気は今年の中盤から急激な上昇曲線を描きます。特に秋口の「木星」の影響圏内に入るタイミングで、これまで停滞していた物事が一気に動き出します。この時期に絶対に逃してはいけないサインは...</p>
              </div>

              {/* Fake Category 2 & 3 Grid */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl text-white mb-4">2. 天職と富の引き寄せ</h4>
                  <p className="leading-loose text-lg">あなたのディスティニーナンバーが示す本当の適職は、現状の延長線上にはありません。ゼロから生み出すのではなく、既存の価値を全く違う角度から結びつける仕事。具体的には...</p>
                </div>
                <div>
                  <h4 className="text-xl text-white mb-4">3. 運命の相手と惹かれ合う条件</h4>
                  <p className="leading-loose text-lg">あなたとソウルメイトになる人間の特徴は非常に明確です。過去に出会った○○のようなタイプではなく、全く逆の属性を持つ人物。その人物が現れる時期は正確に言うと...</p>
                </div>
              </div>

            </div>

            {/* Paywall Overlay Panel (The actual CTA) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/90 to-transparent flex flex-col items-center justify-end px-4 sm:px-6 pb-12 pt-32">
              
              <div className="bg-[#111827]/95 backdrop-blur-xl border border-[#D4AF37]/40 p-6 sm:p-10 md:p-12 w-full max-w-2xl text-center shadow-[0_0_50px_rgba(212,175,55,0.1)] rounded-sm transform translate-y-8">
                <Lock className="w-10 h-10 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-xl md:text-2xl text-white tracking-widest font-medium mb-4">
                  ここから先は「完全版鑑定（有料）」です
                </h3>
                <p className="text-sm md:text-[15px] text-slate-300 leading-relaxed mb-10 tracking-wide font-light">
                  カバラ数秘術の全アルゴリズム（姓名数・誕生数・年運数）を結合し、<span className="text-white font-medium">以下のカテゴリー</span>について10,000文字の緻密な鑑定書（PDF）を即座に発行します。
                </p>
                
                {/* Visual List of Paid Contents */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-10 text-left w-full mx-auto">
                  <div className="flex items-start gap-3 bg-white/5 p-4 rounded-sm border border-white/5">
                    <LineChart className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" /> 
                    <div>
                      <span className="text-white text-sm tracking-widest block mb-1">直近3年間の運勢バイオリズム</span>
                      <span className="text-xs text-slate-400 leading-snug block">停滞期と飛躍の時期（2026年〜2028年）の波をグラフ化し、動くべき月を特定。</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-4 rounded-sm border border-white/5">
                    <Briefcase className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" /> 
                    <div>
                      <span className="text-white text-sm tracking-widest block mb-1">適職と財を成す才能</span>
                      <span className="text-xs text-slate-400 leading-snug block">あなたが本当に稼げる環境、避けるべき働き方、隠された才能の活かし方。</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-4 rounded-sm border border-white/5">
                    <Heart className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" /> 
                    <div>
                      <span className="text-white text-sm tracking-widest block mb-1">運命の相手と惹かれ合う時期</span>
                      <span className="text-xs text-slate-400 leading-snug block">ソウルメイトの特徴（容姿・職業・性格）と、二人が出会う強烈なタイミング。</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-4 rounded-sm border border-white/5">
                    <Star className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" /> 
                    <div>
                      <span className="text-white text-sm tracking-widest block mb-1">魂の課題とカルマ</span>
                      <span className="text-xs text-slate-400 leading-snug block">なぜ同じパターンで人間関係につまずくのか。その根本原因と解決策。</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-8">
                  <p className="text-3xl text-white mb-6 font-medium font-sans tracking-wide flex items-center justify-center gap-2">
                    ¥2,980 <span className="text-sm text-slate-500 font-normal mt-2">（税込・一括買取）</span>
                  </p>
                  
                  <button 
                    onClick={handleCheckout}
                    disabled={loading}
                    className="btn-gold w-full py-5 rounded-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] bg-gradient-to-r from-[#B8972E] to-[#D4AF37] text-white font-medium tracking-widest text-lg transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] disabled:opacity-50 disabled:hover:scale-100 flex justify-center items-center"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "完全版鑑定書（10,000文字）を受け取る"
                    )}
                  </button>
                  <p className="mt-5 text-[11px] text-slate-500 tracking-wider font-sans">
                    <ShieldCheck className="w-3 h-3 inline mr-1 -mt-0.5"/>
                    Stripe社による安全なSSL暗号化決済。決済完了後、即座にPDFをダウンロード可能です。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
