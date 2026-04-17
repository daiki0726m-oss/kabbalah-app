import { NextResponse } from 'next/server';
import { TwitterApi } from 'twitter-api-v2';
import { GoogleGenAI } from '@google/genai';

function getTwitterClient() {
  return new TwitterApi({
    appKey: process.env.TWITTER_API_KEY || '',
    appSecret: process.env.TWITTER_API_SECRET || '',
    accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
    accessSecret: process.env.TWITTER_ACCESS_SECRET || '',
  });
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
const SITE_URL = 'https://kabbalah-app-ruddy.vercel.app';

// ── Numerology helpers ──

function getTodayNumber(): number {
  const today = new Date();
  const dateStr = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
  let sum = dateStr.split('').reduce((acc, d) => acc + parseInt(d), 0);
  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  return sum;
}

function getJSTHour(): number {
  const now = new Date();
  const jst = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
  return jst.getHours();
}

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
}

// ── 20+ diverse content angles (rotated daily to prevent repetition/ban) ──

const CONTENT_ANGLES = [
  // 🔮 Daily fortune variations
  { angle: 'morning_oracle', emoji: '🌅', hook: '今朝のオラクルメッセージ' },
  { angle: 'daily_number', emoji: '🔮', hook: '今日の数秘エネルギー' },
  { angle: 'evening_reflect', emoji: '🌙', hook: '今夜の振り返り数秘' },

  // 📖 Educational (different each time)
  { angle: 'history_deep', emoji: '📜', hook: '数秘術4000年の秘密' },
  { angle: 'pythagoras', emoji: '🏛️', hook: 'ピタゴラスの教え' },
  { angle: 'kabbalah_origin', emoji: '✡️', hook: 'カバラの語源' },
  { angle: 'number_vibration', emoji: '〰️', hook: '数の振動とは' },

  // 💡 Trivia & fun facts
  { angle: 'celeb_number', emoji: '🌟', hook: 'あの有名人の運命数' },
  { angle: 'tesla_369', emoji: '⚡', hook: 'テスラの3-6-9理論' },
  { angle: 'world_numerology', emoji: '🌍', hook: '世界の数秘術事情' },
  { angle: 'number_in_life', emoji: '🔢', hook: '身近な数字の意味' },

  // 🧠 Personality & self-discovery
  { angle: 'strength', emoji: '💪', hook: '運命数別・隠された才能' },
  { angle: 'weakness', emoji: '🪞', hook: '運命数別・気をつけたいこと' },
  { angle: 'love_style', emoji: '💕', hook: '運命数別・恋愛のクセ' },
  { angle: 'work_style', emoji: '💼', hook: '運命数別・仕事スタイル' },
  { angle: 'money_style', emoji: '💰', hook: '運命数別・お金の使い方' },

  // 📊 Rankings & lists
  { angle: 'weekly_ranking', emoji: '🏆', hook: '今週の運勢ランキング' },
  { angle: 'compatibility', emoji: '❤️‍🔥', hook: '相性がいい運命数の組み合わせ' },

  // 🤔 Questions & engagement
  { angle: 'question', emoji: '🤔', hook: '数秘クイズ' },
  { angle: 'poll_style', emoji: '📊', hook: 'あなたはどっち？' },
  { angle: 'confession', emoji: '🫣', hook: '運命数○○の人あるある' },

  // ✨ Motivational
  { angle: 'affirmation', emoji: '🕊️', hook: '今日のアファメーション' },
  { angle: 'turning_point', emoji: '🔄', hook: '人生の転機を数秘で読む' },
  { angle: 'personal_year', emoji: '📅', hook: 'パーソナルイヤーの話' },
];

// ── Format variations (structure changes to avoid pattern detection) ──

const FORMAT_INSTRUCTIONS = [
  '短文3行で。1行目にフック、2行目に気づき、3行目にCTA。',
  '問いかけから始めて、答えを提示し、最後にCTAを入れる。',
  '「実は…」で始まる意外な事実を冒頭に。その後解説。',
  'リスト形式（①②③）で3つのポイントを紹介。',
  'ストーリー調で。「ある人が○○して…」という語り口。',
  '数字データから始める。「○○%の人が…」という切り口。',
  '対比構造で。「○○だと思ってませんか？実は…」',
  '箇条書きなし。詩のような語り口で、余韻を残す。',
  '冒頭に衝撃的な一言。その後に解説を続ける。',
  '友達に話しかけるようなカジュアルなトーンで。',
];

// ── CTA variations ──

const CTA_VARIANTS = [
  `✦ あなたの運命数は？→ ${SITE_URL}`,
  `✦ 30秒で無料鑑定 → ${SITE_URL}`,
  `✦ 運命数を調べる → ${SITE_URL}`,
  `👇 生年月日だけで鑑定\n${SITE_URL}`,
  `✦ あなたの数字を知る → ${SITE_URL}`,
  `→ 無料で運命を読み解く\n${SITE_URL}`,
];

// ── Content generation ──

function pickAngle(dayOfYear: number, hour: number): typeof CONTENT_ANGLES[0] {
  // Different angle for each time slot, rotated daily
  const slotIndex = Math.floor(hour / 5); // 0-4 time slots
  const idx = (dayOfYear * 5 + slotIndex) % CONTENT_ANGLES.length;
  return CONTENT_ANGLES[idx];
}

function pickFormat(dayOfYear: number, hour: number): string {
  const idx = (dayOfYear * 3 + hour) % FORMAT_INSTRUCTIONS.length;
  return FORMAT_INSTRUCTIONS[idx];
}

function pickCTA(dayOfYear: number): string {
  return CTA_VARIANTS[dayOfYear % CTA_VARIANTS.length];
}

async function generateTweet(todayNumber: number, dayOfYear: number, hour: number): Promise<string> {
  const angle = pickAngle(dayOfYear, hour);
  const format = pickFormat(dayOfYear, hour);
  const cta = pickCTA(dayOfYear);
  const today = new Date();
  const dateStr = `${today.getMonth() + 1}月${today.getDate()}日`;
  const randomNum = Math.floor(Math.random() * 9) + 1;

  const prompt = `あなたはカバラ数秘術の専門家で、X(Twitter)でフォロワー5万人の人気アカウントを運営しています。

## 今回の投稿テーマ
- アングル: ${angle.hook}
- 今日の日付: ${dateStr}
- 今日の数秘エネルギー: ${todayNumber}
- ランダム運命数（必要なら使用）: ${randomNum}

## フォーマット指示
${format}

## ルール（厳守）
1. 冒頭に「${angle.emoji} ${angle.hook}」を入れる
2. 最後に改行して以下のCTAを入れる: ${cta}
3. 全体で240文字以内（CTA含む）
4. ハッシュタグは入れない
5. アスタリスク(*)は絶対に使わない
6. 前回と全く違う切り口・構成で書く
7. 占い特有の神秘的すぎる表現は避け、日常的で親しみやすいトーンにする
8. 具体的で行動に移せるメッセージを含める
9. 「数秘術」という言葉を毎回使わない。「カバラ」「運命数」「数の力」など表現を変える

## 参考：バズりやすい占いツイートの特徴
- 「○○な人は△△」という断定的な書き出し
- 自分に当てはまるか確認したくなる内容
- 思わず友達にシェアしたくなる意外性
- 短い文で余韻を残す
- 「あるある」的な共感ポイント

この条件で投稿文だけを出力してください。説明や前置きは不要。`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        temperature: 1.2, // High creativity for diversity
        topP: 0.95,
      },
    });
    let text = (response.text || '').trim();
    // Clean up any markdown artifacts
    text = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/^["「]|["」]$/g, '');
    return text;
  } catch {
    return getFallbackTweet(dayOfYear, todayNumber);
  }
}

// ── Fallback tweets (diverse pool) ──

const FALLBACK_POOL = [
  `🌅 今朝のオラクルメッセージ\n\n今日は「始まり」のエネルギーが強い日。\n\n小さくてもいいから、何か新しいことを1つ始めてみて。朝のコーヒーを違うカップで飲む、それだけでも流れが変わります。\n\n✦ あなたの運命数は？→ ${SITE_URL}`,
  `💪 運命数別・隠された才能\n\n運命数3の人は「言葉の魔術師」。\n\n何気ない一言で人を笑顔にできる天性の才能があります。でも本人は気づいていないことが多い。\n\nあなたの運命数は3ですか？\n\n✦ 30秒で無料鑑定 → ${SITE_URL}`,
  `🫣 運命数7の人あるある\n\n・考えすぎて3時間溶ける\n・「なんでそんなこと知ってるの？」と言われがち\n・一人の時間が最高のご褒美\n\n当てはまった？\n\n✦ 運命数を調べる → ${SITE_URL}`,
  `⚡ テスラの3-6-9理論\n\n天才発明家テスラは言いました。\n「3,6,9の壮大さを知れば、宇宙の鍵を手にする」\n\nホテルの部屋は必ず3で割れる番号。食事も3回噛み直す。\n偏執か、真理か。\n\n✦ あなたの数字を知る → ${SITE_URL}`,
  `💕 運命数別・恋愛のクセ\n\n運命数2の人は「察する天才」。\n\n相手の気持ちを言葉にされる前に感じ取れる。ただし、察しすぎて自分の気持ちを後回しにする傾向も。\n\n→ 無料で運命を読み解く\n${SITE_URL}`,
  `🔮 今日の数秘エネルギー\n\n今日は直感が冴える日。\n\nふと目に入った本、たまたま聞こえた曲、偶然の出会い。今日の「たまたま」は、たまたまじゃないかも。\n\n✦ あなたの運命数は？→ ${SITE_URL}`,
  `🤔 数秘クイズ\n\nQ. 次のうち、運命数「1」の有名人は？\n\nA) 孫正義\nB) イチロー\nC) 松本人志\n\n正解は…Aの孫正義。\n「1」は生まれながらのパイオニア。\n\n✦ 30秒で無料鑑定 → ${SITE_URL}`,
  `🌙 今夜の振り返り数秘\n\n今日、何か「違和感」を感じた瞬間はありましたか？\n\n数秘術では、違和感は「魂のナビ」。見て見ぬふりをせず、その感覚を信じてみてください。\n\n✦ あなたの運命数は？→ ${SITE_URL}`,
];

function getFallbackTweet(dayOfYear: number, _todayNumber: number): string {
  return FALLBACK_POOL[dayOfYear % FALLBACK_POOL.length];
}

// ── Cron handler ──

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const hour = getJSTHour();
    const todayNumber = getTodayNumber();
    const dayOfYear = getDayOfYear();
    const angle = pickAngle(dayOfYear, hour);

    const tweetText = await generateTweet(todayNumber, dayOfYear, hour);

    // Post to X
    const result = await getTwitterClient().v2.tweet(tweetText);

    return NextResponse.json({
      success: true,
      angle: angle.hook,
      todayNumber,
      dayOfYear,
      tweetId: result.data.id,
      text: tweetText,
    });
  } catch (error: any) {
    console.error('Tweet error:', error);
    const errDetail = error?.data ? JSON.stringify(error.data) : error.message;
    return NextResponse.json({ error: errDetail, code: error?.code, rateLimit: error?.rateLimit }, { status: 500 });
  }
}
