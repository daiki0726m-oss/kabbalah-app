import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  weight: ["400", "500", "700"],
  display: "swap",
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

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "カバラ数秘術",
  "description": "4,000年の叡智が、あなたの運命を生年月日から解読。無料で鑑定書を生成します。",
  "url": "https://kabbalah-app-ruddy.vercel.app",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "Web",
  "offers": [
    { "@type": "Offer", "name": "無料鑑定", "price": "0", "priceCurrency": "JPY" },
    { "@type": "Offer", "name": "スタンダード鑑定", "price": "980", "priceCurrency": "JPY" },
    { "@type": "Offer", "name": "プレミアム鑑定", "price": "2980", "priceCurrency": "JPY" }
  ],
  "provider": {
    "@type": "Organization",
    "name": "株式会社Life Navigation",
    "address": { "@type": "PostalAddress", "addressCountry": "JP", "addressRegion": "東京都", "addressLocality": "港区南青山" }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body
        className={`${notoSansJP.variable} ${notoSerifJP.variable} font-sans antialiased text-[#BEB5A5] bg-[#0C0A14]`}
      >
        {children}
        {/* Google Analytics */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
      </body>
    </html>
  );
}
