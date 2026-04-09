"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { ShieldCheck, Sparkles } from "lucide-react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'komoju-fields': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'session-id'?: string;
        'publishable-key'?: string;
        'payment-type'?: string;
        locale?: string;
      }, HTMLElement>;
    }
  }
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "ゲスト";
  const dob = searchParams.get("dob") || "1990-01-01";
  const plan = searchParams.get("plan") || "standard";
  const amount = plan === "premium" ? 2980 : 980;
  const planLabel = plan === "premium" ? "プレミアム鑑定" : "スタンダード鑑定";

  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load KOMOJU fields script
    if (!document.querySelector('script[src*="multipay.komoju.com"]')) {
      const script = document.createElement("script");
      script.src = "https://multipay.komoju.com/fields.js";
      script.type = "module";
      document.head.appendChild(script);
    }

    // Create session
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, dob, plan }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.sessionId) {
          setSessionId(data.sessionId);
        } else {
          setError(data.error || "セッションの作成に失敗しました。");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("通信エラーが発生しました。");
        setLoading(false);
      });
  }, [name, dob, plan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fields = document.querySelector('komoju-fields');
    if (fields && 'submit' in fields && typeof (fields as any).submit === 'function') {
      (fields as any).submit();
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

          {loading && (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-[#7A7068] tracking-wider">
              <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
              決済フォームを準備中...
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400 text-center tracking-wider">
              {error}
            </div>
          )}

          {sessionId && (
            <form onSubmit={handleSubmit}>
              <komoju-fields
                session-id={sessionId}
                publishable-key={process.env.NEXT_PUBLIC_KOMOJU_PUBLISHABLE_KEY || ''}
                payment-type="credit_card"
                locale="ja"
              />
              <button
                type="submit"
                className="w-full py-4 rounded-sm font-bold tracking-widest text-sm transition-all text-[#0C0A14] mt-6"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)', boxShadow: '0 0 20px rgba(212,175,55,0.3)' }}
              >
                ¥{amount.toLocaleString()} を支払う
              </button>
            </form>
          )}
        </div>

        {/* Security Badge */}
        <div className="text-center space-y-3">
          <p className="text-[11px] text-[#7A7068] tracking-wider flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3" />安全なSSL暗号化決済（KOMOJU）
          </p>
          <a href={`/result?name=${encodeURIComponent(name)}&dob=${encodeURIComponent(dob)}`}
            className="text-[11px] text-[#7A7068] tracking-wider hover:text-[#D4AF37] transition-colors">
            ← 鑑定結果に戻る
          </a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=Inter:wght@400;600;700&display=swap');
        komoju-fields { display: block; }
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
