'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { process } from '@/config/agency';
import { media } from '@/config/media';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { RevealText } from './RevealText';
import { ShaderImage } from './ShaderImage';

export function Process() {
  const section = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = section.current;
    if (!element || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>('[data-process-step]');

      steps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 65%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) setCurrent(index);
          },
        });
      });

      gsap.fromTo(
        '[data-process-line]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: '[data-process-list]',
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.4,
          },
        },
      );
    }, element);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={section} className="overflow-x-clip py-24 sm:py-32 lg:py-40">
      {/*
        Architectural interlude, composed as a stack of overlapping panels:
        a primary plate, a second crossing its lower-right corner, and a
        narrow third tucked behind at the right edge. Shadows sit on the
        wrappers rather than the frames, so the depth survives once the shader
        takes the images over.
      */}
      <div className="mx-auto mb-20 max-w-editorial px-5 sm:mb-24 sm:px-8 lg:mb-32 lg:px-12">
        <div className="relative pb-16 sm:pb-20 lg:pb-24">
          {/* Narrow panel, furthest back. */}
          <div className="absolute right-0 top-[6%] z-0 hidden w-[17%] rounded-[16px] shadow-[0_30px_70px_-34px_rgba(21,21,21,0.55)] md:block lg:w-[15%]">
            <ShaderImage
              id={media.pillar.id}
              asset={media.pillar}
              sizes="17vw"
              className="w-full"
            />
          </div>

          {/* Primary plate. */}
          <div className="relative z-10 w-full rounded-[16px] shadow-[0_40px_90px_-40px_rgba(21,21,21,0.6)] md:w-[74%] lg:w-[70%]">
            <ShaderImage
              id={media.monument.id}
              asset={media.monument}
              sizes="(max-width: 768px) 100vw, 70vw"
              className="w-full"
            />
          </div>

          {/* Second panel, crossing the primary plate's lower-right corner. */}
          <div className="relative z-20 -mt-10 ml-auto w-[68%] rounded-[16px] shadow-[0_36px_80px_-34px_rgba(21,21,21,0.55)] sm:-mt-14 sm:w-[58%] md:absolute md:bottom-0 md:right-[6%] md:mt-0 md:w-[44%] lg:w-[40%]">
            <ShaderImage
              id={media.aperture.id}
              asset={media.aperture}
              sizes="(max-width: 768px) 68vw, 44vw"
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate">{process.label}</p>
              <RevealText
                lines={[process.heading]}
                className="mt-6 text-[8vw] leading-[1.04] tracking-[-0.04em] sm:text-[5.2vw] lg:text-[3.4vw] xl:text-[50px]"
              />
            </div>
          </div>

          <ol data-process-list className="relative lg:col-span-7">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 hidden h-full w-px bg-obsidian/10 sm:block"
            />
            <span
              data-process-line
              aria-hidden="true"
              className="absolute left-0 top-0 hidden h-full w-px origin-top bg-obsidian sm:block"
            />

            {process.steps.map((step, index) => {
              const isActive = index === current;
              return (
                <li
                  key={step.index}
                  data-process-step
                  className="relative border-b border-obsidian/10 py-10 sm:pl-10 lg:py-14"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-[52px] hidden h-[9px] w-[9px] -translate-x-1/2 rounded-full transition-colors duration-500 sm:block ${
                      isActive ? 'bg-signalYellow' : 'bg-obsidian/25'
                    }`}
                  />
                  <div className="flex items-baseline gap-5">
                    <span
                      className={`text-[12px] tabular-nums tracking-[0.18em] transition-colors duration-500 ${
                        isActive ? 'text-obsidian' : 'text-slate'
                      }`}
                    >
                      {step.index}
                    </span>
                    <h3 className="text-[30px] leading-[1.1] tracking-[-0.04em] sm:text-[38px]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-slate sm:ml-[52px]">
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
