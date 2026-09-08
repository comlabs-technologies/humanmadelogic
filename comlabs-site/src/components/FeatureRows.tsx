'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from './Button';
import { ArrowRight, Sparkles, Move, Layout } from 'lucide-react';

const features = [
  {
    id: 'scenes',
    eyebrow: 'Product UI scenes',
    title: 'Interfaces that feel like software',
    description: 'Pre-composed sections for settings, onboarding, approvals, and data entry. Each scene carries the subtle decisions—spacing rhythm, label hierarchy, state indicators—that make interfaces feel authored.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    reverse: false,
  },
  {
    id: 'motion',
    eyebrow: 'Purposeful motion',
    title: 'Animation with intention',
    description: 'Every transition serves a function: orienting users during navigation, confirming actions with weight, guiding attention through state changes. Motion that clarifies rather than decorates.',
    icon: Move,
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
    reverse: true,
  },
  {
    id: 'blocks',
    eyebrow: 'Landing-page blocks',
    title: 'Ship faster with structure',
    description: 'Hero sections, feature grids, pricing tables, and testimonial strips—composed with editorial restraint. Start with proven patterns, customize with your content, maintain design coherence.',
    icon: Layout,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    reverse: false,
  },
];

export function FeatureRows() {
  return (
    <div className="divide-y divide-line">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <section 
            key={feature.id} 
            id={feature.id}
            className="py-section-mobile md:py-section-desktop"
          >
            <div className="max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop">
              <div className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${feature.reverse ? 'md:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className={feature.reverse ? 'md:order-2' : ''}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon size={20} className="text-muted" />
                    <p className="text-label text-muted uppercase tracking-wide">{feature.eyebrow}</p>
                  </div>
                  <h3 className="text-heading-lg font-medium text-ink mb-4 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-body-lg text-muted mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <Button variant="link" href={`#${feature.id}-details`} className="inline-flex items-center gap-2 group">
                    Learn more
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Image */}
                <div className={`relative ${feature.reverse ? 'md:order-1' : ''}`}>
                  <div className="aspect-[4/3] rounded-card overflow-hidden border border-line bg-surface">
                    <Image
                      src={feature.image}
                      alt={`${feature.title} visual representation`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
