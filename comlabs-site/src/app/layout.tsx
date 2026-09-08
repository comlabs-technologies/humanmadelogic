import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Comlabs UI Library - Precision with atmosphere',
  description: 'Premium motion components, product UI scenes, and landing-page blocks for frontend engineers building with Cursor, Claude Code, and v0.',
  keywords: ['UI library', 'React components', 'design system', 'motion components', 'AI tools'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
