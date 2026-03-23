'use client';

import { useState } from 'react';
import { Sparkles, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSending(true);
    // Send via mailto link as a simple solution (no backend needed)
    const subject = encodeURIComponent(`【お問い合わせ】${name}様より`);
    const body = encodeURIComponent(`お名前: ${name}\nメールアドレス: ${email}\n\n${message}`);
    window.location.href = `mailto:info@life-navigation.co.jp?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSent(true);
      setSending(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#0C0A14] text-[#BEB5A5] selection:bg-[#D4AF37]/30 selection:text-white">
      <nav className="w-full bg-[#0C0A14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="text-xs font-light tracking-[0.25em] text-[#D4AF37]/80 uppercase flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} /><span>Kabbalah</span>
          </a>
        </div>
      </nav>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <div className="max-w-lg mx-auto px-6 py-16">
        <h1 className="text-xl font-light text-[#F5F0E8] tracking-widest mb-2 text-center" style={{ fontFamily: '"Noto Serif JP", serif' }}>
          お問い合わせ
        </h1>
        <p className="text-xs text-[#7A7068] tracking-wider text-center mb-10">
          ご質問・ご要望がございましたらお気軽にお問い合わせください
        </p>

        {sent ? (
          <div className="text-center py-12">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#D4AF37]/15 flex items-center justify-center border border-[#D4AF37]/30">
              <CheckCircle className="w-7 h-7 text-[#D4AF37]" strokeWidth={1.5} />
            </div>
            <p className="text-sm text-[#F5F0E8] tracking-wider mb-2">メールアプリが開きました</p>
            <p className="text-xs text-[#7A7068] tracking-wider">内容をご確認の上、送信してください。<br/>通常2〜3営業日以内にご返信いたします。</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-[#7A7068] tracking-wider mb-1.5">お名前 <span className="text-[#D4AF37]">*</span></label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                placeholder="例: 山田 太郎"
                className="w-full bg-white/[0.06] border border-white/10 rounded-sm px-4 py-3 text-[#F5F0E8] text-sm tracking-wider placeholder:text-[#7A7068]/50 focus:outline-none focus:border-[#D4AF37]/50" />
            </div>
            <div>
              <label className="block text-xs text-[#7A7068] tracking-wider mb-1.5">メールアドレス <span className="text-[#D4AF37]">*</span></label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                placeholder="例: example@email.com"
                className="w-full bg-white/[0.06] border border-white/10 rounded-sm px-4 py-3 text-[#F5F0E8] text-sm tracking-wider placeholder:text-[#7A7068]/50 focus:outline-none focus:border-[#D4AF37]/50" />
            </div>
            <div>
              <label className="block text-xs text-[#7A7068] tracking-wider mb-1.5">お問い合わせ内容 <span className="text-[#D4AF37]">*</span></label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={5}
                placeholder="お問い合わせ内容をご記入ください"
                className="w-full bg-white/[0.06] border border-white/10 rounded-sm px-4 py-3 text-[#F5F0E8] text-sm tracking-wider placeholder:text-[#7A7068]/50 focus:outline-none focus:border-[#D4AF37]/50 resize-none" />
            </div>
            <button type="submit" disabled={sending}
              className="w-full py-3.5 rounded-sm text-sm tracking-widest text-[#0C0A14] font-bold disabled:opacity-30 flex justify-center items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)' }}>
              {sending ? <div className="w-5 h-5 border-2 border-[#0C0A14] border-t-transparent rounded-full animate-spin" /> : <><Send className="w-4 h-4" />送信する</>}
            </button>
          </form>
        )}

        <div className="mt-8 bg-white/[0.03] border border-white/5 rounded-sm p-5">
          <p className="text-xs text-[#7A7068] tracking-wider leading-relaxed">
            <span className="text-[#D4AF37]">■</span> 運営者: 森本 大生（Mコンサルティング）<br/>
            <span className="text-[#D4AF37]">■</span> メール: info@life-navigation.co.jp<br/>
            <span className="text-[#D4AF37]">■</span> 営業時間: 平日 10:00〜18:00<br/>
            <span className="text-[#D4AF37]">■</span> 返信目安: 2〜3営業日以内
          </p>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-xs text-[#7A7068] tracking-widest hover:text-[#D4AF37] transition-colors">← トップページに戻る</a>
        </div>
      </div>

      <footer className="py-8 text-center border-t border-white/5">
        <p className="text-[10px] text-[#7A7068] tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>&copy; 2026 Kabbalah</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=Inter:wght@400;600;700&display=swap');` }} />
    </main>
  );
}
