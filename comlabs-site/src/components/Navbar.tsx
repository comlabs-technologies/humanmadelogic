'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

const navLinks = [
  { href: '/#components', label: 'Components' },
  { href: '/#templates', label: 'Templates' },
  { href: '/#showcase', label: 'Showcase' },
  { href: '/#docs', label: 'Docs' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-200 ease-out
          ${isScrolled 
            ? 'bg-canvas/80 backdrop-blur-md border-b border-line' 
            : 'bg-canvas'}
        `}
        style={{ height: '72px' }}
      >
        <nav className="max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-wine rounded-small flex items-center justify-center">
              <span className="text-surface font-semibold text-sm">C</span>
            </div>
            <span className="font-medium text-ink tracking-tight">Comlabs</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body text-muted hover:text-ink transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="#explore" size="default">
              Explore the library
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-canvas/95 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative h-full flex flex-col pt-20 px-gutter-mobile">
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-ink"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-heading-md text-ink font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Button href="#explore" className="w-full">
                  Explore the library
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
