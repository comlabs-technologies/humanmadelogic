'use client';

import React from 'react';
import { Check, X } from 'lucide-react';

const comparisonData = [
  {
    aspect: 'Typography',
    generic: 'System fonts, inconsistent weights',
    comlabs: 'Google Sans with Inter, tight tracking',
  },
  {
    aspect: 'Motion',
    generic: 'Default easings or none',
    comlabs: 'Purposeful 180-240ms transitions',
  },
  {
    aspect: 'Spacing',
    generic: 'Inconsistent gaps, crowded layouts',
    comlabs: '4px scale, editorial whitespace',
  },
  {
    aspect: 'Color',
    generic: 'Generic blues, harsh contrasts',
    comlabs: 'Warm parchment, restrained palette',
  },
  {
    aspect: 'Components',
    generic: 'Basic styled elements',
    comlabs: 'Authored UI with proper states',
  },
];

export function ComparisonSection() {
  return (
    <section className="py-section-mobile md:py-section-desktop">
      <div className="max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop">
        {/* Header */}
        <div className="max-w-[560px] mb-12">
          <h2 className="text-heading-lg font-medium text-ink mb-4">
            The difference between generated and authored
          </h2>
          <p className="text-body-lg text-muted leading-relaxed">
            AI can produce functional interfaces. Comlabs adds the decisions that make 
            them feel intentional—spacing rhythm, motion timing, typographic refinement.
          </p>
        </div>

        {/* Comparison table using horizontal rules */}
        <div className="border-t border-line">
          {comparisonData.map((row, index) => (
            <div
              key={row.aspect}
              className="grid md:grid-cols-3 gap-4 py-5 border-b border-line"
            >
              <div className="md:col-span-1">
                <span className="text-body font-medium text-ink">{row.aspect}</span>
              </div>
              <div className="md:col-span-1 flex items-center gap-3">
                <X size={16} className="text-muted flex-shrink-0" />
                <span className="text-body text-muted">{row.generic}</span>
              </div>
              <div className="md:col-span-1 flex items-center gap-3">
                <Check size={16} className="text-wine flex-shrink-0" />
                <span className="text-body text-ink">{row.comlabs}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
