'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { useIsomorphicLayoutEffect } from '@/lib/hml/useIsomorphicLayoutEffect';

type RevealTextProps = {
  /** Each entry becomes one visual line. */
  lines: string[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  /** Delay before the line starts, in seconds. */
  delay?: number;
  /** Play immediately instead of waiting for the element to scroll into view. */
  immediate?: boolean;
};

/**
 * Reveals a statement word by word. The animated words are hidden from
 * assistive technology and a single visually hidden copy carries the real
 * sentence, so nothing is read twice or read as fragments.
 */
export function RevealText({
  lines,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  immediate = false,
}: RevealTextProps) {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const element = root.current;
    if (!element || reducedMotion) return;

    const context = gsap.context(() => {
      const words = element.querySelectorAll('.hml-word');
      gsap.set(words, { yPercent: 110, opacity: 0 });

      const animate = () =>
        gsap.to(words, {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.035,
          delay,
        });

      if (immediate) {
        animate();
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.create({
        trigger: element,
        start: 'top 82%',
        once: true,
        onEnter: animate,
      });
    }, element);

    return () => context.revert();
  }, [delay, immediate, reducedMotion]);

  return (
    <Tag ref={root as React.RefObject<never>} className={className}>
      <span className="sr-only">{lines.join(' ')}</span>
      <span aria-hidden="true">
        {lines.map((line) => (
          <span key={line} className="block overflow-hidden pb-[0.08em]">
            {line.split(' ').map((word, index) => (
              <span key={`${word}-${index}`} className="hml-word">
                {word}
                {index < line.split(' ').length - 1 ? ' ' : ''}
              </span>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
}
