import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Superhuman — Superpowers, everywhere you work',
  description: 'Mail, Docs, and AI that works in every app and tab.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans tracking-tight">{children}</body>
    </html>
  );
}
