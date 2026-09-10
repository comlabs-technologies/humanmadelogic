import type { Metadata } from 'next';
import { HomePage } from '@/components/hml/HomePage';
import { agency, hero } from '@/config/agency';

export const metadata: Metadata = {
  title: `${agency.name} — Marketing and design agency`,
  description: hero.body,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: `${agency.name} — ${agency.principle}`,
    description: hero.body,
    siteName: agency.name,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${agency.name} — ${agency.principle}`,
    description: hero.body,
  },
};

export default function Page() {
  return <HomePage />;
}
