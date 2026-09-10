'use client';

import Image from 'next/image';
import { useEffect, type CSSProperties } from 'react';
import type { MediaAsset } from '@/config/media';
import { useMediaQuery } from '@/lib/hml/useMediaQuery';
import { useWebGLSurface } from './webgl/registry';

type ShaderImageProps = {
  /** Unique surface id. Also used by `setSurfaceGray`. */
  id: string;
  asset: MediaAsset;
  /** Wrapper classes. Sizing belongs here; the crop comes from the asset. */
  className?: string;
  sizes: string;
  priority?: boolean;
  /** Extra desaturation at rest, on top of the asset's own grade. */
  restGrayscale?: number;
  /** Draw order inside the shared canvas. Must mirror the DOM stacking. */
  layer?: number;
  style?: CSSProperties;
  /** Overrides the asset's alt text when the context needs something else. */
  alt?: string;
  /**
   * Hands the frame node back to the parent so it can write transforms
   * directly onto the registered element — which is what keeps the shader
   * plane and the DOM frame in exact agreement while the stack moves.
   */
  onFrame?: (element: HTMLDivElement | null) => void;
  children?: React.ReactNode;
};

/**
 * A single photograph in the HML system.
 *
 * The DOM frame is the source of truth: it carries the art-directed aspect
 * ratio and focal point, renders the photograph through `next/image`, and
 * registers itself with the shared WebGL canvas. The shader plane tracks this
 * box, so the same crop applies whether or not WebGL is running.
 *
 * Both crops ship as CSS custom properties and a media query picks between
 * them, so the server and the client render byte-identical markup and the
 * mobile art direction is never a squashed desktop frame.
 */
export function ShaderImage({
  id,
  asset,
  className = '',
  sizes,
  priority = false,
  restGrayscale,
  layer,
  style,
  alt,
  onFrame,
  children,
}: ShaderImageProps) {
  // Only used to choose which focal point the shader samples around. It runs
  // in an effect, so it never affects server-rendered output.
  const compact = !useMediaQuery('(min-width: 768px)');
  const ref = useWebGLSurface<HTMLDivElement>(id, { asset, compact, restGrayscale, layer });

  useEffect(() => {
    onFrame?.(ref.current);
    return () => onFrame?.(null);
  }, [onFrame, ref, compact]);

  const { grade } = asset.treatment;
  // Close enough to the shader grade that the fallback belongs to the same
  // universe — and it is exactly what a reduced-motion visitor sees.
  const cssGrade = [
    `saturate(${grade.saturation})`,
    `contrast(${grade.contrast})`,
    `brightness(${(grade.brightness * (1 + grade.lift * 0.9)).toFixed(3)})`,
  ].join(' ');

  const resolvedAlt = alt ?? asset.alt;

  return (
    <div
      ref={ref}
      className={`webgl-surface relative overflow-hidden ${className}`}
      style={
        {
          '--hml-aspect-m': asset.mobile.aspect,
          '--hml-aspect-d': asset.desktop.aspect,
          '--hml-pos-m': asset.mobile.position,
          '--hml-pos-d': asset.desktop.position,
          '--hml-grade': cssGrade,
          borderRadius: asset.radius,
          ...style,
        } as CSSProperties
      }
    >
      <Image
        src={asset.src}
        alt={resolvedAlt}
        aria-hidden={resolvedAlt === '' ? true : undefined}
        fill
        sizes={sizes}
        {...(priority ? { priority: true } : { loading: 'lazy' as const })}
        className="object-cover"
      />
      {children}
    </div>
  );
}
