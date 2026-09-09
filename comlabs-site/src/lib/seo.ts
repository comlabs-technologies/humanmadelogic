import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

/**
 * One place to build page metadata. Every route calls this so titles,
 * descriptions, canonicals and Open Graph tags stay consistent.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  type = 'website',
  publishedTime,
}: {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
}): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = `${title} — ${siteConfig.titleSuffix}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'en_US',
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}
