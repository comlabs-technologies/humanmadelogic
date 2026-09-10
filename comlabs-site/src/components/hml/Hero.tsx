'use client';

import { useCallback, useEffect, useRef } from 'react';
import { hero } from '@/config/agency';
import { media } from '@/config/media';
import { pointerState } from '@/lib/hml/usePointerVelocity';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { useFinePointer } from '@/lib/hml/useMediaQuery';
import { ShaderImage } from './ShaderImage';
import { RevealText } from './RevealText';

/**
 * Depth multipliers for the magnetic stack. The monument is heavy and barely
 * moves; the two counterpoints ride further, which is what gives the
 * composition its sense of physical layering rather than a parallax trick.
 */
const PLATES = [
  { key: 'monument', depth: 0.32, rotate: 0 },
  { key: 'pillar', depth: 1.15, rotate: -0.8 },
  { key: 'aperture', depth: 0.86, rotate: 0.7 },
] as const;

export function Hero() {
  const frames = useRef<Record<string, HTMLDivElement | null>>({});
  const stage = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const magnetic = finePointer && !reducedMotion;

  const registerMonument = useCallback((element: HTMLDivElement | null) => {
    frames.current.monument = element;
  }, []);
  const registerPillar = useCallback((element: HTMLDivElement | null) => {
    frames.current.pillar = element;
  }, []);
  const registerAperture = useCallback((element: HTMLDivElement | null) => {
    frames.current.aperture = element;
  }, []);

  useEffect(() => {
    if (!magnetic) return;

    const state: Record<string, { x: number; y: number }> = {};
    PLATES.forEach((plate) => {
      state[plate.key] = { x: 0, y: 0 };
    });

    let raf = 0;

    const tick = () => {
      raf = window.requestAnimationFrame(tick);

      const container = stage.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const pointer = pointerState.current;
      const centreX = rect.left + rect.width / 2;
      const centreY = rect.top + rect.height / 2;
      const relX = pointer.active ? (pointer.x - centreX) / Math.max(rect.width, 1) : 0;
      const relY = pointer.active ? (pointer.y - centreY) / Math.max(rect.height, 1) : 0;

      PLATES.forEach((plate) => {
        const element = frames.current[plate.key];
        if (!element) return;

        const current = state[plate.key];
        // Restrained parallax: the stage leans, it does not swim.
        const targetX = relX * 26 * plate.depth;
        const targetY = relY * 15 * plate.depth;

        current.x += (targetX - current.x) * 0.055;
        current.y += (targetY - current.y) * 0.055;

        element.style.transform =
          `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)` +
          (plate.rotate ? ` rotate(${plate.rotate}deg)` : '');
      });
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [magnetic]);

  return (
    // `overflow-x-clip` lets the plate run past the right edge without ever
    // creating a horizontal scrollbar, and unlike `hidden` it does not turn
    // the section into a containing block for the fixed header.
    <section id="top" className="relative overflow-x-clip pt-28 sm:pt-32 lg:pt-36">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate sm:text-[12px]">
          {hero.eyebrow}
        </p>

        <RevealText
          as="h1"
          immediate
          delay={0.15}
          lines={hero.headline}
          className="mt-6 max-w-[16ch] text-[12vw] leading-[0.92] tracking-[-0.055em] sm:text-[9vw] lg:text-[7.6vw] xl:text-[112px]"
        />

        <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[46ch] text-[16px] leading-[1.55] text-slate sm:text-[17px]">
            {hero.body}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={hero.primaryCta.href}
              className="inline-flex h-12 items-center rounded-full bg-obsidian px-6 text-[15px] font-medium text-paper transition-colors hover:bg-obsidian/85"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex h-12 items-center rounded-full border border-obsidian/20 px-6 text-[15px] transition-colors hover:border-obsidian/45"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

      {/*
        The monumental composition. One plate breaks the grid and runs past the
        right edge; two counterpoints sit above and below its baseline on
        desktop, and fall into an offset pair on mobile. Same three nodes at
        every breakpoint — nothing is rendered twice.
      */}
      <div className="mx-auto mt-14 max-w-editorial px-5 sm:mt-16 sm:px-8 lg:mt-20 lg:px-12">
        <div ref={stage} className="relative">
          {/* Plate. Edge-to-edge on mobile, offset and bleeding on desktop. */}
          <div className="-mx-5 sm:-mx-8 md:mx-0">
            <div className="relative md:ml-[24%] md:mr-[-9vw]">
              <ShaderImage
                id={media.heroMonument.id}
                asset={media.heroMonument}
                onFrame={registerMonument}
                priority
                sizes="(max-width: 768px) 100vw, 70vw"
                className="w-full"
              />
              {/* The left edge sinks into paper instead of stopping at a line. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[24%] md:block"
                style={{
                  background:
                    'linear-gradient(to right, rgba(242,240,235,1) 0%, rgba(242,240,235,0.6) 42%, rgba(242,240,235,0) 100%)',
                }}
              />
            </div>
          </div>

          {/* Counterpoints: absolute on desktop, an offset pair on mobile. */}
          <div className="mt-4 flex items-start gap-3 md:contents">
            <div className="w-[44%] -translate-y-8 md:absolute md:left-0 md:top-[-9%] md:w-[19%] md:translate-y-0">
              <ShaderImage
                id={media.heroPillar.id}
                asset={media.heroPillar}
                onFrame={registerPillar}
                priority
                sizes="(max-width: 768px) 44vw, 20vw"
                className="w-full"
              />
            </div>

            <div className="w-[36%] translate-y-4 md:absolute md:bottom-[-15%] md:left-[13%] md:w-[15%] md:translate-y-0">
              <ShaderImage
                id={media.heroAperture.id}
                asset={media.heroAperture}
                onFrame={registerAperture}
                sizes="(max-width: 768px) 36vw, 16vw"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-editorial px-5 sm:px-8 lg:mt-28 lg:px-12">
        <div className="flex items-center justify-between border-t border-obsidian/10 pt-4">
          <span className="text-[11px] uppercase tracking-[0.2em] text-slate">
            {hero.scrollHint}
          </span>
          <span aria-hidden="true" className="text-[11px] tracking-[0.2em] text-slate">
            ↓
          </span>
        </div>
      </div>
    </section>
  );
}
