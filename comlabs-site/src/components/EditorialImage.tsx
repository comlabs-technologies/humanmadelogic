'use client';

import React, { useState } from 'react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  priority?: boolean;
}

export function EditorialImage({
  src,
  alt,
  className = '',
  objectPosition,
  priority = false,
}: EditorialImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`bg-canvas ${className}`}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={objectPosition ? { objectPosition } : undefined}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
      onError={() => setFailed(true)}
    />
  );
}
