'use client';

import { Sparkles } from 'lucide-react';

export default function TermsOfServicePage() {
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
          利用規約
        </h1>

        <div className="space-y-10 text-sm leading-[2] tracking-wider">
          {[
            { title: '第1条（適用）', content: '本規約は、当サービス「カバラ数秘術 運命鑑定」（以下「本サービス」）の利用に関する条件を定めるものです。本サービスを利用するすべてのお客様（以下「ユーザー」）は、本規約に同意したものとみなされます。' },
            { title: '第2条（サービスの内容）', content: '本サービスは、カバラ数秘術の理論に基づき、ユーザーが入力した生年月日等の情報をもとに、性格分析・運勢・行動指針等を記載したデジタル鑑定書（以下「鑑定書」）を生成・提供するエンタテインメントサービスです。\n\n鑑定書の内容はAI（人工知能）により生成されるものであり、科学的・医学的根拠に基づくものではありません。人生における重要な判断の唯一の根拠として使用することは推奨いたしません。' },
            { title: '第3条（料金・決済）', content: '本サービスの料金体系は以下のとおりです。\n\n【都度課金プラン】\n・スタンダード鑑定：980円（税込）\n・プレミアム鑑定：2,980円（税込）\n\n【月額プラン】\n・月額メンバーシップ：480円（税込・月額）\n　└ デイリー運勢配信、相性診断無制限、月間レポート\n\n月額プランは毎月自動更新となり、解約はいつでも可能です。解約後も当月末まではサービスをご利用いただけます。\n\n決済はクレジットカードによる即時決済とし、決済処理にはPAY.JP株式会社の決済サービスを利用します。ユーザーのクレジットカード情報は当社サーバーには保存されません。' },
            { title: '第4条（鑑定書の提供）', content: '鑑定書は、決済完了後、Webページ上で即時に閲覧可能な形式で提供されます。生成には通常20〜40秒程度を要します。\n\nシステム障害等により鑑定書が正常に生成されなかった場合は、全額返金いたします。' },
            { title: '第5条（キャンセル・返品）', content: 'デジタルコンテンツという商品の性質上、鑑定書の生成・閲覧開始後のキャンセル・返品はお受けしておりません。\n\nただし、以下の場合は全額返金の対象となります。\n・鑑定書が正常に生成されなかった場合\n・システム障害により鑑定書を閲覧できなかった場合\n・二重決済が発生した場合' },
            { title: '第6条（禁止事項）', content: 'ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。\n\n・不正な手段による決済行為\n・本サービスの運営を妨害する行為\n・鑑定書の内容を商業目的で無断転載・再配布する行為\n・他者の個人情報を使用して鑑定書を取得する行為\n・その他、当社が不適切と判断する行為' },
            { title: '第7条（知的財産権）', content: '本サービスにより生成される鑑定書の著作権その他の知的財産権は、当社に帰属します。ユーザーは、個人的な閲覧の目的に限り鑑定書を利用することができます。' },
            { title: '第8条（免責事項）', content: '当社は、鑑定書の内容に基づいてユーザーが行った行動・判断について、一切の責任を負いません。\n\n本サービスは娯楽・エンタテインメントを目的としたものであり、医療・法律・金融等の専門的な助言に代わるものではありません。\n\n天災、通信障害、その他当社の責に帰さない事由により本サービスの提供が困難となった場合、当社は一切の責任を負いません。' },
            { title: '第9条（個人情報の取り扱い）', content: '当社は、ユーザーの個人情報を当社のプライバシーポリシーに基づき適切に取り扱います。詳細はプライバシーポリシーをご確認ください。' },
            { title: '第10条（規約の変更）', content: '当社は、必要に応じて本規約を変更することがあります。変更後の規約は、本サービス上に掲載した時点で効力を生じるものとします。' },
            { title: '第11条（準拠法・管轄裁判所）', content: '本規約の解釈および適用は、日本国法に準拠するものとします。本サービスに関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。\n\n制定日: 2026年3月12日' },
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
