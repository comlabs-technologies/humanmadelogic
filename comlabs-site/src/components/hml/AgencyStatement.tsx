'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { statement } from '@/config/agency';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { setSurfaceGray, useWebGLSurface } from './webgl/registry';
import { RevealText } from './RevealText';

export function AgencyStatement() {
  const plate = useWebGLSurface<HTMLDivElement>('statement-plate', {
    src: statement.image.src,
    radius: 18,
    distortion: 0.55,
    restGrayscale: 1,
    hoverZoom: 0.6,
    scrollInfluence: 1.4,
  });
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = section.current;
    if (!element || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      // Grayscale lifts and the plate drifts as the section passes through.
      ScrollTrigger.create({
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          setSurfaceGray('statement-plate', 1 - gsap.utils.clamp(0, 1, (self.progress - 0.2) * 2.1));
        },
      });

      gsap.fromTo(
        '[data-statement-plate]',
        { yPercent: 6 },
        {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        },
      );
    }, element);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section id="studio" ref={section} className="scroll-mt-24 py-24 sm:py-32 lg:py-40">
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
            <p className="mt-8 max-w-[52ch] text-[16px] leading-[1.6] text-slate sm:text-[17px] lg:ml-auto lg:mt-10 lg:max-w-[44ch]">
              {statement.body}
            </p>
          </div>
        </div>

        <div data-statement-plate className="mt-16 sm:mt-20 lg:mt-24">
          <div
            ref={plate}
            className="webgl-surface relative aspect-[16/9] w-full overflow-hidden rounded-[18px] bg-obsidian/5 sm:aspect-[21/9]"
          >
            <Image
              src={statement.image.src}
              alt={statement.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1560px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
