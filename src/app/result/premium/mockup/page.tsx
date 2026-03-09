"use client";

import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Compass, Briefcase, Heart, ShieldCheck, Users, Sparkles, Star, CalendarDays, Coins, CheckCircle2 } from "lucide-react";

// Dense, 20-year veteran style dummy text
const report = {
  coverIntro: "JohnDoe様、ようこそお越しくださいました。鑑定歴20年の経験を以って、あなたの魂が持つ本質的な宿命と未来への軌跡をここに紐解きます。あなたの生年月日から導き出された<b>【運命数7】</b>。この数字は、内省的で深い探求心を宿し、物事の表面ではなく真理を追究する孤高の研究者を象徴しています。あなたは周囲の喧騒に流されることなく、独自の哲学と鋭い洞察力で世界を観察する力を与えられています。だからこそ、時に周囲との間に温度差を感じることもあるはずですが、それこそがあなたの才能を護る盾なのです。さあ、この深淵なるカバラの叡智を通じて、あなたの魂が本当に求めている道標を共有させていただきます。",
  biorhythm10Years: [
    { year: "2026", value: 30 },
    { year: "2027", value: 50 },
    { year: "2028", value: 65 },
    { year: "2029", value: 85 },
    { year: "2030", value: 95 },
    { year: "2031", value: 70 },
    { year: "2032", value: 45 },
    { year: "2033", value: 60 },
    { year: "2034", value: 80 },
    { year: "2035", value: 90 },
  ],
  biorhythm10YearsText: "2026年から始まる向こう10年間は、カバラ数秘術において<b>【完全なる自己統合】</b>のプロセスを歩む壮大なサイクルとなります。特に注目すべきは、あなたの波がピークに達する2030年。この年は、あなたの運命数7が持つ「真理の探究」が現実世界で圧倒的な成果として具現化する時期です。今はまだその準備段階にあり、2026年の運気は底辺からのスタート（値30）を示していますが、これは決して不運なのではなく、高く飛ぶための深い屈伸の時期なのです。過去の古い価値観や不要な人間関係を削ぎ落とし、あなたの魂の純度を高めるための必然のプロセスだと断言します。この沈み込みを恐れず、自己の土台作りに専念してください。",
  biorhythm12Months: [
    { month: "1月", value: 40 },
    { month: "2月", value: 45 },
    { month: "3月", value: 55 },
    { month: "4月", value: 50 },
    { month: "5月", value: 65 },
    { month: "6月", value: 60 },
    { month: "7月", value: 75 },
    { month: "8月", value: 85 },
    { month: "9月", value: 80 },
    { month: "10月", value: 95 },
    { month: "11月", value: 85 },
    { month: "12月", value: 90 },
  ],
  biorhythm12MonthsText: "2026年のあなたのパーソナルイヤーは<b>【1：種まきと始まり】</b>のサイクルに入っています。この1年は、まさに新しい10年の土壌を耕し、あなたが魂の奥底で望んでいる「本当の目標」の種を蒔く時期です。前半の運気は緩やかながらも確実に上昇を描いており、焦燥感に駆られる必要は全くありません。運命数7のあなたは、直感と思考を深く巡らせることができる人です。上半期は内側に向かうエネルギーを重視し、下半期（特に10月の値95のピーク時）に向けて一気に花開かせるための緻密な計画を練ってください。今年蒔いた種は、必ずや数年後に大きな実りをあなたにもたらします。",
  monthlyPlans: [
    {
      month: 1,
      title: "思考の断捨離と純化",
      overall: "年の初めから運気は静的なエネルギーに満ちています。運命数7特有の「考えすぎる癖」を一旦手放し、思考を純化する時間が必要です。焦って行動を起こすよりも、自分にとって何が不要かを徹底的に見極める月にしてください。",
      work: "新しい案件に飛びつく時期ではありません。まずは昨年の業務の洗い出しと、非効率なタスクのシステム化に着手してください。<b>【徹底した現状分析】</b>が、秋以降の飛躍的な評価へと直結します。",
      finance: "自己投資としての出費は大吉ですが、見栄や義理の交際費は極力カットしてください。あなたの知識を深めるための「本」や「専門的な学び」にお金を使うことで、金運の器そのものを拡大できます。",
      health: "寒さと精神的な緊張から、首や肩、そして眼精疲労が蓄積しやすい時期です。寝る前の10分間、スマホを手放して完全な闇の中で深く深呼吸をする瞑想を取り入れてください。",
      relationships: "本当に信頼できる限られた少数の人たちとだけ、深く静かな時間を共有してください。SNS等の表面的な情報の海からは距離を置き、あなたのエネルギーを奪う人間関係とはここで明確な線を引く決断を。"
    },
    {
      month: 2,
      title: "静かなる情熱の着火",
      overall: "少しずつ運気の波が上がり始めるこの月、あなたの内側で密かな情熱の火が灯ります。この火を外にいきなり見せるのではなく、胸の中で大切に育ててください。パーソナルイヤー1のエネルギーが、新しい閃きを与えてくれます。",
      work: "現状のシステムに小さな「改善」を加えることで、驚くほど業務がスムーズになります。あなたの鋭い観察眼と分析力が周囲から頼りにされる場面が増えるでしょう。<b>【プロの意見】</b>として堂々と発言してください。",
      finance: "金運自体は安定していますが、衝動買いには注意が必要です。特にストレス由来の細々とした出費が重なりがちです。「欲しい」ではなく「必要」なものだけを厳選する目を養ってください。",
      health: "血流の滞りが思考の鈍化を招きます。毎日の入浴をシャワーで済ませず、湯船でしっかりと体の芯から温まることを意識してください。温かいジンジャーティーも強力なサポーターとなります。",
      relationships: "思いもよらない古い友人からの連絡があるかもしれません。それは単なる偶然ではなく、今のあなたに必要なメッセージを運んでくる使者です。過去の自分を振り返る良いきっかけとなるでしょう。"
    }
  ],
  fatefulDay: {
    date: "2026年10月24日",
    reason: "数秘術的サイクルにおいて、あなたのパーソナルマンスと運命数が完全に共鳴する<b>【奇跡の接点】</b>がこの日です。あなたの直感が最も研ぎ澄まされ、長年抱えていた迷いや葛藤が霧が晴れるように消え去る瞬間を迎えます。",
    action: "この日、あなたが直感的に「やりたい」「行きたい」と感じたことには、一切の理屈抜きで従ってください。それはあなたの魂が導き出した一つの答えです。恐れを手放し、最初の一歩を踏み出すことで運命の歯車が力強く回転し始めます。"
  },
  finalMessage: "JohnDoe様、あなたの本来の輝きは、まだその片鱗を見せ始めたに過ぎません。あなたがご自身の直感と内なる声に深い信頼を置いた時、運命は劇的なスピードで好転していきます。私はこの2026年が、あなたにとって人生の明確な転換点となることを确信しています。どんな時も、あなたは一人ではありません。この運命の設計図が、暗闇を照らす光となることを心より祈っております。"
};

export default function PremiumLivePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#E5E0D5] flex justify-center pb-12 pt-0 sm:pt-4 selection:bg-[#D4AF37] selection:text-white">
      {/* Container - constrained width for mobile readability */}
      <div className="w-full max-w-lg bg-white text-[#4A4036] font-serif shadow-2xl min-h-screen pb-24 relative overflow-hidden">
        
        {/* Top Gold Ribbon */}
        <div className="w-full h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]"></div>

        {/* 1. Cover Sheet */}
        <section className="relative px-6 pt-16 pb-12 bg-white border-b border-[#E8DCC4]/50">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <Compass className="w-32 h-32" />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center"
          >
            <div className="flex justify-center mb-6">
               <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#FAF8F5]">
                  <Compass className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
               </div>
            </div>
            
            <h2 className="text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase font-sans font-bold mb-4">Kabbalah Premium</h2>
            <h1 className="text-2xl font-bold tracking-widest text-[#2C241B] mb-2 leading-relaxed">
              JohnDoe 様の<br />魂の設計図と未来への道標
            </h1>
          </motion.div>

          {/* Intro Text */}
          <div className="mt-8 pt-6 border-t border-dashed border-[#E8DCC4]">
            <div 
              className="text-[14px] leading-[1.8] text-[#3A332C] font-medium text-justify html-content"
              dangerouslySetInnerHTML={{ __html: report.coverIntro.replace(/\n/g, '<br/>') }}
            />
          </div>
        </section>

        {/* 2. 10-Year Biorhythm Chart */}
        <section className="bg-white py-12 border-b border-[#E8DCC4]/50">
          <div className="px-6 mb-6 text-center">
            <h3 className="text-[15px] font-bold tracking-[0.2em] text-[#D4AF37] mb-3 flex items-center justify-center gap-2">
               <Compass className="w-4 h-4" /> 2026年以降の10年の運勢バイオリズム
            </h3>
            <p className="text-[#8A7A6A] text-xs tracking-wide">
               点線の位置が標準的なニュートラルラインとなります。
            </p>
          </div>

          <div className="h-[220px] w-full px-2 mb-8">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={report.biorhythm10Years} margin={{ top: 10, right: 15, left: -25, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey="year" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#a3a3a3', fontSize: 10, fontFamily: 'serif' }} 
                    dy={10}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#a3a3a3', fontSize: 10, fontFamily: 'serif' }} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E8DCC4', fontSize: '12px', borderRadius: '4px', padding: '8px' }}
                    labelStyle={{ color: '#D4AF37', fontWeight: 'bold', marginBottom: '4px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#D4AF37" 
                    strokeWidth={2}
                    dot={{ fill: '#fff', stroke: '#D4AF37', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#D4AF37', stroke: '#fff', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          
          {/* 10-Year Text */}
          <div className="px-6 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#D4AF37]/50 to-transparent rounded-r ml-6"></div>
            <div className="pl-4">
              <div 
                className="text-[14px] leading-[1.8] text-[#3A332C] font-medium text-justify html-content"
                dangerouslySetInnerHTML={{ __html: report.biorhythm10YearsText.replace(/\n/g, '<br/>') }}
              />
            </div>
          </div>
        </section>

        {/* 3. 12-Month Biorhythm Chart (This Year) */}
        <section className="bg-[#FAF8F5] py-12 border-b border-[#E8DCC4]/50">
          <div className="px-6 mb-6 text-center">
            <h3 className="text-[15px] font-bold tracking-[0.2em] text-[#D4AF37] mb-3 flex items-center justify-center gap-2">
               <Star className="w-4 h-4" /> 2026年 1年間の運勢バイオリズム
            </h3>
          </div>

          <div className="h-[200px] w-full px-2 mb-8 bg-white/50 py-4 mx-4 rounded-xl border border-[#D4AF37]/10 w-[calc(100%-2rem)]">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={report.biorhythm12Months} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5dfd3" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#a3a3a3', fontSize: 10, fontFamily: 'serif' }} 
                    dy={5}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#a3a3a3', fontSize: 10, fontFamily: 'serif' }} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E8DCC4', fontSize: '12px', borderRadius: '4px' }}
                    labelStyle={{ color: '#D4AF37', fontWeight: 'bold' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#D4AF37" 
                    strokeWidth={2}
                    dot={{ fill: '#fff', stroke: '#D4AF37', strokeWidth: 1.5, r: 3 }}
                    activeDot={{ r: 5, fill: '#D4AF37', stroke: '#fff', strokeWidth: 1 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* 12-Month Text */}
          <div className="px-6 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#D4AF37]/50 to-transparent rounded-r ml-6"></div>
            <div className="pl-4">
              <div 
                className="text-[14px] leading-[1.8] text-[#3A332C] font-medium text-justify html-content"
                dangerouslySetInnerHTML={{ __html: report.biorhythm12MonthsText.replace(/\n/g, '<br/>') }}
              />
            </div>
          </div>
        </section>

        {/* 4. Complete 12-Month Action Plan (Editorial Book Style) */}
        <section className="px-4 py-12 bg-white">
          <div className="text-center mb-10 px-2 border-b-2 border-[#D4AF37] pb-4 inline-block mx-auto w-full max-w-[80%]">
              <h3 className="text-[16px] font-bold tracking-[0.2em] text-[#2C241B] flex items-center justify-center gap-2">
                  <CalendarDays className="w-5 h-5 text-[#D4AF37]" /> 2026年 毎月の詳細鑑定
              </h3>
          </div>

          <div className="space-y-12">
            {report.monthlyPlans.map((plan: any, idx: number) => (
              <div key={idx} className="bg-[#FAF8F5] border border-[#E8DCC4]/60 rounded-xl overflow-hidden shadow-sm relative pt-8 pb-6">
                 
                 {/* Month Header */}
                 <div className="text-center px-6 mb-8 border-b border-dashed border-[#D4AF37]/30 pb-6">
                    <span className="text-[10px] font-bold tracking-widest text-[#B3A392] font-sans uppercase mb-1 block">2026</span>
                    <h4 className="text-4xl text-[#D4AF37] tracking-wider font-serif mb-3 font-bold">
                      {plan.month}<span className="text-[1.2rem] ml-1 text-[#8A7A6A] font-medium">月</span>
                    </h4>
                    <div className="text-[15px] text-[#2C241B] leading-relaxed font-bold">「{plan.title}」</div>
                 </div>
                 
                 <div className="space-y-6 px-5">
                   
                   {/* Overall */}
                   <div className="relative">
                      <div className="absolute -top-3 left-3 bg-[#D4AF37] text-white text-[11px] font-bold tracking-widest py-1 px-4 rounded-full flex items-center gap-1.5 z-10 shadow-sm">
                         <Sparkles className="w-3 h-3" />全体運
                      </div>
                      <div className="pt-6 pb-4 px-5 border border-solid border-[#E8DCC4] rounded-lg bg-white relative">
                         <div 
                           className="text-[13.5px] text-[#3A332C] leading-[1.8] font-medium text-justify html-content"
                           dangerouslySetInnerHTML={{ __html: plan.overall.replace(/\n/g, '<br/>') }}
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 gap-6">
                     {/* Job */}
                     <div className="relative">
                        <div className="absolute -top-3 left-3 bg-white text-[#8A7A6A] border border-[#E8DCC4] font-bold text-[10px] tracking-widest py-1 px-3 rounded-full flex items-center gap-1.5 z-10">
                           <Briefcase className="w-3 h-3 text-[#D4AF37]" />仕事運
                        </div>
                        <div className="pt-5 pb-4 px-4 border border-dashed border-[#E8DCC4] rounded-lg bg-white relative">
                           <div 
                             className="text-[13px] text-[#4A4036] leading-[1.7] font-medium text-justify html-content"
                             dangerouslySetInnerHTML={{ __html: plan.work.replace(/\n/g, '<br/>') }}
                           />
                        </div>
                     </div>

                     {/* Finance */}
                     <div className="relative">
                        <div className="absolute -top-3 left-3 bg-white text-[#8A7A6A] border border-[#E8DCC4] font-bold text-[10px] tracking-widest py-1 px-3 rounded-full flex items-center gap-1.5 z-10">
                           <Coins className="w-3 h-3 text-[#D4AF37]" />金運
                        </div>
                        <div className="pt-5 pb-4 px-4 border border-dashed border-[#E8DCC4] rounded-lg bg-white relative">
                           <div 
                             className="text-[13px] text-[#4A4036] leading-[1.7] font-medium text-justify html-content"
                             dangerouslySetInnerHTML={{ __html: plan.finance.replace(/\n/g, '<br/>') }}
                           />
                        </div>
                     </div>
                   </div>

                   <div className="grid grid-cols-1 gap-6 mt-6">
                     {/* Love/Relationships */}
                     <div className="relative">
                        <div className="absolute -top-3 left-3 bg-white text-[#8A7A6A] border border-[#E8DCC4] font-bold text-[10px] tracking-widest py-1 px-3 rounded-full flex items-center gap-1.5 z-10">
                           <Heart className="w-3 h-3 text-[#D4AF37]" />対人・恋愛
                        </div>
                        <div className="pt-5 pb-4 px-4 border border-dashed border-[#E8DCC4] rounded-lg bg-white relative">
                           <div 
                             className="text-[13px] text-[#4A4036] leading-[1.7] font-medium text-justify html-content"
                             dangerouslySetInnerHTML={{ __html: plan.relationships.replace(/\n/g, '<br/>') }}
                           />
                        </div>
                     </div>

                     {/* Health */}
                     <div className="relative">
                        <div className="absolute -top-3 left-3 bg-white text-[#8A7A6A] border border-[#E8DCC4] font-bold text-[10px] tracking-widest py-1 px-3 rounded-full flex items-center gap-1.5 z-10">
                           <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />健康・からだ
                        </div>
                        <div className="pt-5 pb-4 px-4 border border-dashed border-[#E8DCC4] rounded-lg bg-white relative">
                           <div 
                             className="text-[13px] text-[#4A4036] leading-[1.7] font-medium text-justify html-content"
                             dangerouslySetInnerHTML={{ __html: plan.health.replace(/\n/g, '<br/>') }}
                           />
                        </div>
                     </div>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Fateful Day Section */}
        {report.fatefulDay && (
          <section className="px-6 py-12 bg-[#2C241B] text-white">
            <div className="text-center mb-6">
               <h3 className="text-[14px] font-bold tracking-[0.2em] text-[#D4AF37] mb-2">人生の起点となる運命の日</h3>
               <div className="text-3xl font-bold tracking-widest text-white border-b border-[#D4AF37]/50 pb-4 inline-block">
                  {report.fatefulDay.date}
               </div>
            </div>
            
            <div className="space-y-6 text-[14px] leading-[1.8] font-medium text-[#EAE3D9] text-justify html-content">
               <div>
                  <h4 className="text-[#D4AF37] font-bold mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4" />なぜこの日が起点となるのか</h4>
                  <div dangerouslySetInnerHTML={{ __html: report.fatefulDay.reason.replace(/\n/g, '<br/>') }} />
               </div>
               <div className="bg-white/5 border border-[#D4AF37]/30 p-4 rounded-lg mt-4">
                  <h4 className="text-[#D4AF37] font-bold mb-2">この日を境にどう動くべきか</h4>
                  <div dangerouslySetInnerHTML={{ __html: report.fatefulDay.action.replace(/\n/g, '<br/>') }} />
               </div>
            </div>
          </section>
        )}

        {/* 6. Conclusion */}
        <section className="px-8 py-14 bg-white text-center border-t border-[#E8DCC4]">
           <div className="mb-6 flex justify-center">
              <div className="w-12 h-12 flex items-center justify-center bg-[#FAF8F5] rounded-full border border-[#D4AF37]/30 shadow-sm">
                 <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" />
              </div>
           </div>
           
           <h3 className="text-[16px] font-bold tracking-[0.2em] text-[#2C241B] mb-6">鑑定師からのメッセージ</h3>
           
           <div 
              className="text-[14px] leading-[2.0] text-[#4A4036] mb-8 font-medium text-justify html-content"
              dangerouslySetInnerHTML={{ __html: report.finalMessage.replace(/\n/g, '<br/>') }}
            />
           
           <div className="mt-8">
              <span className="block w-4 h-4 border-b border-r border-[#D4AF37] rotate-45 mx-auto opacity-30"></span>
           </div>
        </section>

      </div>
      
      {/* Global CSS for the dynamically injected <b> tags so they look exactly like your red/gold thick highlights */}
      <style dangerouslySetInnerHTML={{__html: `
        .html-content b {
          font-weight: bold;
          color: #A51C1C;
          background: linear-gradient(to top, rgba(212, 175, 55, 0.2) 0%, transparent 100%);
          padding: 0 2px;
          margin: 0 1px;
        }
      `}} />
    </div>
  );
}
