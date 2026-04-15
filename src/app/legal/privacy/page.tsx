'use client';

import { Sparkles } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          プライバシーポリシー
        </h1>

        <div className="space-y-10 text-sm leading-[2] tracking-wider">
          {[
            { title: '1. 個人情報の取得', content: '当サービスでは、カバラ数秘術の鑑定を行うために以下の情報を取得いたします。\n・お名前（ニックネーム可）\n・生年月日\n・決済に必要なクレジットカード情報（KOMOJU社が管理。当社は保持しません）' },
            { title: '2. 個人情報の利用目的', content: '取得した個人情報は、以下の目的のために利用いたします。\n・カバラ数秘術に基づく鑑定書の生成\n・サービスの提供・運営\n・お問い合わせへの対応\n・サービスの改善・新機能の開発' },
            { title: '3. 個人情報の第三者提供', content: '当サービスでは、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。' },
            { title: '4. 外部サービスの利用', content: '当サービスでは、以下の外部サービスを利用しています。\n・KOMOJU（決済処理）\n・Google Gemini API（鑑定書テキストの生成）\n・Vercel（ホスティング）\n各サービスの利用規約・プライバシーポリシーについては、各サービスの公式サイトをご確認ください。' },
            { title: '5. Cookie（クッキー）の利用', content: '当サービスでは、サービスの利便性向上およびアクセス解析のためにCookieを使用する場合があります。Cookieの利用を望まない場合は、ブラウザの設定により無効にすることができます。' },
            { title: '6. セキュリティ', content: '当サービスでは、個人情報の漏洩、滅失、き損等を防止するため、適切なセキュリティ対策を講じています。決済情報はPCI DSS準拠のインフラで処理され、当社サーバーに保存されることはありません。' },
            { title: '7. AI出力の管理・制御について', content: '当サービスでは、鑑定書の生成にAI（Google Gemini API）を利用しています。AI出力の品質と安全性を確保するため、以下の対策を実施しています。\n\n・プロンプト制御：AIへの指示内容を事前に設計し、占星術・数秘術の範囲内でのみ回答を生成するよう制限しています。\n・出力フィルタリング：医療・法律・金融等の専門的助言、差別的表現、有害コンテンツの生成を禁止するプロンプトガードを設定しています。\n・免責表示：すべての鑑定結果ページに「本サービスはエンタテインメント目的であり、科学的・医学的根拠に基づくものではありません」と明示しています。\n・定期的な品質確認：生成されるコンテンツの品質を定期的に確認し、不適切な出力がないかモニタリングしています。' },
            { title: '8. ユーザー入力データの保管・削除について', content: '当サービスでは、プライバシーを最大限尊重する設計方針を採用しています。\n\n【サーバー側に保管するデータ】\n・なし。ユーザーが入力した氏名・生年月日は、鑑定書生成のためにリアルタイムで処理され、サーバー上に永続的に保管されることはありません。\n\n【ブラウザ（クライアント側）に保存されるデータ】\n・生年月日（LocalStorage）：ユーザーの利便性のためにブラウザ内に保存されます。ブラウザの設定からいつでも削除可能です。\n・会員識別ID（Cookie）：30日間メンバーシップご利用時に決済サービスとの連携に使用します。有効期間は30日間です。\n\n【AI対話ログ】\n・AIへの入力内容および出力結果は、当社サーバーには保存しておりません。\n・外部AIサービス（Google Gemini API）側でのデータ取り扱いについては、Google社のプライバシーポリシーに準じます。\n\n【データ削除の方法】\n・ブラウザのLocalStorageおよびCookieを削除することで、端末上のすべてのデータを消去できます。\n・その他のデータ削除のご要望は、お問い合わせ窓口（info@life-navigation.co.jp）までご連絡ください。' },
            { title: '9. 苦情対応体制', content: '当サービスに関する苦情・ご意見は、以下の窓口で受け付けております。\n\n・苦情窓口：Mコンサルティング カスタマーサポート\n・担当者：森本 大生（代表）\n・メール：info@life-navigation.co.jp\n・お問い合わせフォーム：https://kabbalah-app-ruddy.vercel.app/contact\n・対応時間：平日 10:00〜18:00\n・回答目安：2〜3営業日以内\n\n苦情を受け付けた場合は、内容を確認のうえ、速やかに対応いたします。\n必要に応じて、サービスの改善措置を講じます。' },
            { title: '10. お問い合わせ', content: '個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。\nメール: info@life-navigation.co.jp\nお問い合わせフォーム: https://kabbalah-app-ruddy.vercel.app/contact' },
            { title: '11. ポリシーの変更', content: '当社は、必要に応じて本ポリシーを変更することがあります。変更した場合は、当サイト上でお知らせいたします。\n\n制定日: 2026年3月11日\n改定日: 2026年4月1日' },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="text-sm font-medium text-[#F5F0E8] tracking-widest mb-3" style={{ fontFamily: '"Noto Serif JP", serif' }}>{section.title}</h2>
              <p className="text-[#BEB5A5] whitespace-pre-line">{section.content}</p>
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
