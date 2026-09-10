'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';

/** Read by the WebGL layer so shaders can react to scroll speed. */
export const scrollState = { velocity: 0, y: 0 };

/**
 * The single smooth-scroll system on the page. Lenis drives GSAP's ScrollTrigger
 * from the same RAF loop, so there is never a second competing scroller.
 * Disabled entirely under `prefers-reduced-motion` — native scrolling takes over.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (reducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', (event: { velocity: number; scroll: number }) => {
      scrollState.velocity = event.velocity;
      scrollState.y = event.scroll;
      ScrollTrigger.update();
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      scrollState.velocity = 0;
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
