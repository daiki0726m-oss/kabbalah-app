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
  title: "カバラ数秘術 | プレミアム運命鑑定",
  description: "古代ユダヤの秘術を用いて、あなたの本当の才能と運命の転換期を紐解きます。数十年の研鑽を積んだ熟練の鑑定士による本物の占い。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${notoSerifJP.variable} font-sans antialiased text-slate-800 bg-[#FAF9F6]`}
      >
        {children}
      </body>
    </html>
  );
}
