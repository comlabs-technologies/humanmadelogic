'use client';

import type { ReactNode } from 'react';
import { media } from '@/config/media';
import { ShaderImage } from './ShaderImage';

const FIELD = [
  media.stageFieldOne,
  media.stageFieldTwo,
  media.stageFieldThree,
  media.stageFieldFour,
];

type ScenicStageProps = {
  /**
   * Unique prefix for this stage's surfaces. Every stage renders the same
   * four backdrop studies, so the ids have to be namespaced per instance.
   */
  id: string;
  /** Aspect classes for the window area. */
  aspect?: string;
  /** Load the backdrop eagerly — for the first stage on the page only. */
  priority?: boolean;
  /** How hard the paper wash holds the field back, 0…1. */
  wash?: number;
  /** The windows, positioned absolutely by the caller. */
  children: ReactNode;
  className?: string;
};

/**
 * The scenic stage.
 *
 * A shader-driven field fills the background — the four hero studies, washed
 * back until they read as one painterly ground rather than four cards. The
 * scenic photography then sits on that ground as overlapping windows, each
 * keeping its own photographic grade.
 *
 * Draw order is explicit. Every plane sits at z = 0 with depth testing off,
 * so `layer` is what decides which photograph covers which, and it mirrors
 * the DOM stacking so the non-WebGL fallback matches the shader version.
 * The four backdrop textures are shared across every stage on the page, so
 * repeating the component costs planes, not memory.
 */
export function ScenicStage({
  id,
  aspect = 'aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]',
  priority = false,
  wash = 0.5,
  children,
  className = '',
}: ScenicStageProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[18px] bg-obsidian/[0.04] ${className}`}
    >
      {/* Shader field, filling the background. */}
      <div aria-hidden="true" className="absolute inset-0 z-0 grid grid-cols-2 md:grid-cols-4">
        {FIELD.map((asset, index) => (
          <ShaderImage
            key={asset.id}
            id={`${id}-field-${index}`}
            asset={asset}
            layer={0}
            sizes="(max-width: 768px) 50vw, 25vw"
            priority={priority && index < 2}
            className="h-full w-full"
            style={{ aspectRatio: 'auto' }}
          />
        ))}
      </div>

      {/* Holds the field back so the windows read as the subject. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(180deg, rgba(242,240,235,${wash}) 0%, rgba(242,240,235,${(
            wash * 0.4
          ).toFixed(2)}) 40%, rgba(242,240,235,${(wash * 1.1).toFixed(2)}) 100%)`,
        }}
      />

      <div className={`relative z-10 w-full ${aspect}`}>{children}</div>
    </div>
  );
}

/** A single window on a stage. Positioned by `className` from the caller. */
export function StageWindow({
  id,
  asset,
  layer,
  sizes,
  priority = false,
  className,
  restGrayscale,
  onFrame,
  children,
}: {
  id: string;
  asset: (typeof media)[keyof typeof media];
  layer: number;
  sizes: string;
  priority?: boolean;
  className: string;
  restGrayscale?: number;
  onFrame?: (element: HTMLDivElement | null) => void;
  children?: ReactNode;
}) {
  return (
    <div
      className={`absolute rounded-[12px] shadow-[0_40px_88px_-38px_rgba(20,20,18,0.6)] ${className}`}
    >
      <ShaderImage
        id={id}
        asset={asset}
        layer={layer}
        sizes={sizes}
        priority={priority}
        restGrayscale={restGrayscale}
        onFrame={onFrame}
        className="w-full"
      >
        {children}
      </ShaderImage>
    </div>
  );
}
