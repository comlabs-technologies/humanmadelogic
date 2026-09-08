'use client';

import React from 'react';

const trustItems = [
  { label: 'Cursor', description: 'AI-powered editor' },
  { label: 'Claude Code', description: 'Code generation' },
  { label: 'v0', description: 'UI prototyping' },
  { label: 'Lovable', description: 'App building' },
  { label: 'Codex', description: 'Code completion' },
];

export function TrustStrip() {
  return (
    <section className="py-section-mobile md:py-section-desktop border-b border-line">
      <div className="max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop">
        <p className="text-label text-muted uppercase tracking-wide mb-8">
          Built for teams using
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center p-6 border border-line rounded-card bg-surface hover:border-wine/30 transition-colors duration-200"
            >
              <span className="text-heading-md font-medium text-ink mb-1">
                {item.label}
              </span>
              <span className="text-label text-muted text-center">
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
