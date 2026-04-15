import { NextResponse } from 'next/server';
import { getSession } from '@/lib/komoju';
import { generateWithFallback } from '@/lib/gemini';

export const maxDuration = 120;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    let name = body.name || 'ゲスト';
    let dob = body.dob || '不明';

    // Verify payment via KOMOJU session
    try {
      const session = await getSession(sessionId);
      if (session.status !== 'completed') {
        return NextResponse.json({ error: 'Payment not completed' }, { status: 403 });
      }
      const meta = session.metadata as Record<string, string> | null;
      if (meta?.name) name = meta.name;
      if (meta?.dob) dob = meta.dob;
      if (body.name) name = body.name;
      if (body.dob) dob = body.dob;
    } catch (verifyErr: any) {
      console.error('KOMOJU verification failed:', verifyErr.message);
      return NextResponse.json({ error: '決済の確認に失敗しました。' }, { status: 500 });
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

    const response = await generateWithFallback({
      prompt,
      temperature: 0.85,
      maxOutputTokens: 32768,
      jsonMode: true,
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
