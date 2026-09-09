'use client';

import { useEffect, useRef } from 'react';

export type SurfaceOptions = {
  /** Texture URL. */
  src: string;
  /** Corner radius in CSS pixels. */
  radius?: number;
  /** How strongly the pointer distorts this surface. */
  distortion?: number;
  /** 0 = full colour, 1 = fully desaturated at rest. */
  restGrayscale?: number;
  /** Extra zoom applied while hovered. */
  hoverZoom?: number;
  /** Scroll-linked displacement multiplier. */
  scrollInfluence?: number;
};

export type Surface = SurfaceOptions & {
  id: string;
  element: HTMLElement;
  /** Eased 0…1 hover progress, written by the render loop. */
  hover: number;
  /** Hover target set by pointer events on the DOM node. */
  hoverTarget: number;
  /** Desaturation target, 0…1. Components may change this at any time. */
  grayTarget: number;
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

/** Lets a component desaturate a surface — used when a sibling is focused. */
export function setSurfaceGray(id: string, value: number) {
  const surface = surfaces.get(id);
  if (surface) surface.grayTarget = value;
}

export function getSurfaces(): Surface[] {
  return Array.from(surfaces.values());
}

/**
 * Registers a DOM node as a WebGL surface. The shared canvas reads the node's
 * box every frame, so the plane tracks whatever CSS or GSAP does to it.
 */
export function useWebGLSurface<T extends HTMLElement>(id: string, options: SurfaceOptions) {
  const ref = useRef<T>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

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

    return () => {
      element.removeEventListener('pointerenter', enter);
      element.removeEventListener('pointerleave', leave);
      surfaces.delete(id);
      notify();
    };
  }, [id]);

  return ref;
}
