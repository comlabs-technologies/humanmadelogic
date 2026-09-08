'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from './Button';

const navLinks = [
  { href: '#suite', label: 'Products', chevron: true },
  { href: '#enterprise', label: 'Solutions', chevron: true },
  { href: '#go', label: 'AI', chevron: true },
  { href: '#resources', label: 'Resources', chevron: true },
  { href: '#pricing', label: 'Pricing', chevron: false },
  { href: '#love', label: 'Love', chevron: false },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-line">
        <nav className="max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop h-16 flex items-center justify-between">
          <Link href="/" className="font-sans text-[15px] font-semibold tracking-tight text-ink">
            SUPERHUMAN
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-secondary text-[14px] tracking-tight text-ink/80 hover:text-ink inline-flex items-center gap-1"
              >
                {link.label}
                {link.chevron && <ChevronDown size={14} className="text-ink/50" />}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="#contact"
              className="font-secondary text-[14px] tracking-tight text-ink/80 hover:text-ink"
            >
              Contact sales
            </Link>
            <Button href="#signin" variant="secondary" size="default" className="h-9 px-4 text-[14px]">
              Sign in
              <ChevronDown size={14} />
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-ink"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-canvas/95" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative h-full flex flex-col pt-6 px-gutter-mobile">
            <div className="flex justify-between items-center mb-10">
              <span className="font-sans text-[15px] font-semibold tracking-tight">SUPERHUMAN</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2" aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-sans text-heading-md text-ink"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Button href="#contact" variant="secondary">
                  Contact sales
                </Button>
                <Button href="#signin">Sign in</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
