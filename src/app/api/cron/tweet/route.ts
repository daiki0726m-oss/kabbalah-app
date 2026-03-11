import { NextResponse } from 'next/server';
import { TwitterApi } from 'twitter-api-v2';
import { GoogleGenAI } from '@google/genai';

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY || '',
  appSecret: process.env.TWITTER_API_SECRET || '',
  accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
  accessSecret: process.env.TWITTER_ACCESS_SECRET || '',
});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
const SITE_URL = 'https://kabbalah-app-ruddy.vercel.app';

// Calculate today's numerology number from date
function getTodayNumber(): number {
  const today = new Date();
  const dateStr = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
  let sum = dateStr.split('').reduce((acc, d) => acc + parseInt(d), 0);
  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  return sum;
}

// Get current hour in JST
function getJSTHour(): number {
  const now = new Date();
  const jst = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
  return jst.getHours();
}

// Content categories based on time
function getCategory(hour: number): string {
  if (hour < 9) return 'daily_energy';       // 7:00 - 今日の数秘エネルギー
  if (hour < 12) return 'what_is';           // 10:00 - 数秘術とは
  if (hour < 15) return 'trivia';            // 13:00 - 数秘トリビア
  if (hour < 19) return 'destiny_number';    // 17:00 - 運命数解説
  return 'cta';                               // 21:00 - 診断CTA
}

// Generate tweet content using Gemini
async function generateTweet(category: string, todayNumber: number): Promise<string> {
  const today = new Date();
  const dateStr = `${today.getMonth() + 1}月${today.getDate()}日`;

  const prompts: Record<string, string> = {
    daily_energy: `あなたはカバラ数秘術のプロです。今日は${dateStr}、数秘術的なエネルギーの数字は【${todayNumber}】です。
この数字のエネルギーに基づいた「今日のメッセージ」をX(Twitter)投稿用に書いてください。
条件：
- 冒頭に「🔮 ${dateStr}の数秘エネルギー【${todayNumber}】」と入れる
- 全員に当てはまる内容にする（特定の運命数の人向けにしない）
- 具体的なアクションを1つ提案する
- 最後に改行して「✦ あなたの運命数は？→ ${SITE_URL}」を入れる
- 全体で240文字以内（URL含む）
- ハッシュタグは入れない
- アスタリスク(*)は使わない`,

    what_is: `あなたはカバラ数秘術のプロです。「数秘術とは何か」をX(Twitter)投稿用に書いてください。
以下のテーマからランダムに1つ選んで書いてください：
- カバラの語源と意味
- 数秘術の4000年の歴史
- ピタゴラスと数秘術の関係
- 「数の振動」という概念
- 運命数とは何か
- パーソナルイヤーの仕組み
- 数秘術と占星術の違い
条件：
- 冒頭に「📖 数秘術の世界」と入れる
- 初心者にも分かりやすく
- 興味を引く事実を1つ含める
- 最後に改行して「✦ 30秒で無料鑑定 → ${SITE_URL}」を入れる
- 全体で240文字以内
- ハッシュタグは入れない
- アスタリスク(*)は使わない`,

    trivia: `あなたはカバラ数秘術のプロです。数秘術に関するトリビア（雑学）をX(Twitter)投稿用に書いてください。
以下のテーマからランダムに1つ選んで書いてください：
- 有名人の運命数と成功の関係
- ニコラ・テスラの3・6・9への執着
- 古代バビロニアでの数秘術の使われ方
- マスターナンバー11と22の特別さ
- 日本の有名人の運命数
- 数秘術が当たる科学的な理由
- 世界中で使われている数秘術
条件：
- 冒頭に「💡 数秘トリビア」と入れる
- 「へぇ！」と思える意外な事実を含む
- 最後に改行して「✦ あなたの数字を知る → ${SITE_URL}」を入れる
- 全体で240文字以内
- ハッシュタグは入れない
- アスタリスク(*)は使わない`,

    destiny_number: `あなたはカバラ数秘術のプロです。運命数1〜9のうちランダムに1つ選び、その特徴をX(Twitter)投稿用に書いてください。
条件：
- 冒頭に「🔢 運命数○の人」と入れる（○は選んだ数字）
- その数字の本質的な性格を2〜3個紹介
- ポジティブな内容が中心だが、注意点も1つ入れる
- 「あなたの運命数は○ですか？」と問いかける
- 最後に改行して「✦ 運命数を調べる → ${SITE_URL}」を入れる
- 全体で240文字以内
- ハッシュタグは入れない
- アスタリスク(*)は使わない`,

    cta: `あなたはカバラ数秘術のプロです。サイトへの誘導ツイートをX(Twitter)投稿用に書いてください。
条件：
- 冒頭に「✦ 今夜、自分と向き合う時間を」のような感情に訴えるフレーズ
- カバラ数秘術の無料鑑定で分かることを簡潔に紹介
- 「光と影」「才能」「10年バイオリズム」などの魅力的なキーワードを含む
- 最後に改行して「👇 30秒で鑑定書を受け取る\n${SITE_URL}」を入れる
- 全体で240文字以内
- 毎回異なる切り口で書く
- ハッシュタグは入れない
- アスタリスク(*)は使わない`,
  };

  const prompt = prompts[category] || prompts.cta;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });
    return (response.text || '').trim();
  } catch {
    // Fallback pre-written tweets when Gemini is unavailable
    return getFallbackTweet(category, todayNumber);
  }
}

const fallbackTweets: Record<string, string[]> = {
  daily_energy: [
    `🔮 今日の数秘エネルギー\n\n今日はあなたの直感が冴える日。ふと浮かんだアイデアを大切にしてください。小さな「気になる」が大きな転機につながるかもしれません。\n\n✦ あなたの運命数は？→ ${SITE_URL}`,
    `🔮 今日の数秘エネルギー\n\n今日は人とのつながりが幸運を呼ぶ日。普段話さない人に声をかけてみて。思わぬ良い出会いがあるかもしれません。\n\n✦ あなたの運命数は？→ ${SITE_URL}`,
    `🔮 今日の数秘エネルギー\n\n今日は内省の日。5分でいいので静かに自分と向き合う時間を作ってみてください。答えはいつも自分の中にあります。\n\n✦ あなたの運命数は？→ ${SITE_URL}`,
  ],
  what_is: [
    `📖 数秘術の世界\n\n「カバラ」はヘブライ語で「受け取られたもの」という意味。4000年前のバビロニアで生まれたこの叡智は、口伝として秘密裏に受け継がれてきました。\n\n✦ 30秒で無料鑑定 → ${SITE_URL}`,
    `📖 数秘術の世界\n\n数秘術では、生年月日を一桁に還元した「運命数」があなたの本質を表すと考えます。1〜9、そして特別な11と22。あなたの数字は何でしょう？\n\n✦ 30秒で無料鑑定 → ${SITE_URL}`,
  ],
  trivia: [
    `💡 数秘トリビア\n\n天才発明家ニコラ・テスラは「3・6・9の数字の壮大さが分かれば、宇宙への鍵を手にする」と語りました。彼はホテルの部屋番号も3で割り切れる数を選んでいたそうです。\n\n✦ あなたの数字を知る → ${SITE_URL}`,
    `💡 数秘トリビア\n\nピタゴラスは数学者であると同時に神秘家でもありました。「万物は数なり」と説き、数が持つ振動が人間の運命に影響を与えると確信していたのです。\n\n✦ あなたの数字を知る → ${SITE_URL}`,
  ],
  destiny_number: [
    `🔢 運命数7の人\n\n物事の本質を見抜く鋭い洞察力の持ち主。科学と神秘の両方に惹かれる探究者タイプです。ただし、考えすぎて行動が遅れることも。\n\nあなたの運命数は7ですか？\n\n✦ 運命数を調べる → ${SITE_URL}`,
    `🔢 運命数1の人\n\n生まれながらのリーダー。自分の信念を貫く強さと、新しいことに挑戦する勇気を持っています。ただし、頑固になりすぎないよう注意。\n\nあなたの運命数は1ですか？\n\n✦ 運命数を調べる → ${SITE_URL}`,
  ],
  cta: [
    `✦ 夜のひととき、自分と向き合ってみませんか？\n\nカバラ数秘術は4000年の叡智。あなたの「光」と「影」、隠された才能、10年間のバイオリズムまで、生年月日だけで読み解きます。\n\n👇 30秒で鑑定書を受け取る\n${SITE_URL}`,
    `✦ あなたの生年月日には、運命の暗号が刻まれています\n\n性格の本質、才能、人生の転機…カバラ数秘術が4000年かけて体系化した「数の法則」で無料鑑定。\n\n👇 30秒で鑑定書を受け取る\n${SITE_URL}`,
  ],
};

function getFallbackTweet(category: string, todayNumber: number): string {
  const tweets = fallbackTweets[category] || fallbackTweets.cta;
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return tweets[dayOfYear % tweets.length];
}

export async function GET(req: Request) {
  // Verify cron secret (Vercel sends this header)
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const hour = getJSTHour();
    const category = getCategory(hour);
    const todayNumber = getTodayNumber();

    const tweetText = await generateTweet(category, todayNumber);

    // Post to X
    const result = await twitterClient.v2.tweet(tweetText);

    return NextResponse.json({
      success: true,
      category,
      todayNumber,
      tweetId: result.data.id,
      text: tweetText,
    });
  } catch (error: any) {
    console.error('Tweet error:', error);
    const errDetail = error?.data ? JSON.stringify(error.data) : error.message;
    return NextResponse.json({ error: errDetail, code: error?.code, rateLimit: error?.rateLimit }, { status: 500 });
  }
}
