'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { process } from '@/config/agency';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { RevealText } from './RevealText';
import { ScenicStage } from './ScenicStage';

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
        The scenic stage: a shader-driven backdrop built from the hero studies,
        with the architectural photography laid over it as overlapping windows
        sunk towards black.
      */}
      <div className="mx-auto mb-20 max-w-editorial px-5 sm:mb-24 sm:px-8 lg:mb-32 lg:px-12">
        <ScenicStage />
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
