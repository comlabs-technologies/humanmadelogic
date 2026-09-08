'use client';

import React from 'react';
import { Quote } from 'lucide-react';

export function TestimonialSection() {
  return (
    <section className="py-section-mobile md:py-section-desktop border-t border-line">
      <div className="max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop">
        <div className="max-w-[800px] mx-auto text-center">
          <Quote size={32} className="mx-auto text-muted mb-8 opacity-50" />
          
          <blockquote className="text-heading-xl md:text-display font-medium text-ink leading-tight tracking-tight mb-8">
            Comlabs transformed how our team ships interfaces. What used to take days of 
            refinement now ships in hours—and it still feels authored, not assembled.
          </blockquote>
          
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-lilac flex items-center justify-center overflow-hidden">
              <span className="text-body font-medium text-ink">SK</span>
            </div>
            <div className="text-left">
              <p className="text-body font-medium text-ink">Sarah Kim</p>
              <p className="text-label text-muted">Head of Design, Vercel</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
