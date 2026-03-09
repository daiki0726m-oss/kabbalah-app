"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const steps = [
  { id: "name", title: "お名前を教えて頂けますか。", desc: "鑑定書に記すお名前（よみがな・ニックネーム可）をご入力ください。" },
  { id: "dob", title: "生年月日はいつでしょうか。", desc: "数多の星回りと運命のバイオリズムを正確に算出するために必要です。" },
  { id: "concern", title: "今、最も深く悩んでいることは？", desc: "鑑定士があなたの悩みの核心にフォーカスし、的確な鑑定へと導きます。" }
];

export default function DiagnosePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    concern: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingText, setLoadingText] = useState("運命の軌跡を計算中...");

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      router.push("/");
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // 信頼感を高めるマイクロインタラクション（熟練鑑定士が鑑定しているような演出）
    const texts = [
      "お名前の音韻と生年月日からカバラの数式を展開中...",
      "導き出されたマスターナンバーと過去の膨大なデータを照合中...",
      "あなたの深層心理と宿命のバイオリズムを解読中...",
      "基本鑑定結果の準備が完了しました。"
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < texts.length) {
        setLoadingText(texts[i]);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          // Redirect to the freemium result page instead of showing an alert
          router.push(`/result?name=${encodeURIComponent(formData.name)}`);
        }, 1000);
      }
    }, 1500);
  };

  const isValid = () => {
    if (currentStep === 0) return formData.name.length > 0;
    if (currentStep === 1) return formData.dob.length > 0;
    if (currentStep === 2) return formData.concern.length > 0;
    return false;
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-[#0A0F1C] text-white">
      <div className="z-10 w-full max-w-lg">
        
        {/* Header/Progress */}
        <div className="mb-12 flex items-center justify-between">
          <button onClick={handleBack} disabled={isSubmitting} className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-sm font-serif tracking-widest disabled:opacity-50">
            <ArrowLeft className="w-4 h-4" /> 戻る
          </button>
          
          <div className="flex gap-3">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-0.5 transition-all duration-500 rounded-full ${i === currentStep ? "w-10 bg-[#D4AF37]" : i < currentStep ? "w-10 bg-[#D4AF37]/40" : "w-4 bg-white/10"}`}
              />
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-[#111827] border border-white/5 rounded shadow-2xl p-10 md:p-14 relative overflow-hidden min-h-[420px] flex flex-col justify-center">
          
          <AnimatePresence mode="wait">
            {!isSubmitting ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="mb-12 text-center">
                  <h2 className="text-3xl font-serif mb-6 text-white tracking-wide leading-snug font-light">{steps[currentStep].title}</h2>
                  <p className="text-[15px] text-slate-400 leading-relaxed tracking-wide">{steps[currentStep].desc}</p>
                </div>

                <div className="space-y-6">
                  {currentStep === 0 && (
                    <input
                      type="text"
                      autoFocus
                      placeholder="例: 佐藤、さとう、サトウ"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-5 bg-[#0A0F1C] border-b-2 border-white/10 focus:outline-none focus:border-[#D4AF37] text-white placeholder-slate-600 transition-all font-serif text-xl tracking-widest text-center rounded-t"
                    />
                  )}

                  {currentStep === 1 && (
                    <input
                      type="date"
                      autoFocus
                      value={formData.dob}
                      onChange={(e) => setFormData({...formData, dob: e.target.value})}
                      className="w-full px-4 py-5 bg-[#0A0F1C] border-b-2 border-white/10 focus:outline-none focus:border-[#D4AF37] text-white transition-all font-serif text-xl tracking-widest text-center [&::-webkit-calendar-picker-indicator]:filter-invert rounded-t"
                    />
                  )}

                  {currentStep === 2 && (
                    <div className="grid grid-cols-1 gap-4">
                      {["仕事・適職・今後のキャリア", "恋愛・結婚・運命の相手", "金運・将来の豊かさ", "人生の目的・漠然とした不安"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setFormData({...formData, concern: opt})}
                          className={`px-6 py-5 border transition-all text-center tracking-wide font-serif text-[15px] rounded ${formData.concern === opt ? "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]" : "bg-[#0A0F1C] border-white/10 text-slate-400 hover:border-[#D4AF37]/50 hover:text-white"}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-14">
                  <button
                    onClick={handleNext}
                    disabled={!isValid()}
                    className={`w-full py-5 flex items-center justify-center gap-3 font-serif tracking-widest transition-all rounded ${!isValid() ? "bg-white/5 text-slate-500 cursor-not-allowed border border-white/5" : "btn-gold border border-[#D4AF37]/50 bg-gradient-to-r from-[#B8972E] to-[#D4AF37] text-white"}`}
                  >
                    {currentStep === steps.length - 1 ? (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>無料鑑定を開始する</span>
                      </>
                    ) : (
                      <>
                        <span>次へ進む</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              // 信頼感を醸成するローディングアニメーション
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-10"
              >
                <div className="w-16 h-16 relative">
                  <div className="absolute inset-0 border-t-2 border-[#D4AF37] border-opacity-20 rounded-full"></div>
                  <div className="absolute inset-0 border-t-2 border-[#D4AF37] rounded-full animate-spin"></div>
                  <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-[#D4AF37] animate-pulse" />
                </div>
                <h3 className="mt-8 font-serif text-lg text-white tracking-widest animate-pulse">
                  鑑定士による深層計算中
                </h3>
                <p className="mt-4 text-[15px] text-slate-400 h-6 transition-all tracking-wide">
                  {loadingText}
                </p>
                
                {/* プログレスバー */}
                <div className="w-full h-1 bg-white/5 mt-10 overflow-hidden rounded-full">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "95%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-[#B8972E] to-[#D4AF37]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Secure badge */}
        <div className="mt-8 flex justify-center items-center gap-4 text-[11px] text-slate-500 tracking-widest">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>個人情報保護方針に基づく厳格なデータ管理</span>
          </div>
        </div>

      </div>
    </main>
  );
}
