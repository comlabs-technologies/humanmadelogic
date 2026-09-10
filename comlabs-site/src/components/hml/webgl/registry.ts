'use client';

import { useEffect, useRef } from 'react';
import type { MediaAsset } from '@/config/media';

export type SurfaceOptions = {
  /** The art-directed asset. Crop, grading and shader mode all come from it. */
  asset: MediaAsset;
  /** Use the mobile crop instead of the desktop one. */
  compact?: boolean;
  /** Desaturation at rest, layered on top of the asset's own grade. */
  restGrayscale?: number;
  /**
   * Draw order within the shared canvas. Every plane sits at z = 0 with depth
   * testing off, so this is what decides which photograph sits on top of
   * which — it must mirror the DOM stacking of the same frames.
   */
  layer?: number;
};

export type Surface = SurfaceOptions & {
  id: string;
  element: HTMLElement;
  /** Eased 0…1 hover progress, written by the render loop. */
  hover: number;
  hoverTarget: number;
  /** Extra desaturation target — a sibling being focused, for example. */
  grayTarget: number;
  /** 0…1 entry reveal, driven by an IntersectionObserver. */
  reveal: number;
  revealTarget: number;
  /** True while the element is anywhere near the viewport. */
  inView: boolean;
};

const surfaces = new Map<string, Surface>();
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeToSurfaces(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSurfaces(): Surface[] {
  return Array.from(surfaces.values());
}

/** Lets a component desaturate a surface — used when a sibling is focused. */
export function setSurfaceGray(id: string, value: number) {
  const surface = surfaces.get(id);
  if (surface) surface.grayTarget = value;
}

/**
 * Marks a surface as drawn by WebGL. The `next/image` underneath only fades
 * out once its texture has actually uploaded, so a slow or blocked remote
 * image simply stays as a normal photograph instead of going blank.
 */
export function markSurfaceReady(id: string) {
  surfaces.get(id)?.element.setAttribute('data-webgl-ready', 'true');
}

/**
 * Registers a DOM node as a WebGL surface. The shared canvas reads the node's
 * box every frame, so the plane tracks whatever CSS or GSAP does to it.
 */
export function useWebGLSurface<T extends HTMLElement>(id: string, options: SurfaceOptions) {
  const ref = useRef<T>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const compact = options.compact;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const surface: Surface = {
      ...optionsRef.current,
      id,
      element,
      hover: 0,
      hoverTarget: 0,
      grayTarget: optionsRef.current.restGrayscale ?? 0,
      reveal: 0,
      revealTarget: 0,
      inView: false,
    };
    surfaces.set(id, surface);
    notify();

    const enter = () => {
      surface.hoverTarget = 1;
    };
    const leave = () => {
      surface.hoverTarget = 0;
    };

    element.addEventListener('pointerenter', enter);
    element.addEventListener('pointerleave', leave);

    // Reveal on entry, and let the render loop skip work while off screen.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          surface.inView = entry.isIntersecting;
          if (entry.isIntersecting) {
            surface.revealTarget = 1;
            // Drives the CSS reveal used whenever WebGL is not running.
            element.setAttribute('data-in-view', 'true');
          }
        });
      },
      { rootMargin: '18% 0px', threshold: 0 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      element.removeEventListener('pointerenter', enter);
      element.removeEventListener('pointerleave', leave);
      element.removeAttribute('data-webgl-ready');
      element.removeAttribute('data-in-view');
      surfaces.delete(id);
      notify();
    };
    // `compact` re-registers the surface when the crop switches breakpoint.
  }, [id, compact]);

  return ref;
}
