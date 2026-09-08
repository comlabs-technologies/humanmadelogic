'use client';

import React from 'react';
import { Button } from './Button';
import { EditorialImage } from './EditorialImage';
import { editorialImages } from '@/lib/editorialImages';

export function LagoonFeature() {
  return (
    <section className="relative overflow-hidden bg-lagoon py-section-mobile md:py-section-desktop">
      <EditorialImage
        src={editorialImages.lagoonTexture}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        objectPosition="center"
      />
      <div className="absolute inset-0 bg-lagoon/[0.84]" aria-hidden />

      <div className="relative z-10 max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="font-secondary text-label text-white/80 uppercase tracking-tight mb-4">
              Atmosphere
            </p>
            <h2 className="font-sans text-heading-xl font-medium leading-tight tracking-tight text-white mb-6">
              A quieter register for focused work
            </h2>
            <p className="font-secondary text-body-lg text-white/80 mb-8 leading-relaxed tracking-tight">
              Dark product surfaces should feel still, not theatrical. Comlabs uses this
              lagoon register for dense tools, inspector panels, and late-stage review—
              presence without glare, contrast without noise.
            </p>
            <Button
              variant="secondary"
              href="#system"
              className="border-white/30 text-white hover:bg-white/10 bg-transparent"
            >
              See the system
            </Button>
          </div>

          <div className="flex md:justify-end">
            <div className="bg-surface rounded-card border border-line w-full max-w-[320px] p-4">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-line">
                <span className="font-sans text-label tracking-tight text-ink">Review state</span>
                <span className="font-secondary text-label tracking-tight text-muted">Live</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-secondary text-body tracking-tight text-muted">Status</span>
                  <span className="font-secondary text-body tracking-tight text-ink">Approved</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-secondary text-body tracking-tight text-muted">Contrast</span>
                  <span className="font-secondary text-body tracking-tight text-ink">Restrained</span>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-line">
                  <span className="w-1.5 h-1.5 rounded-full bg-lagoon" />
                  <span className="font-secondary text-label tracking-tight text-muted">
                    Overlay at 84%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
