'use client';

import React from 'react';
import { Button } from './Button';
import { ArrowRight } from 'lucide-react';
import { EditorialImage } from './EditorialImage';
import { ProductInspector } from './ProductInspector';
import { MotionStateCard } from './MotionStateCard';
import { editorialImages } from '@/lib/editorialImages';

export function FeatureRows() {
  return (
    <div>
      <section id="scenes" className="py-section-mobile md:py-section-desktop">
        <div className="max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-start">
            <div>
              <div className="relative aspect-[5/6] w-full bg-canvas overflow-hidden rounded-card">
                <EditorialImage
                  src={editorialImages.productScenes}
                  alt="Sunlit hallway with geometric shadows on the floor"
                  className="absolute inset-0 w-full h-full object-cover"
                  objectPosition="center"
                />
              </div>
            </div>

            <div className="md:pt-4">
              <p className="font-secondary text-label text-muted uppercase tracking-tight mb-4">
                Product UI scenes
              </p>
              <h3 className="font-sans text-heading-lg font-medium text-ink mb-4 leading-tight tracking-tight">
                Interfaces that feel like software
              </h3>
              <p className="font-secondary text-body-lg text-muted mb-8 leading-relaxed tracking-tight">
                Pre-composed sections for settings, onboarding, approvals, and data entry.
                Each scene carries the subtle decisions—spacing rhythm, label hierarchy,
                state indicators—that make interfaces feel authored.
              </p>
              <ProductInspector />
            </div>
          </div>
        </div>
      </section>

      <section id="motion" className="py-section-mobile md:py-section-desktop">
        <div className="max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
            <div className="relative">
              <div className="relative aspect-[5/6] md:aspect-[4/5] bg-canvas overflow-hidden rounded-card">
                <EditorialImage
                  src={editorialImages.motion}
                  alt="Brutalist architecture with arched ceilings and sunlight"
                  className="absolute inset-0 w-full h-full object-cover"
                  objectPosition="center"
                />
              </div>
              <div className="absolute right-4 bottom-4 md:right-5 md:bottom-5">
                <MotionStateCard />
              </div>
            </div>

            <div>
              <p className="font-secondary text-label text-muted uppercase tracking-tight mb-4">
                Purposeful motion
              </p>
              <h3 className="font-sans text-heading-lg font-medium text-ink mb-4 leading-tight tracking-tight">
                Motion that makes state feel real
              </h3>
              <p className="font-secondary text-body-lg text-muted mb-6 leading-relaxed tracking-tight">
                Transitions are orientation, not decoration. Comlabs motion components use
                200ms fades and modest translation to clarify what changed, where it came
                from, and what it means—responsive without frenzy.
              </p>
              <Button variant="link" href="#motion-details" className="inline-flex items-center gap-2 group">
                Explore motion presets
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="blocks" className="py-section-mobile md:py-section-desktop">
        <div className="max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop">
          <div className="max-w-[640px]">
            <p className="font-secondary text-label text-muted uppercase tracking-tight mb-4">
              Landing-page blocks
            </p>
            <h3 className="font-sans text-heading-lg font-medium text-ink mb-4 leading-tight tracking-tight">
              Ship faster with structure
            </h3>
            <p className="font-secondary text-body-lg text-muted mb-6 leading-relaxed tracking-tight">
              Hero sections, feature grids, pricing tables, and testimonial strips—composed
              with editorial restraint. Start with proven patterns, customize with your
              content, maintain design coherence.
            </p>
            <Button variant="link" href="#blocks-details" className="inline-flex items-center gap-2 group">
              Learn more
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
