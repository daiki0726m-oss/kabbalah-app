import type { Metadata } from "next";

const NUMBER_META: Record<string, { title: string; description: string; keyword: string }> = {
  "1": {
    title: "運命数1の性格・才能・相性・適職｜カバラ数秘術",
    description: "カバラ数秘術における運命数1「王冠（ケテル）」の性格特徴、光と影、隠された才能、相性の良い運命数、向いている職業を徹底解説。スティーブ・ジョブズも持つ開拓者の魂。",
    keyword: "運命数1",
  },
  "2": {
    title: "運命数2の性格・才能・相性・適職｜カバラ数秘術",
    description: "カバラ数秘術における運命数2「知恵（コクマー）」の性格特徴、光と影、隠された才能、相性の良い運命数、向いている職業を徹底解説。月の直感力を持つ調和の人。",
    keyword: "運命数2",
  },
  "3": {
    title: "運命数3の性格・才能・相性・適職｜カバラ数秘術",
    description: "カバラ数秘術における運命数3「理解（ビナー）」の性格特徴、光と影、隠された才能、相性の良い運命数、向いている職業を徹底解説。言葉と表現の魔術師。",
    keyword: "運命数3",
  },
  "4": {
    title: "運命数4の性格・才能・相性・適職｜カバラ数秘術",
    description: "カバラ数秘術における運命数4「慈悲（ケセド）」の性格特徴、光と影、隠された才能、相性の良い運命数、向いている職業を徹底解説。堅固な土台を築く構築者。",
    keyword: "運命数4",
  },
  "5": {
    title: "運命数5の性格・才能・相性・適職｜カバラ数秘術",
    description: "カバラ数秘術における運命数5「峻厳（ゲブラー）」の性格特徴、光と影、隠された才能、相性の良い運命数、向いている職業を徹底解説。自由を司る変革者。",
    keyword: "運命数5",
  },
  "6": {
    title: "運命数6の性格・才能・相性・適職｜カバラ数秘術",
    description: "カバラ数秘術における運命数6「美（ティファレト）」の性格特徴、光と影、隠された才能、相性の良い運命数、向いている職業を徹底解説。愛と調和の中心。",
    keyword: "運命数6",
  },
  "7": {
    title: "運命数7の性格・才能・相性・適職｜カバラ数秘術",
    description: "カバラ数秘術における運命数7「勝利（ネツァク）」の性格特徴、光と影、隠された才能、相性の良い運命数、向いている職業を徹底解説。イチローも持つ探究者の魂。",
    keyword: "運命数7",
  },
  "8": {
    title: "運命数8の性格・才能・相性・適職｜カバラ数秘術",
    description: "カバラ数秘術における運命数8「栄光（ホド）」の性格特徴、光と影、隠された才能、相性の良い運命数、向いている職業を徹底解説。無限大の豊穣の力。",
    keyword: "運命数8",
  },
  "9": {
    title: "運命数9の性格・才能・相性・適職｜カバラ数秘術",
    description: "カバラ数秘術における運命数9「基盤（イェソド）」の性格特徴、光と影、隠された才能、相性の良い運命数、向いている職業を徹底解説。完成と博愛のエネルギー。",
    keyword: "運命数9",
  },
  "11": {
    title: "マスターナンバー11の性格・才能・相性・適職｜カバラ数秘術",
    description: "カバラ数秘術におけるマスターナンバー11「ダアト（知識の門）」の性格特徴、光と影、隠された才能、相性の良い運命数、向いている職業を徹底解説。見えない世界を知覚する力。",
    keyword: "マスターナンバー11",
  },
  "22": {
    title: "マスターナンバー22の性格・才能・相性・適職｜カバラ数秘術",
    description: "カバラ数秘術におけるマスターナンバー22「マルクト（王国の創造者）」の性格特徴、光と影、隠された才能、相性の良い運命数、向いている職業を徹底解説。壮大なビジョンを現実化する力。",
    keyword: "マスターナンバー22",
  },
  "33": {
    title: "マスターナンバー33の性格・才能・相性・適職｜カバラ数秘術",
    description: "カバラ数秘術におけるマスターナンバー33「ツィムツーム（聖なる教師）」の性格特徴、光と影、隠された才能、相性の良い運命数、向いている職業を徹底解説。無条件の愛を体現する存在。",
    keyword: "マスターナンバー33",
  },
};

export async function generateMetadata({ params }: { params: { number: string } }): Promise<Metadata> {
  const meta = NUMBER_META[params.number];
  if (!meta) {
    return { title: "ページが見つかりません｜カバラ数秘術" };
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: [meta.keyword, "カバラ数秘術", "運命数", "性格", "相性", "適職", "有名人"],
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
      siteName: "カバラ数秘術 - 魂の暗号を解読する",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: `https://kabbalah-app.vercel.app/destiny/${params.number}`,
    },
  };
}

export default function DestinyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
