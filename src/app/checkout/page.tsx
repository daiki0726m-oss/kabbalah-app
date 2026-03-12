"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import { ShieldCheck, Sparkles } from "lucide-react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "ゲスト";
  const dob = searchParams.get("dob") || "1990-01-01";
  const plan = searchParams.get("plan") || "standard";
  const amount = plan === "premium" ? 2980 : 980;
  const planLabel = plan === "premium" ? "プレミアム鑑定" : "スタンダード鑑定";

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load PAY.JP Checkout script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.pay.jp/";
    script.className = "payjp-button";
    script.setAttribute("data-key", process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY || "pk_test_8ff4badd38c79af98456cbed");
    script.setAttribute("data-text", `¥${amount.toLocaleString()} を支払う`);
    script.setAttribute("data-submit-text", "支払いを確定する");
    script.setAttribute("data-partial", "true");
    script.setAttribute("data-name-placeholder", "カード名義");
    script.onload = () => setScriptLoaded(true);

    if (formRef.current) {
      formRef.current.appendChild(script);
    }

    return () => {
      script.remove();
    };
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError("");

    const tokenInput = formRef.current?.querySelector('input[name="payjp-token"]') as HTMLInputElement;
    if (!tokenInput || !tokenInput.value) {
      setError("カード情報の取得に失敗しました。もう一度お試しください。");
      setProcessing(false);
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, dob, plan, token: tokenInput.value }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "決済に失敗しました。");
        setProcessing(false);
      }
    } catch {
      setError("通信エラーが発生しました。もう一度お試しください。");
      setProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0C0A14] text-[#BEB5A5] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
            <span className="text-xs tracking-[0.25em] text-[#D4AF37]/80 uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>Kabbalah</span>
          </div>
          <h1 className="text-xl font-light text-[#F5F0E8] tracking-widest mb-2" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            {planLabel}
          </h1>
          <p className="text-sm text-[#7A7068] tracking-wider">{name} 様の鑑定書</p>
        </div>

        {/* Price Card */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-sm p-8 mb-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <span className="text-sm text-[#BEB5A5] tracking-wider">{planLabel}</span>
            <span className="text-2xl text-[#F5F0E8] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              ¥{amount.toLocaleString()} <span className="text-[10px] text-[#7A7068] font-normal">（税込）</span>
            </span>
          </div>

          {/* PAY.JP Checkout Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            {/* PAY.JP script will be injected here, creating a button */}
            <div className="flex justify-center py-4">
              {!scriptLoaded && (
                <div className="text-sm text-[#7A7068] tracking-wider animate-pulse">
                  決済フォームを読み込み中...
                </div>
              )}
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400 text-center tracking-wider">
              {error}
            </div>
          )}

          {processing && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#D4AF37] tracking-wider">
              <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
              決済処理中...
            </div>
          )}
        </div>

        {/* Security Badge */}
        <div className="text-center space-y-3">
          <p className="text-[11px] text-[#7A7068] tracking-wider flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3" />安全なSSL暗号化決済
          </p>
          <a href={`/result?name=${encodeURIComponent(name)}&dob=${encodeURIComponent(dob)}`}
            className="text-[11px] text-[#7A7068] tracking-wider hover:text-[#D4AF37] transition-colors">
            ← 鑑定結果に戻る
          </a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=Inter:wght@400;600;700&display=swap');
        .payjp-button { display: block !important; margin: 0 auto !important; }
      `}} />
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0C0A14]" />}>
      <CheckoutContent />
    </Suspense>
  );
}
