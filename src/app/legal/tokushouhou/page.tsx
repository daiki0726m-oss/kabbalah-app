'use client';

import { Sparkles } from 'lucide-react';

export default function TokushouhouPage() {
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

      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-xl font-light text-[#F5F0E8] tracking-widest mb-12 text-center" style={{ fontFamily: '"Noto Serif JP", serif' }}>
          特定商取引法に基づく表記
        </h1>

        <div className="space-y-8 text-sm leading-[2] tracking-wider">
          {[
            { label: '販売事業者', value: '株式会社Life Navigation' },
            { label: '運営統括責任者', value: '森本　大生' },
            { label: '所在地', value: '〒107-0062 東京都港区南青山三丁目1番36号 青山丸竹ビル6階' },
            { label: '電話番号', value: '※お問い合わせはメールにて承ります' },
            { label: 'メールアドレス', value: 'info@life-navigation.co.jp' },
            { label: 'サービス名', value: 'カバラ数秘術 プレミアム鑑定' },
            { label: '販売価格', value: 'スタンダード鑑定: ¥980（税込）/ プレミアム鑑定: ¥2,980（税込）' },
            { label: '商品代金以外の必要料金', value: 'なし' },
            { label: '支払方法', value: 'クレジットカード（VISA, MasterCard, JCB, AMEX）※Stripe社の決済システムを利用' },
            { label: '支払時期', value: 'ご注文時に即時決済' },
            { label: '商品の引渡時期', value: '決済完了後、即時にWebページ上で鑑定書をお届けします（通常20〜40秒）' },
            { label: '返品・キャンセルについて', value: 'デジタルコンテンツという商品の性質上、鑑定書の生成・閲覧後の返品・キャンセルはお受けできません。ただし、鑑定書が正常に生成されなかった場合には全額返金いたします。' },
            { label: '動作環境', value: 'JavaScript対応のWebブラウザ（Chrome, Safari, Firefox, Edge等の最新版を推奨）' },
          ].map((item, i) => (
            <div key={i} className="border-b border-white/5 pb-4">
              <p className="text-[10px] tracking-[0.15em] text-[#D4AF37] uppercase font-bold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{item.label}</p>
              <p className="text-[#BEB5A5]">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
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
