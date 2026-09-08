'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from './Button';
import { Play, Pause } from 'lucide-react';

export function LagoonFeature() {
  return (
    <section className="py-section-mobile md:py-section-desktop bg-lagoon">
      <div className="max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Layered abstract composition */}
          <div className="relative">
            <div className="aspect-square md:aspect-[4/5] rounded-card overflow-hidden border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1507643179173-617d654551a3?auto=format&fit=crop&q=80&w=1200"
                alt="Abstract architectural detail with layered shadows"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay for integration */}
              <div className="absolute inset-0 bg-lagoon/20" />
            </div>
            
            {/* Floating interaction card */}
            <div className="hidden md:block absolute -right-6 -bottom-6 bg-surface rounded-card p-4 border border-line w-[280px]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-label text-muted uppercase tracking-wide">Motion preview</span>
                <div className="flex gap-1">
                  <button className="p-1.5 hover:bg-canvas rounded-small transition-colors" aria-label="Play">
                    <Play size={14} className="text-ink" />
                  </button>
                  <button className="p-1.5 hover:bg-canvas rounded-small transition-colors" aria-label="Pause">
                    <Pause size={14} className="text-ink" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-1 bg-canvas rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-wine rounded-full" />
                </div>
                <div className="flex justify-between text-label text-muted">
                  <span>Enter</span>
                  <span>200ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <p className="text-label text-lilac/70 uppercase tracking-wide mb-4">
              Motion system
            </p>
            <h2 className="text-heading-xl font-medium leading-tight text-surface mb-6">
              Motion that makes state feel real
            </h2>
            <p className="text-body-lg text-lilac/80 mb-8 leading-relaxed">
              Transitions aren't decoration—they're orientation. Comlabs motion components 
              use purposeful timing and easing to clarify what changed, where it came from, 
              and what it means. The result interfaces that feel responsive without being 
              frantic, deliberate without being slow.
            </p>
            <Button 
              variant="secondary" 
              href="#motion"
              className="border-white/30 text-surface hover:bg-white/10"
            >
              Explore motion presets
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
