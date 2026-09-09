import React from 'react';
import type { StatusTone } from '@/config/content';

/**
 * Shared interface primitives.
 * Every product scene in the template is assembled from these, which is what
 * keeps borders, radii, spacing, status treatment and type hierarchy identical
 * across the hero and all four capability scenes.
 */

export function Panel({
  children,
  className = '',
  elevated = false,
}: {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}) {
  return (
    <div
      className={[
        'bg-surface border border-line rounded-scene overflow-hidden',
        elevated ? 'shadow-raised' : 'shadow-panel',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export function PanelHead({
  title,
  meta,
  accessory,
}: {
  title: string;
  meta?: string;
  accessory?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-hairline">
      <div className="min-w-0">
        <p className="text-[13px] font-medium tracking-tight text-ink truncate">{title}</p>
        {meta && <p className="text-[11px] tracking-tight text-subtle mt-0.5 truncate">{meta}</p>}
      </div>
      {accessory && <div className="shrink-0">{accessory}</div>}
    </div>
  );
}

const toneStyles: Record<StatusTone, string> = {
  neutral: 'bg-hairline text-muted border-line',
  active: 'bg-[#f2f0e7] text-ink border-line',
  review: 'bg-[#f6efe0] text-amber border-[#e7dbc2]',
  done: 'bg-[#e8f0eb] text-signal border-[#cfe0d6]',
};

export function StatusPill({ label, tone = 'neutral' }: { label: string; tone?: StatusTone }) {
  return (
    <span
      className={`inline-flex items-center h-[22px] px-2 rounded-[6px] border text-[11px] font-medium tracking-tight whitespace-nowrap ${toneStyles[tone]}`}
    >
      {label}
    </span>
  );
}

export function Avatar({ name, size = 24 }: { name: string; size?: number }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center rounded-full bg-canvas border border-line text-[10px] font-medium tracking-tight text-muted shrink-0"
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.09em] text-subtle">{children}</p>
  );
}

export function PanelFootnote({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 py-3 border-t border-hairline text-[11px] tracking-tight text-subtle">
      {children}
    </p>
  );
}
