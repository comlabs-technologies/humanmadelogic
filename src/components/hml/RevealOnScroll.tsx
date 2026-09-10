'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { useIsomorphicLayoutEffect } from '@/lib/hml/useIsomorphicLayoutEffect';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Staggered fade-up used by inner HML pages. Matches the selected-work body
 * reveal: power3.out, once on enter, skipped under reduced motion.
 */
export function RevealOnScroll({ children, className = '', delay = 0 }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const element = root.current;
    if (!element || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.from(element.children, {
        y: 26,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        delay,
        scrollTrigger: { trigger: element, start: 'top 82%', once: true },
      });
    }, element);

    return () => context.revert();
  }, [delay, reducedMotion]);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
