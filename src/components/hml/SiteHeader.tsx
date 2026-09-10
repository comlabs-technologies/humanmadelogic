'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { agency } from '@/config/agency';

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <span
        aria-hidden="true"
        className="h-[7px] w-[7px] shrink-0 rounded-full bg-signalYellow"
      />
      <span className="text-[14px] font-medium tracking-[-0.03em]">
        {compact ? agency.shortName : agency.name}
      </span>
    </span>
  );
}

/**
 * Full-width navigation at the top of the page that collapses into a compact
 * floating pill once you scroll. Both states are rendered in the same fixed
 * container and cross-faded, so nothing in the document reflows.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const home = pathname === '/';
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const wordmarkHref = home ? '#top' : '/';

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setCondensed(window.scrollY > 120);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const close = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Full navigation — visible at the top of the page. */}
      <div
        className={`pointer-events-auto mx-auto flex max-w-editorial items-center justify-between gap-6 px-5 py-5 transition-[opacity,transform] duration-500 ease-out sm:px-8 lg:px-12 ${
          condensed
            ? 'pointer-events-none -translate-y-2 opacity-0'
            : 'translate-y-0 opacity-100'
        }`}
      >
        <a href={wordmarkHref} className="rounded-sm">
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {agency.nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[14px] text-slate transition-colors hover:text-obsidian"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <span className="flex items-center gap-2 text-[13px] text-slate">
            <span
              aria-hidden="true"
              className="h-[6px] w-[6px] rounded-full bg-signalYellow"
            />
            {agency.availability}
          </span>
          <a
            href={agency.cta.href}
            className="inline-flex h-11 items-center rounded-full bg-obsidian px-5 text-[14px] font-medium text-paper transition-colors hover:bg-obsidian/85"
          >
            {agency.cta.label}
          </a>
        </div>

        <button
          ref={menuButton}
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-controls="hml-menu"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-obsidian/20 px-4 text-[14px] lg:hidden"
        >
          Menu
        </button>
      </div>

      {/* Condensed pill — takes over once the page scrolls. */}
      <div
        className={`pointer-events-auto absolute right-5 top-4 flex items-center gap-1 rounded-full border border-obsidian/10 bg-paper/85 p-1.5 shadow-[0_10px_40px_-18px_rgba(21,21,21,0.5)] backdrop-blur-md transition-[opacity,transform] duration-500 ease-out sm:right-8 lg:right-12 ${
          condensed ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
        }`}
      >
        <a href={wordmarkHref} className="rounded-full px-3 py-2" aria-label={`${agency.name} — back to top`}>
          <Wordmark compact />
        </a>

        <nav aria-label="Primary, condensed" className="hidden items-center gap-1 lg:flex">
          {agency.nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-3 py-2 text-[13px] text-slate transition-colors hover:bg-obsidian/[0.06] hover:text-obsidian"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={agency.cta.href}
          className="hidden h-10 items-center rounded-full bg-obsidian px-4 text-[13px] font-medium text-paper transition-colors hover:bg-obsidian/85 lg:inline-flex"
        >
          {agency.cta.label}
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-controls="hml-menu"
          className="inline-flex h-10 items-center rounded-full border border-obsidian/15 px-4 text-[13px] lg:hidden"
        >
          Menu
        </button>
      </div>

      {/* Full-screen editorial menu. */}
      <div
        id="hml-menu"
        aria-hidden={!menuOpen}
        className={`pointer-events-auto fixed inset-0 z-[60] flex-col bg-paper lg:hidden ${
          menuOpen ? 'flex' : 'hidden'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 sm:px-8">
          <Wordmark />
          <button
            type="button"
            onClick={close}
            className="inline-flex h-11 items-center rounded-full border border-obsidian/20 px-4 text-[14px]"
          >
            Close
          </button>
        </div>

        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-5 sm:px-8">
          <ul>
            {agency.nav.map((item, index) => (
              <li key={item.label} className="border-b border-obsidian/10 first:border-t">
                <a
                  href={item.href}
                  onClick={close}
                  className="block py-5 text-[13vw] leading-[1.02] tracking-[-0.05em] sm:text-[64px]"
                  style={{
                    transitionDelay: `${60 + index * 45}ms`,
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(14px)',
                    transitionProperty: 'opacity, transform',
                    transitionDuration: '520ms',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={agency.cta.href}
            onClick={close}
            className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-obsidian px-6 text-[16px] font-medium text-paper"
          >
            {agency.cta.label}
          </a>
        </nav>

        <p className="px-5 pb-8 text-[13px] text-slate sm:px-8">
          {agency.availability} · {agency.email}
        </p>
      </div>
    </header>
  );
}
