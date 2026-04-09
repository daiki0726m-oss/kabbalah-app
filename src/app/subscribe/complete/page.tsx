'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, Sparkles } from 'lucide-react';

function CompleteContent() {
  const searchParams = useSearchParams();
  const dob = searchParams.get('dob') || '';
  const sessionId = searchParams.get('session_id') || '';
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    // Store membership info
    if (dob) {
      localStorage.setItem('kabbalah_dob', dob);
    }

    // Set membership cookies (30 days)
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);
    const expiryStr = expiry.toISOString();

    document.cookie = `sub_member_id=${sessionId || 'member_' + Date.now()};path=/;max-age=${60 * 60 * 24 * 30};samesite=lax`;
    document.cookie = `sub_member_expiry=${expiryStr};path=/;max-age=${60 * 60 * 24 * 30};samesite=lax`;
    if (dob) {
      document.cookie = `sub_dob=${dob};path=/;max-age=${60 * 60 * 24 * 400};samesite=lax`;
    }

    setStatus('success');

    // Redirect to members page after delay
    setTimeout(() => {
      window.location.href = '/members/daily';
    }, 3000);
  }, [dob, sessionId]);

  return (
    <main className="min-h-screen bg-[#0C0A14] text-[#BEB5A5] flex items-center justify-center">
      <div className="text-center px-6">
        {status === 'loading' && (
          <div className="w-12 h-12 mx-auto border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
        )}
        {status === 'success' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center border border-[#D4AF37]/40">
              <Check className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h1 className="text-xl text-[#F5F0E8] tracking-widest mb-3" style={{ fontFamily: '"Noto Serif JP", serif' }}>登録完了</h1>
            <p className="text-sm text-[#BEB5A5] tracking-wider mb-2">月額メンバーシップへようこそ！</p>
            <p className="text-xs text-[#7A7068] tracking-wider">会員ページに移動します...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <p className="text-sm text-red-400 tracking-wider mb-4">エラーが発生しました</p>
            <a href="/subscribe" className="text-xs text-[#D4AF37] underline">もう一度お試しください</a>
          </>
        )}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=Inter:wght@400;600;700&display=swap');` }} />
    </main>
  );
}

export default function SubscribeCompletePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0C0A14]" />}>
      <CompleteContent />
    </Suspense>
  );
}
