import type { Metadata, Viewport } from 'next';
import { Archivo, Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/components/AppShell';
import { siteConfig } from '@/config/site';

/* Self-hosted at build time — no third-party font request at runtime. */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-serif',
});

/* Grotesk used by the Human Made Logic homepage. */
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grotesk',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.titleSuffix}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'marketing agency',
    'design agency',
    'brand identity',
    'product photography',
    'video production',
    'creative direction',
    'ecommerce design',
    'branding studio',
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  alternates: { canonical: '/' },
  referrer: 'origin-when-cross-origin',
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'Marketing and design agency',
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#f6f4ef',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${inter.variable} ${instrumentSerif.variable} ${archivo.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
