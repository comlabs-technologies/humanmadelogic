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
  noindex = false,
}: {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  /** Keeps a page out of the index — used by the leftover template routes. */
  noindex?: boolean;
}): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = `${title} — ${siteConfig.titleSuffix}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
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
