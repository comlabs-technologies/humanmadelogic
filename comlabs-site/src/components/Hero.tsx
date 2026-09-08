'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from './Button';
import { ChevronRight, Command, Layers, Settings2 } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen pt-20">
      {/* Background cinematic image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2400"
          alt="Sunlit architectural workspace with warm natural light"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Warm overlay to integrate with parchment canvas */}
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/90 via-canvas/70 to-canvas" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop pt-section-mobile md:pt-section-desktop">
        <div className="max-w-[720px]">
          {/* Eyebrow */}
          <p className="text-label text-muted uppercase tracking-wide mb-6">
            Comlabs UI Library
          </p>

          {/* Headline */}
          <h1 className="text-display md:text-heading-lg font-medium leading-tight tracking-tight text-ink mb-6">
            Interfaces with precision. Presence with atmosphere.
          </h1>

          {/* Supporting copy */}
          <p className="text-body-lg text-muted max-w-[480px] mb-8 leading-relaxed">
            Comlabs gives teams motion components, product UI scenes, and landing-page 
            building blocks that make AI-built applications feel authored—not generated.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
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

      {/* Floating Product UI Panel */}
      <div className="hidden lg:block absolute right-[10%] bottom-[15%] z-20">
        <div className="bg-surface rounded-card p-4 border border-line w-[420px]">
          {/* Panel Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-line">
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-muted" />
              <span className="text-label text-ink">Component Inspector</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-lagoon/30" />
              <div className="w-2 h-2 rounded-full bg-lilac/50" />
            </div>
          </div>

          {/* Panel Content - Command Palette Style */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-small bg-canvas/50">
              <Command size={16} className="text-muted" />
              <span className="text-body text-ink">Motion: Fade In</span>
              <span className="ml-auto text-label text-muted">⌘K</span>
            </div>
            
            <div className="flex items-center gap-3 p-2 rounded-small hover:bg-canvas/50 transition-colors cursor-pointer">
              <Settings2 size={16} className="text-muted" />
              <span className="text-body text-ink">Duration</span>
              <span className="ml-auto text-label text-violet">200ms</span>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-small hover:bg-canvas/50 transition-colors cursor-pointer">
              <div className="w-4 h-4 rounded-small bg-lilac flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-wine" />
              </div>
              <span className="text-body text-ink">Easing</span>
              <span className="ml-auto text-label text-violet">ease-out</span>
            </div>

            {/* Status indicator */}
            <div className="mt-4 pt-3 border-t border-line flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-wine" />
              <span className="text-label text-muted">Ready to export</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Panel below content */}
      <div className="lg:hidden relative z-10 max-w-container mx-auto px-gutter-mobile mt-8">
        <div className="bg-surface rounded-card p-4 border border-line">
          <div className="flex items-center gap-2 mb-3">
            <Command size={16} className="text-muted" />
            <span className="text-label text-ink">Quick Actions</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-small bg-canvas/50">
            <span className="text-body text-ink">Motion preset</span>
            <span className="text-label text-violet">Fade In · 200ms</span>
          </div>
        </div>
      </div>
    </section>
  );
}
