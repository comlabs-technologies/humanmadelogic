'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { statement } from '@/config/agency';
import { media } from '@/config/media';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { useIsomorphicLayoutEffect } from '@/lib/hml/useIsomorphicLayoutEffect';
import { setSurfaceGray } from './webgl/registry';
import { ShaderImage } from './ShaderImage';
import { RevealText } from './RevealText';

/**
 * The belief statement. The dunes are cropped to a hard panorama and run past
 * the right edge of the grid, so the ridgelines read as folded material rather
 * than as a landscape photograph sitting in a box.
 */
export function AgencyStatement() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const element = section.current;
    if (!element || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      // Colour arrives slowly as the band passes through the viewport.
      ScrollTrigger.create({
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          setSurfaceGray(media.belief.id, 1 - gsap.utils.clamp(0, 1, (self.progress - 0.18) * 2.4));
        },
      });

      gsap.fromTo(
        '[data-belief-plate]',
        { yPercent: 5 },
        {
          yPercent: -5,
          ease: 'none',
          scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
        },
      );
    }, element);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      id="studio"
      ref={section}
      className="scroll-mt-24 overflow-x-clip py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate lg:col-span-3">
            {statement.label}
          </p>

          <div className="lg:col-span-9">
            <RevealText
              lines={statement.lines}
              className="text-[8vw] leading-[1.02] tracking-[-0.045em] sm:text-[5.4vw] lg:text-[4.2vw] xl:text-[62px]"
            />
          </div>
        </div>
      </div>

      {/* Panoramic band. Full-bleed left, past the grid on the right. */}
      <div data-belief-plate className="mt-16 sm:mt-20 lg:mt-24">
        <div className="md:ml-[8vw] md:-mr-[6vw]">
          <ShaderImage
            id={media.belief.id}
            asset={media.belief}
            sizes="(max-width: 768px) 100vw, 95vw"
            className="w-full"
          />
        </div>
      </div>

      {/* Copy sits under the band, indented to the right of the grid. */}
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12">
          <p className="mt-10 max-w-[52ch] text-[16px] leading-[1.6] text-slate sm:text-[17px] lg:col-span-5 lg:col-start-7 lg:mt-12">
            {statement.body}
          </p>
        </div>
      </div>
    </section>
  );
}
