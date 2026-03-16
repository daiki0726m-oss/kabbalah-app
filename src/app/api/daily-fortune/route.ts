import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { calculateLifePathNumber } from '@/lib/numerology';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// Simple in-memory cache for daily fortunes (key: dob+date)
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 12; // 12 hours

export async function POST(req: Request) {
  try {
    const { dob } = await req.json();
    if (!dob) {
      return NextResponse.json({ error: '生年月日が必要です。' }, { status: 400 });
    }

    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `${dob}_${today}`;

    // Return cached result if available
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json(cached.data);
    }

    const destinyNumber = calculateLifePathNumber(dob);

    // Calculate personal day number
    const todayParts = today.split('-');
    const dayDigits = todayParts.join('').split('').map(Number).reduce((a, b) => a + b, 0);
    let personalDay = (destinyNumber + dayDigits) % 9 || 9;

    const prompt = `あなたはカバラ数秘術の鑑定士です。以下の情報に基づき、今日の運勢を生成してください。

運命数: ${destinyNumber}
個人日数: ${personalDay}
今日の日付: ${today}

以下のJSON形式で出力してください。占いらしい温かく前向きな表現でお願いします。各項目は具体的に2-3文で記述してください。

{
  "overallScore": 数値(1-100の運勢スコア),
  "overallMessage": "今日の総合メッセージ（2-3文）",
  "love": "恋愛運の簡潔なアドバイス（1-2文）",
  "work": "仕事運の簡潔なアドバイス（1-2文）",
  "money": "金運の簡潔なアドバイス（1-2文）",
  "health": "健康運の簡潔なアドバイス（1-2文）",
  "luckyColor": "ラッキーカラー",
  "luckyNumber": 数値(1-9),
  "luckyDirection": "ラッキー方位",
  "actionAdvice": "今日の開運アクション（具体的な行動を1つ）",
  "cautionNote": "今日の注意点（1文）"
}

JSONのみを出力してください。`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    let text = response.text || '';
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const fortune = JSON.parse(text);
    fortune.destinyNumber = destinyNumber;
    fortune.personalDay = personalDay;
    fortune.date = today;

    // Cache the result
    cache.set(cacheKey, { data: fortune, timestamp: Date.now() });

    // Clean old cache entries
    for (const [key, value] of cache.entries()) {
      if (Date.now() - value.timestamp > CACHE_TTL) cache.delete(key);
    }

    return NextResponse.json(fortune);
  } catch (error: any) {
    console.error('Daily fortune error:', error);
    return NextResponse.json(
      { error: error.message || 'デイリー運勢の生成に失敗しました。' },
      { status: 500 }
    );
  }
}
