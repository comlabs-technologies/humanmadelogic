'use client';

import React from 'react';

const rows = [
  { label: 'Headline', value: 'Refined' },
  { label: 'Motion', value: '200ms' },
  { label: 'Spacing', value: '4px grid' },
  { label: 'Surface', value: 'Parchment' },
];

export function HeroProductScene() {
  return (
    <div className="bg-surface rounded-card border border-line p-4">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-line">
        <p className="font-sans text-label tracking-tight text-ink">Interface review</p>
        <p className="font-secondary text-label tracking-tight text-muted">Hero</p>
      </div>
      <ul className="space-y-2.5">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center justify-between gap-4">
            <span className="font-secondary text-body tracking-tight text-muted">{row.label}</span>
            <span className="font-secondary text-body tracking-tight text-ink">{row.value}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-3 border-t border-line flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-wine" />
        <span className="font-secondary text-label tracking-tight text-muted">Ready to publish</span>
      </div>
    </div>
  );
}
