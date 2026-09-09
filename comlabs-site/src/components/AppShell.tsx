'use client';

import { usePathname } from 'next/navigation';
import { AnnouncementBar, Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

/**
 * The homepage is a standalone agency site with its own header, main and
 * footer, so it opts out of the shared chrome used by the inner pages.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const isHome = usePathname() === '/';

  if (isHome) return <>{children}</>;

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
