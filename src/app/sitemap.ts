import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Only the real, public Human Made Logic pages.
 *
 * The Relay template routes that still ship in this repository (/pricing,
 * /resources, /privacy, /terms) carry demo copy and are deliberately left
 * out and marked `noindex` until they are either rewritten or removed.
 */
const routes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: new URL(route.path, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
