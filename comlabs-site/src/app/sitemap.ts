import type { MetadataRoute } from 'next';
import { articles } from '@/config/content';
import { siteConfig } from '@/config/site';

const staticRoutes = [
  { path: '/', priority: 1 },
  { path: '/pricing', priority: 0.9 },
  { path: '/resources', priority: 0.8 },
  { path: '/contact', priority: 0.7 },
  { path: '/mcp', priority: 0.7 },
  { path: '/privacy', priority: 0.3 },
  { path: '/terms', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route.path, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: route.priority,
    })),
    ...articles.map((article) => ({
      url: new URL(`/resources/${article.slug}`, siteConfig.url).toString(),
      lastModified: new Date(article.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
