'use client';

import React from 'react';
import { Button } from './Button';

export function CTASection() {
  return (
    <section className="py-section-mobile md:py-section-desktop">
      <div className="max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop">
        <div className="bg-wine rounded-card p-8 md:p-16 text-center">
          <h2 className="text-heading-xl md:text-display font-medium text-surface mb-6 leading-tight tracking-tight">
            Build interfaces that feel authored
          </h2>
          <p className="text-body-lg text-lilac/80 max-w-[560px] mx-auto mb-10 leading-relaxed">
            Join teams at Vercel, Linear, and Raycast who ship polished interfaces 
            faster with Comlabs. Precision components, purposeful motion, editorial restraint.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="#get-started" size="large" className="bg-surface text-wine hover:bg-surface/90">
              Get started
            </Button>
            <Button 
              variant="secondary" 
              href="#pricing" 
              size="large"
              className="border-white/30 text-surface hover:bg-white/10 bg-transparent"
            >
              View pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
