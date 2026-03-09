'use client';

import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Compass, Briefcase, Heart, ShieldCheck, Users, Sparkles, Star, CalendarDays, Coins } from "lucide-react";

export default function PremiumLivePage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const extractedName = sessionId?.startsWith('cs_test_dummy') && sessionId.split('_').length > 3 ? decodeURIComponent(sessionId.split('_')[3]) : 'ゲスト';

  useEffect(() => {
    setMounted(true);

    if (!sessionId) {
      setError('セッションIDが見つかりません。');
      setLoading(false);
      return;
    }

    const fetchReport = async () => {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        if (!res.ok) throw new Error('鑑定書の生成に失敗しました。');

        const data = await res.json();
        setReport(data.report); 
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [sessionId]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 selection:bg-[#EAE3D9]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CFA770] mb-8"></div>
        <div className="text-center space-y-4">
          <h2 className="text-xl font-light tracking-widest text-[#2C241B]">魂のデータを解析しています...</h2>
          <p className="text-xs text-[#8A7A6A] tracking-[0.2em] font-sans leading-relaxed">
            鑑定歴20年の叡智を結集し、<br />
            あなた専用の鑑定書を執筆中です。<br />
            ※通常20〜40秒ほどかかります。画面を閉じずにお待ちください。
          </p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl text-red-800 mb-4 font-serif">エラーが発生しました</h2>
        <p className="text-[#8A7A6A] text-sm">{error || "データが見つかりませんでした。"}</p>
      </div>
    );
  }

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
              {extractedName} 様の<br />魂の設計図と未来への道標
            </h1>
          </motion.div>

          {/* Intro Text */}
          <div className="mt-8 pt-6 border-t border-dashed border-[#E8DCC4]">
            <div 
              className="text-[14px] leading-[1.8] text-[#3A332C] font-medium text-justify html-content"
              dangerouslySetInnerHTML={{ __html: report.coverIntro?.replace(/\n/g, '<br/>') || '' }}
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
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={report.biorhythm10Years || []} margin={{ top: 10, right: 15, left: -25, bottom: 20 }}>
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
          </div>
          
          {/* 10-Year Text */}
          <div className="px-6 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#D4AF37]/50 to-transparent rounded-r ml-6"></div>
            <div className="pl-4">
              <div 
                className="text-[14px] leading-[1.8] text-[#3A332C] font-medium text-justify html-content"
                dangerouslySetInnerHTML={{ __html: report.biorhythm10YearsText?.replace(/\n/g, '<br/>') || '' }}
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
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={report.biorhythm12Months || []} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
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
          </div>

          {/* 12-Month Text */}
          <div className="px-6 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#D4AF37]/50 to-transparent rounded-r ml-6"></div>
            <div className="pl-4">
              <div 
                className="text-[14px] leading-[1.8] text-[#3A332C] font-medium text-justify html-content"
                dangerouslySetInnerHTML={{ __html: report.biorhythm12MonthsText?.replace(/\n/g, '<br/>') || '' }}
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
            {report.monthlyPlans?.map((plan: any, idx: number) => (
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
                           dangerouslySetInnerHTML={{ __html: plan.overall?.replace(/\n/g, '<br/>') || '' }}
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
                             dangerouslySetInnerHTML={{ __html: plan.work?.replace(/\n/g, '<br/>') || '' }}
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
                             dangerouslySetInnerHTML={{ __html: plan.finance?.replace(/\n/g, '<br/>') || '' }}
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
                             dangerouslySetInnerHTML={{ __html: plan.relationships?.replace(/\n/g, '<br/>') || '' }}
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
                             dangerouslySetInnerHTML={{ __html: plan.health?.replace(/\n/g, '<br/>') || '' }}
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
                  <div dangerouslySetInnerHTML={{ __html: report.fatefulDay.reason?.replace(/\n/g, '<br/>') || '' }} />
               </div>
               <div className="bg-white/5 border border-[#D4AF37]/30 p-4 rounded-lg mt-4">
                  <h4 className="text-[#D4AF37] font-bold mb-2">この日を境にどう動くべきか</h4>
                  <div dangerouslySetInnerHTML={{ __html: report.fatefulDay.action?.replace(/\n/g, '<br/>') || '' }} />
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
              dangerouslySetInnerHTML={{ __html: report.finalMessage?.replace(/\n/g, '<br/>') || '' }}
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
