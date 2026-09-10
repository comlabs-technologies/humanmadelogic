'use client';

import { usePathname } from 'next/navigation';
import { AnnouncementBar, Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

/**
 * Homepage, contact, MCP and admin use the Human Made Logic chrome.
 * Remaining Relay template routes keep the shared announcement bar and footer.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHml =
    pathname === '/' ||
    pathname === '/contact' ||
    pathname === '/mcp' ||
    pathname === '/admin' ||
    pathname.startsWith('/admin/');

  if (isHml) return <>{children}</>;

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AnnouncementBar />
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
