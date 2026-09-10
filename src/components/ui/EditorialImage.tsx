import React from 'react';
import type { ImageAsset } from '@/config/images';

type EditorialImageProps = {
  asset: ImageAsset;
  className?: string;
  priority?: boolean;
  /** Overrides the alt text from the manifest (rarely needed). */
  alt?: string;
};

/**
 * Plain <img> on purpose: every asset ships locally with the template, so
 * there is no remote loader, no image CDN cost and no layout shift beyond
 * the aspect ratio set by the parent.
 */
export function EditorialImage({ asset, className = '', priority = false, alt }: EditorialImageProps) {
  const resolvedAlt = alt ?? asset.alt;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset.src}
      alt={resolvedAlt}
      aria-hidden={resolvedAlt === '' ? true : undefined}
      className={className}
      style={asset.position ? { objectPosition: asset.position } : undefined}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
    />
  );
}
