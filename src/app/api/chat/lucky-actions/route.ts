import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || 'dummy_api_key',
});

export const maxDuration = 120;

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    let name = 'ゲスト';
    let dob = '不明';

    if (sessionId.startsWith('cs_test_dummy')) {
      const parts = sessionId.split('_');
      if (parts.length > 3) {
        name = decodeURIComponent(parts[3]);
        dob = parts[4] || '1990-01-01';
      }
    } else {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status !== 'paid') {
        return NextResponse.json({ error: 'Payment not completed' }, { status: 403 });
      }
      name = session.metadata?.name || 'ゲスト';
      dob = session.metadata?.dob || '不明';
    }

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    const monthLabels: string[] = [];
    for (let i = 0; i < 12; i++) {
      const m = ((currentMonth - 1 + i) % 12) + 1;
      const y = currentYear + Math.floor((currentMonth - 1 + i) / 12);
      monthLabels.push(`${y}年${m}月`);
    }
    const periodLabel = `${monthLabels[0]}〜${monthLabels[11]}`;

    const prompt = `# 命令書
あなたはプロのカバラ数秘術師です。以下の情報に基づいて、12ヶ月分の「毎日の開運アクション」を生成してください。

# 入力情報
・お客様の名前：${name}
・生年月日：${dob}
・対象期間: ${periodLabel}

# 制約条件
1. アスタリスクは使用禁止。
2. 純粋なJSONテキストのみを出力。
3. 各アクションは10〜25文字程度の具体的で実践的な内容にする。
4. 各月の日数に応じた正確な日数分（28〜31日）を生成する。

【出力JSON構造】
{
  "luckyActions": [
    {
      "monthLabel": "${monthLabels[0]}",
      "actions": [
        { "day": 1, "action": "具体的な開運アクション" },
        { "day": 2, "action": "..." }
      ]
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.85,
        maxOutputTokens: 32768,
        responseMimeType: "application/json",
      }
    });

    const reportJson = response.text || "{}";
    const cleanJson = reportJson.replace(/```json\n|\n```/g, '');

    let parsedData;
    try {
      parsedData = JSON.parse(cleanJson);
    } catch {
      console.warn('Lucky actions JSON parse failed, attempting repair...');
      const repaired = repairJson(cleanJson);
      parsedData = JSON.parse(repaired);
    }

    return NextResponse.json({ luckyActions: parsedData.luckyActions || [] });
  } catch (error: any) {
    console.error('Error generating lucky actions:', error);
    return NextResponse.json({ error: 'Failed to generate lucky actions.' }, { status: 500 });
  }
}

function repairJson(json: string): string {
  let s = json.trim();
  let braces = 0, brackets = 0, inString = false, escape = false;
  for (const c of s) {
    if (escape) { escape = false; continue; }
    if (c === '\\') { escape = true; continue; }
    if (c === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (c === '{') braces++;
    if (c === '}') braces--;
    if (c === '[') brackets++;
    if (c === ']') brackets--;
  }
  if (inString) s += '"';
  s = s.replace(/,\s*$/, '');
  while (brackets > 0) { s += ']'; brackets--; }
  while (braces > 0) { s += '}'; braces--; }
  return s;
}
