'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';

function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className}`}>
      <span
        aria-hidden="true"
        className="inline-block w-[7px] h-[7px] rounded-[2px] bg-moss translate-y-[-1px]"
      />
      <span className="font-display text-[17px] font-semibold tracking-[-0.045em] text-ink">
        {siteConfig.name}
      </span>
    </span>
  );
}

export function AnnouncementBar() {
  const bar = siteConfig.announcementBar;
  if (!bar) return null;

  return (
    <div className="bg-moss text-white">
      <div className="max-w-container mx-auto px-gutter-mobile sm:px-gutter-tablet lg:px-gutter-desktop min-h-[38px] flex items-center justify-center py-2">
        <Link
          href={bar.href}
          className="group inline-flex items-center gap-1.5 text-[13px] tracking-tight text-white/85 hover:text-white text-center"
        >
          {bar.label}
          <ArrowRight
            size={13}
            aria-hidden="true"
            className="shrink-0 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-canvas/92 backdrop-blur-sm border-b border-line">
        <nav
          aria-label="Primary"
          className="max-w-container mx-auto px-gutter-mobile sm:px-gutter-tablet lg:px-gutter-desktop h-16 flex items-center justify-between gap-6"
        >
          <Link href="/" aria-label={`${siteConfig.name} home`}>
            <Wordmark />
          </Link>

          <ul className="hidden lg:flex items-center gap-7">
            {siteConfig.nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-[14px] tracking-tight text-muted hover:text-ink transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button href={siteConfig.primaryCta.href}>{siteConfig.primaryCta.label}</Button>
          </div>

          <button
            type="button"
            className="lg:hidden -mr-2 p-2 text-ink"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </nav>
      </header>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-50 lg:hidden bg-canvas overflow-y-auto">
          <div className="h-16 px-gutter-mobile sm:px-gutter-tablet flex items-center justify-between border-b border-line">
            <Wordmark />
            <button
              type="button"
              className="-mr-2 p-2 text-ink"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          <div className="px-gutter-mobile sm:px-gutter-tablet py-6 overflow-y-auto h-[calc(100%-4rem)]">
            <ul className="divide-y divide-line border-y border-line">
              {siteConfig.nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-4 py-4"
                    onClick={() => setOpen(false)}
                  >
                    <span>
                      <span className="block text-[22px] tracking-[-0.03em] text-ink">
                        {item.label}
                      </span>
                      {item.hint && (
                        <span className="block text-[13px] text-subtle mt-0.5">{item.hint}</span>
                      )}
                    </span>
                    <ArrowRight size={16} className="text-subtle shrink-0" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3">
              <Button href={siteConfig.primaryCta.href} size="large">
                {siteConfig.primaryCta.label}
              </Button>
              <Button href={siteConfig.secondaryCta.href} variant="secondary" size="large">
                {siteConfig.secondaryCta.label}
              </Button>
            </div>

            <p className="mt-8 text-[13px] text-subtle">{siteConfig.contactEmail}</p>
          </div>
        </div>
      )}
    </>
  );
}
