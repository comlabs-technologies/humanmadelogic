'use client';

import React from 'react';
import { Button } from './Button';
import { ChevronRight } from 'lucide-react';
import { EditorialImage } from './EditorialImage';
import { HeroProductScene } from './HeroProductScene';
import { editorialImages } from '@/lib/editorialImages';

export function Hero() {
  return (
    <section className="relative bg-canvas pt-[72px] lg:pt-0 lg:min-h-screen">
      <div className="relative aspect-[4/5] lg:absolute lg:inset-0 lg:aspect-auto bg-canvas overflow-hidden">
        <EditorialImage
          src={editorialImages.hero}
          alt="Concrete architecture with sunlight and shadows"
          className="hero-photo absolute inset-0 w-full h-full object-cover"
          priority
        />
        <div
          className="hidden lg:block absolute inset-y-0 left-0 w-[46%] pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(242,240,235,0.96) 0%, rgba(242,240,235,0.82) 38%, rgba(242,240,235,0.28) 72%, rgba(242,240,235,0) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop pt-8 pb-8 lg:pt-36 lg:pb-24 lg:min-h-screen lg:flex lg:items-center">
        <div className="w-full lg:w-[34%] lg:max-w-[420px]">
          <p className="font-secondary text-label text-muted uppercase tracking-tight mb-6">
            Comlabs UI Library
          </p>
          <h1 className="font-sans text-display md:text-heading-lg font-medium leading-tight tracking-tight text-ink mb-6">
            Interfaces with precision. Presence with atmosphere.
          </h1>
          <p className="font-secondary text-body-lg text-muted max-w-[480px] mb-8 leading-relaxed tracking-tight">
            Comlabs gives teams motion components, product UI scenes, and landing-page
            building blocks that make AI-built applications feel authored—not generated.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="#components" size="large">
              Explore components
            </Button>
            <Button variant="link" href="#showcase" className="items-center gap-2">
              View the showcase
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-20 max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop pb-12 lg:max-w-none lg:mx-0 lg:px-0 lg:pb-0 lg:absolute lg:right-[5%] lg:bottom-[8%] lg:w-[26%] lg:max-w-[340px]">
        <HeroProductScene />
      </div>
    </section>
  );
}
