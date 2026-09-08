'use client';

import React from 'react';
import { Button } from './Button';
import { ArrowRight } from 'lucide-react';

export function EditorialSplit() {
  return (
    <section className="py-section-mobile md:py-section-desktop">
      <div className="max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: Large statement */}
          <div>
            <h2 className="text-heading-xl font-medium leading-tight tracking-tight text-ink">
              AI can generate a layout. It cannot give it taste.
            </h2>
          </div>

          {/* Right: Explanation + link */}
          <div className="pt-4 md:pt-0">
            <p className="text-body-lg text-muted mb-6 leading-relaxed">
              Comlabs bridges the gap between functional and exceptional. Our components 
              carry the subtle decisions—the spacing rhythm, the motion timing, the 
              typographic hierarchy—that separate competent interfaces from memorable ones.
            </p>
            <p className="text-body text-muted mb-8 leading-relaxed">
              Every element is authored by designers who understand that precision isn't 
              just about alignment—it's about atmosphere, credibility, and the feeling 
              that someone cared enough to get it right.
            </p>
            <Button variant="link" href="#system" className="inline-flex items-center gap-2 group">
              Discover the system
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
