import React from 'react';
import Link from 'next/link';
import { footerColumns, siteConfig } from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-footer text-white overflow-hidden">
      <div className="relative z-10 max-w-container mx-auto px-gutter-mobile sm:px-gutter-tablet lg:px-gutter-desktop pt-14 lg:pt-20 pb-10">
        <div className="grid lg:grid-cols-[1.1fr_2.4fr] gap-10 lg:gap-16">
          <div className="max-w-[280px]">
            <span className="inline-flex items-baseline gap-1.5">
              <span
                aria-hidden="true"
                className="inline-block w-[7px] h-[7px] rounded-[2px] bg-white/70 translate-y-[-1px]"
              />
              <span className="font-display text-[17px] font-semibold tracking-[-0.045em]">
                {siteConfig.name}
              </span>
            </span>
            <p className="text-body text-white/55 mt-4">{siteConfig.tagline}</p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-block text-[13px] text-white/70 hover:text-white mt-5 underline underline-offset-4 decoration-white/25"
            >
              {siteConfig.contactEmail}
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-micro uppercase tracking-[0.12em] text-white/40 mb-4">
                  {column.title}
                </h2>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[14px] tracking-tight text-white/75 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-[12px] text-white/45">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="text-[12px] text-white/45">{siteConfig.builtByLabel}</p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="footer-watermark px-gutter-mobile sm:px-gutter-tablet lg:px-gutter-desktop pb-3 whitespace-nowrap overflow-hidden"
      >
        {siteConfig.name.toUpperCase()}
      </div>
    </footer>
  );
}
