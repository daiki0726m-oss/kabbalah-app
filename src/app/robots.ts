import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/result/premium/mockup'],
    },
    sitemap: 'https://kabbalah-app-ruddy.vercel.app/sitemap.xml',
  };
}
