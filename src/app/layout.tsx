import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  weight: ["300", "400", "500", "700"],
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "カバラ数秘術 | 4,000年の叡智が、あなたの運命を解読する",
  description: "生年月日だけで、隠された才能・人生の転機・運命の日を解き明かす。ピタゴラスやテスラも信じた数の法則が、あなた専用の鑑定書を無料で生成します。",
  openGraph: {
    title: "カバラ数秘術 | あなたの生年月日に眠る魂の暗号",
    description: "4,000年の叡智が証明する、数が人生を変える力。名前と生年月日だけで数万文字のパーソナル鑑定書を無料でお届けします。",
    images: [{ url: "/images/ogp.png", width: 1200, height: 630 }],
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "カバラ数秘術 | あなたの魂の暗号を解読する",
    description: "生年月日だけで人生の設計図が明らかに。無料で鑑定書を受け取れます。",
    images: ["/images/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${notoSerifJP.variable} font-sans antialiased text-[#BEB5A5] bg-[#0C0A14]`}
      >
        {children}
      </body>
    </html>
  );
}
