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
    let plan = 'standard';

    if (sessionId.startsWith('cs_test_dummy')) {
      const parts = sessionId.split('_');
      if (parts.length > 3) {
        name = decodeURIComponent(parts[3]);
        dob = parts[4] || '1990-01-01';
      }
    } else {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status !== 'paid') {
        return NextResponse.json({ error: 'Payment not completed or invalid session' }, { status: 403 });
      }
      name = session.metadata?.name || 'ゲスト';
      dob = session.metadata?.dob || '不明';
      plan = session.metadata?.plan || 'standard';
    }

    const today = new Date();
    const todayString = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // 1-indexed

    // Generate 12-month labels starting from current month
    const monthLabels: string[] = [];
    for (let i = 0; i < 12; i++) {
      const m = ((currentMonth - 1 + i) % 12) + 1;
      const y = currentYear + Math.floor((currentMonth - 1 + i) / 12);
      monthLabels.push(`${y}年${m}月`);
    }
    const periodLabel = `${monthLabels[0]}〜${monthLabels[11]}`;

    // Generate 10-year labels
    const yearLabels = Array.from({ length: 10 }, (_, i) => `${currentYear + i}`);

    const prompt = `# 命令書
あなたは、鑑定歴20年以上の「プロのカバラ数秘術師」であり、卓越した文章力を持つ「プロのライター」です。
以下の【入力情報】と【制約条件】をもとに、お客様がスマホで読んで「お金を払ってでも読みたい」と深く感動し、具体的な行動を起こしたくなるような圧倒的なボリュームの鑑定書を、**厳格なJSONフォーマット**で作成してください。

# 制約条件（必ず厳守すること）
1. **【アスタリスク禁止】** 文章中や強調として「アスタリスク（*）」は絶対に使用しないでください。強調したい場合はHTMLの「<b>タグ</b>」を使用してください。
2. **【プロのトーンと圧倒的文字数】** AI特有の「～と言えるでしょう」「重要です」といった無難な表現は排除し、プロとして優しくも断言するトーンで、非常に深く、圧倒的な文字数（長文）で記述してください。
3. **【数秘術の根拠提示】** すべての文章（10年運勢、今年の運勢、毎月の運勢、運命の日）において、「あなたの運命数〇が示す性質によれば…」「今年のパーソナルイヤー〇のサイクルによると…」といったカバラ数秘術の具体的な計算結果を根拠として盛り込んでください。
4. **【JSON出力】** 出力は必ず以下のJSON構造とし、Markdownのコードブロック (\`\`\`json) は含めず、純粋なJSONテキストのみを出力してください。各キーに対するテキスト（説明文）は長文で、改行（\\n）や<b>タグを含めて構いません。
5. **【期間】** 月別の運勢・アクションプランは「${periodLabel}」の12ヶ月間を対象としてください。年を跨ぐ場合もあります。

# 入力情報
・お客様の名前：${name}
・生年月日：${dob}
・本日の日付（鑑定日）：${todayString}

【出力必須JSON構造】
{
  "coverIntro": "プロの占い師としての重厚な挨拶。生年月日から導き出された運命数を提示し、その数字が持つ本質的な宿命を圧倒的な長文で解説。",
  "biorhythm10Years": [
    // ${yearLabels[0]}年から${yearLabels[9]}年までの10年間の運勢の波（0〜100）
    { "year": "${yearLabels[0]}", "value": 30 }, { "year": "${yearLabels[1]}", "value": 50 } // ...計10年分
  ],
  "biorhythm10YearsText": "上記の10年がカバラ数秘術的にどのようなサイクルになるのか、人生の大きなテーマについての深い解説（圧倒的な長文）。",
  "biorhythm12Months": [
    // ${periodLabel}の12ヶ月間の運勢の波（0〜100）
    { "month": "${monthLabels[0]}", "value": 40 }, { "month": "${monthLabels[1]}", "value": 45 } // ...計12ヶ月分
  ],
  "biorhythm12MonthsText": "この12ヶ月のパーソナルイヤーが示す意味と、果たすべき使命やテーマの解説（長文）。",
  "monthlyPlans": [
    // ${periodLabel}の12ヶ月間の月別アクションプラン（12個のオブジェクト）
    {
      "month": "${monthLabels[0]}",
      "title": "〇月のテーマを簡潔に",
      "overall": "全体運（長文。毎月のカバラの数字の巡りも根拠に入れること）",
      "work": "仕事運（長文）",
      "finance": "金運（長文）",
      "health": "健康運（長文）",
      "relationships": "対人関係（長文）"
    }
  ],
  "fatefulDay": {
    "date": "〇月〇日", // 本日の日付より未来で、上記12ヶ月以内の具体的な日付を指定
    "reason": "なぜこの日が起点となるのか、数秘術の根拠をもとに熱く深く語る（長文）",
    "action": "この日を境にどう動くべきか、具体的で実践的なアクションプランとマインドセットのアドバイス（長文）"
  },
  "finalMessage": "全体のまとめと、お客様の未来を祝福し、背中を強く押す力強い言葉（長文）"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.85,
        maxOutputTokens: 65536,
        responseMimeType: "application/json",
      }
    });

    const reportJson = response.text || "{}";
    const cleanJson = reportJson.replace(/```json\n|\n```/g, '');

    let parsedData;
    try {
      parsedData = JSON.parse(cleanJson);
    } catch {
      // Attempt to repair truncated JSON
      console.warn('JSON parse failed, attempting repair...');
      const repaired = repairJson(cleanJson);
      parsedData = JSON.parse(repaired);
    }

    return NextResponse.json({ report: parsedData, plan, name });
  } catch (error: any) {
    console.error('Error generating AI report:', error);
    return NextResponse.json({ error: 'Failed to generate report. Please try again later.' }, { status: 500 });
  }
}

function repairJson(json: string): string {
  let s = json.trim();
  // Count open/close braces and brackets
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
  // If we ended inside a string, close it
  if (inString) s += '"';
  // Remove trailing comma
  s = s.replace(/,\s*$/, '');
  // Close any open brackets/braces
  while (brackets > 0) { s += ']'; brackets--; }
  while (braces > 0) { s += '}'; braces--; }
  return s;
}
