import { MetadataRoute } from 'next';

const BASE_URL = 'https://kabbalah-app-ruddy.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/subscribe`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/members/daily`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/members/compatibility`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/result`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/legal/tokushouhou`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/legal/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/legal/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Blog articles
  const blogArticles: MetadataRoute.Sitemap = [
    'what-is-kabbalah',
    'how-to-calculate',
    'destiny-numbers',
  ].map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Destiny number deep-dive articles (1-9)
  const destinyArticles: MetadataRoute.Sitemap = Array.from({ length: 9 }, (_, i) => ({
    url: `${BASE_URL}/blog/destiny-number/${i + 1}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...mainPages, ...blogArticles, ...destinyArticles];
}
