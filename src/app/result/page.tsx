"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Lock, Sparkles, Heart, Briefcase, Star, LineChart, ShieldCheck, Compass, Feather, CalendarDays, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

function ResultTeaserContent() {
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
    <main className="min-h-screen bg-[#FDFBF7] text-[#4A4036] font-serif overflow-x-hidden selection:bg-[#E5D3B3] selection:text-[#4A4036]">
      
      {/* Top Navigation */}
      <nav className="w-full bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EAE3D9]">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="text-sm font-light tracking-widest text-[#4A4036] flex items-center gap-2">
            <Feather className="w-4 h-4 text-[#CFA770]" strokeWidth={1.5} />
            <span>Kabbalah 鑑定室</span>
          </div>
          <span className="text-[10px] tracking-[0.15em] text-[#8A7A6A] font-sans">基本鑑定結果</span>
        </div>
      </nav>

      {/* Gold Ribbon */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>

      <div className="max-w-3xl mx-auto px-5 pb-32">
        
        {/* FREE SECTION: The Teaser */}
        <motion.section 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12"
        >
          {/* Cover Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-5">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#FAF8F5]">
                <Compass className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase font-sans font-bold mb-4">Initial Report</h2>
            <h1 className="text-2xl md:text-3xl font-medium text-[#2C241B] tracking-widest leading-relaxed mb-3">
              {name} 様の基本性質
            </h1>
            <p className="text-sm text-[#8A7A6A] tracking-wider">カバラ数秘術による第一層の鑑定結果</p>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#EAE3D9]"></div>
            <Sparkles className="w-4 h-4 text-[#CFA770]" strokeWidth={1.5} />
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#EAE3D9]"></div>
          </div>

          {/* Teaser Body Text */}
          <div className="bg-white border border-[#EAE3D9] rounded-sm p-8 md:p-12 shadow-sm relative overflow-hidden">
            {/* Decorative Corner */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#D4AF37]/20"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#D4AF37]/20"></div>
            
            <div className="space-y-6 leading-[2.2] tracking-wider text-[14px] md:text-[15px] text-[#3A332C] font-medium text-justify">
              <p>
                生年月日とお名前の音韻から導き出されたあなたのマスターナンバーは、極めて直感力に優れ、人には見えない真理を捉える力を持つ特別な数字です。
              </p>
              <p>
                表向きには周囲との調和を重んじる温和な性質を見せながらも、あなたの心の奥底には「誰にも縛られず、独自の美学を貫きたい」という強い欲求（ソウル・ナンバー）が眠っています。この数年は、その内なる欲求と現実とのギャップに苦しむことが多かったのではないでしょうか。
              </p>
              <p>
                しかし、カバラのバイオリズム方程式によれば、あなたの人生は間もなく<span className="text-[#A51C1C] font-bold" style={{ background: 'linear-gradient(to top, rgba(212, 175, 55, 0.2) 0%, transparent 100%)', padding: '0 2px' }}>「第一の大きなステージクリア（The Shift）」</span>を迎えます。これまでの苦労が、まったく新しい形で実を結ぶ特異点です。
              </p>
            </div>

            {/* Fade out at the bottom to suggest more content */}
            <div className="mt-8 pt-8 border-t border-dashed border-[#EAE3D9] text-center">
              <p className="text-xs text-[#8A7A6A] tracking-widest leading-relaxed">
                ここまでが無料でご覧いただける鑑定結果の範囲です。<br />
                この先にある「人生の核心」をお読みになりたい方は、以下をご確認ください。
              </p>
            </div>
          </div>
        </motion.section>

        {/* PAYWALL SECTION */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h3 className="text-xl md:text-2xl font-light text-[#2C241B] tracking-widest mb-3">
              完全版鑑定書でわかること
            </h3>
            <p className="text-sm text-[#8A7A6A] tracking-widest">
              熟練の鑑定士があなただけに綴る、10,000文字の深い洞察
            </p>
          </div>

          {/* Blurred Preview + CTA Card */}
          <div className="bg-white border border-[#EAE3D9] rounded-sm shadow-sm relative select-none overflow-hidden">
            
            {/* Blurred fake content to show volume/value */}
            <div className="blur-[10px] opacity-20 space-y-12 p-8 md:p-12 pointer-events-none">
              <div>
                <h4 className="text-lg text-[#2C241B] mb-4 border-b border-[#EAE3D9] pb-3">1. 2026年〜2027年の運勢バイオリズム</h4>
                <div className="w-full h-28 flex items-end gap-2 border-b border-[#EAE3D9] pb-2 mb-4">
                  {[20, 40, 30, 60, 80, 50, 90, 100, 70, 85, 95, 110].map((h, i) => (
                    <div key={i} className="flex-1 bg-[#CFA770] rounded-t-sm" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                <p className="leading-loose">このグラフが示す通り、あなたの運気は今年の中盤から急激な上昇曲線を描きます。特に秋口の「木星」の影響圏内に入るタイミングで、これまで停滞していた物事が一気に動き出します…</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg text-[#2C241B] mb-3">2. 天職と富の引き寄せ</h4>
                  <p className="leading-loose">あなたのディスティニーナンバーが示す本当の適職は、現状の延長線上にはありません。具体的には…</p>
                </div>
                <div>
                  <h4 className="text-lg text-[#2C241B] mb-3">3. 運命の相手と惹かれ合う条件</h4>
                  <p className="leading-loose">あなたとソウルメイトになる人間の特徴は非常に明確です。その人物が現れる時期は…</p>
                </div>
              </div>
            </div>

            {/* Paywall Overlay (The actual CTA) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/95 to-[#FDFBF7]/60 flex flex-col items-center justify-end px-4 sm:px-6 pb-10 pt-20">
              
              <div className="bg-white border border-[#EAE3D9] p-6 sm:p-10 md:p-12 w-full max-w-2xl text-center shadow-[0_4px_30px_rgba(0,0,0,0.06)] rounded-sm">
                <div className="w-14 h-14 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#FAF8F5] mx-auto mb-6">
                  <Lock className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg md:text-xl text-[#2C241B] tracking-widest font-medium mb-3">
                  ここから先は「完全版鑑定」です
                </h3>
                <p className="text-sm text-[#6A5A4A] leading-relaxed mb-8 tracking-wide font-light max-w-md mx-auto">
                  カバラ数秘術の全アルゴリズムを結合し、以下のカテゴリーについて10,000文字の緻密な鑑定書を即座に発行します。
                </p>
                
                {/* Visual List of Paid Contents */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left w-full mx-auto">
                  <div className="flex items-start gap-3 bg-[#FAF8F5] p-4 rounded-sm border border-[#EAE3D9]">
                    <LineChart className="w-5 h-5 text-[#CFA770] shrink-0 mt-0.5" strokeWidth={1.5} /> 
                    <div>
                      <span className="text-[#2C241B] text-sm tracking-widest block mb-1 font-medium">運勢バイオリズム</span>
                      <span className="text-xs text-[#8A7A6A] leading-snug block">10年＋12ヶ月のグラフで動くべき時期を特定</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-[#FAF8F5] p-4 rounded-sm border border-[#EAE3D9]">
                    <Briefcase className="w-5 h-5 text-[#CFA770] shrink-0 mt-0.5" strokeWidth={1.5} /> 
                    <div>
                      <span className="text-[#2C241B] text-sm tracking-widest block mb-1 font-medium">適職と財を成す才能</span>
                      <span className="text-xs text-[#8A7A6A] leading-snug block">本当に稼げる環境と隠された才能の活かし方</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-[#FAF8F5] p-4 rounded-sm border border-[#EAE3D9]">
                    <Heart className="w-5 h-5 text-[#CFA770] shrink-0 mt-0.5" strokeWidth={1.5} /> 
                    <div>
                      <span className="text-[#2C241B] text-sm tracking-widest block mb-1 font-medium">運命の相手と出会う時期</span>
                      <span className="text-xs text-[#8A7A6A] leading-snug block">ソウルメイトの特徴と出会いの強烈なタイミング</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-[#FAF8F5] p-4 rounded-sm border border-[#EAE3D9]">
                    <Star className="w-5 h-5 text-[#CFA770] shrink-0 mt-0.5" strokeWidth={1.5} /> 
                    <div>
                      <span className="text-[#2C241B] text-sm tracking-widest block mb-1 font-medium">魂の課題とカルマ</span>
                      <span className="text-xs text-[#8A7A6A] leading-snug block">同じ失敗パターンの根本原因と解決策</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#EAE3D9] pt-6">
                  <p className="text-2xl md:text-3xl text-[#2C241B] mb-5 font-medium font-sans tracking-wide flex items-center justify-center gap-2">
                    ¥980 <span className="text-xs text-[#8A7A6A] font-normal mt-1">（税込・一括買取）</span>
                  </p>
                  
                  <button 
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full py-4 rounded-sm shadow-md bg-[#CFA770] hover:bg-[#B69260] text-white font-medium tracking-widest text-base transition-all disabled:bg-[#EAE3D9] disabled:cursor-not-allowed flex justify-center items-center"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "完全版鑑定書を受け取る"
                    )}
                  </button>
                  <p className="mt-4 text-[11px] text-[#8A7A6A] tracking-wider font-sans flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3 inline -mt-0.5"/>
                    Stripe社による安全なSSL暗号化決済
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="bg-[#FAF4EA] py-8 text-center border-t border-[#EAE3D9]">
        <div className="text-[10px] text-[#8A7A6A] tracking-[0.2em] font-sans uppercase">
          &copy; 2026 Kabbalah 鑑定室
        </div>
      </footer>
    </main>
  );
}

export default function ResultTeaserPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFBF7]" />}>
      <ResultTeaserContent />
    </Suspense>
  );
}
