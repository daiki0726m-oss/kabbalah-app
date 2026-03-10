import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || 'dummy_api_key',
});

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const { name1, dob1, name2, dob2 } = await req.json();

        if (!name1 || !dob1 || !name2 || !dob2) {
            return NextResponse.json({ error: 'Both people\'s name and DOB are required' }, { status: 400 });
        }

        const prompt = `# 命令書
あなたは、鑑定歴20年以上の「プロのカバラ数秘術師」です。
以下の2名の情報をもとに、カバラ数秘術の相性診断を行い、厳格なJSONフォーマットで結果を出力してください。

# 制約条件
1. アスタリスク（*）は使わず、強調は<b>タグを使用。
2. プロとして断言するトーン。長文で深い分析を行う。
3. 数秘術の根拠（運命数の計算結果）を必ず示す。
4. 純粋なJSONテキストのみ出力（コードブロック不要）。

# 入力情報
・1人目：${name1}（生年月日：${dob1}）
・2人目：${name2}（生年月日：${dob2}）

【出力必須JSON構造】
{
  "person1": {
    "name": "${name1}",
    "destinyNumber": 数字,
    "trait": "運命数から読み取れるこの人の本質（2〜3文）"
  },
  "person2": {
    "name": "${name2}",
    "destinyNumber": 数字,
    "trait": "運命数から読み取れるこの人の本質（2〜3文）"
  },
  "compatibilityScore": 0〜100の数値,
  "overallAnalysis": "2人の運命数の組み合わせが持つ意味、相性の根幹となる分析（長文）",
  "strengths": "2人の関係で活かせる強みとシナジー（長文）",
  "challenges": "2人の関係で注意すべき課題と乗り越え方（長文）",
  "advice": "この2人がより良い関係を築くための具体的アドバイス（長文）"
}
`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.85,
                maxOutputTokens: 4096,
                responseMimeType: "application/json",
            }
        });

        const reportJson = response.text || "{}";
        const cleanJson = reportJson.replace(/```json\n|\n```/g, '');
        const parsedData = JSON.parse(cleanJson);

        return NextResponse.json({ compatibility: parsedData });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error generating compatibility report:', error);
        return NextResponse.json({ error: 'Failed to generate compatibility report.' }, { status: 500 });
    }
}
