'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { hero } from '@/config/agency';
import type { HeroFrame as HeroFrameData } from '@/config/agency';
import { pointerState } from '@/lib/hml/usePointerVelocity';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { useFinePointer } from '@/lib/hml/useMediaQuery';
import { setSurfaceGray, useWebGLSurface } from './webgl/registry';
import { RevealText } from './RevealText';

type FrameProps = {
  frame: HeroFrameData;
  index: number;
  priority: boolean;
  register: (element: HTMLDivElement | null, index: number) => void;
  onFocusChange: (index: number | null) => void;
};

function HeroFrame({ frame, index, priority, register, onFocusChange }: FrameProps) {
  const ref = useWebGLSurface<HTMLDivElement>(`hero-${frame.id}`, {
    src: frame.src,
    radius: 16,
    distortion: 1,
    hoverZoom: 1,
    scrollInfluence: 0.6,
  });

  useEffect(() => {
    register(ref.current, index);
    return () => register(null, index);
  }, [index, ref, register]);

  return (
    <div
      ref={ref}
      data-hero-frame
      onPointerEnter={() => onFocusChange(index)}
      onPointerLeave={() => onFocusChange(null)}
      className="webgl-surface relative aspect-[3/4] w-[19vw] max-w-[228px] shrink-0 overflow-hidden rounded-[16px] bg-obsidian/5 shadow-[0_18px_50px_-30px_rgba(21,21,21,0.6)] sm:w-[17vw]"
      style={{
        marginLeft: index === 0 ? 0 : 'max(-2.4vw, -30px)',
        // Resting fan position. The magnetic loop overwrites this on
        // pointer-capable devices; everywhere else it is the final layout.
        transform: `translate3d(0, ${frame.offset * 1.6}px, 0) rotate(${frame.rotate}deg)`,
        zIndex: 10 - Math.abs(index - 2),
        willChange: 'transform',
      }}
    >
      <Image
        src={frame.src}
        alt={frame.alt}
        fill
        sizes="(max-width: 640px) 40vw, 228px"
        priority={priority}
        className="object-cover"
      />
      <span className="sr-only">{frame.discipline}</span>
    </div>
  );
}

/**
 * The signature composition: five overlapping frames on alternating vertical
 * offsets that follow the cursor at different depths. The DOM frames are the
 * source of truth — the shared WebGL canvas tracks their boxes, so if WebGL is
 * unavailable the same composition still renders as ordinary images.
 */
export function Hero() {
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const stack = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const focusedRef = useRef<number | null>(null);

  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const magnetic = finePointer && !reducedMotion;

  const register = useCallback((element: HTMLDivElement | null, index: number) => {
    frames.current[index] = element;
  }, []);

  const onFocusChange = useCallback(
    (index: number | null) => {
      focusedRef.current = index;
      setFocused(index);

      hero.frames.forEach((frame, i) => {
        setSurfaceGray(`hero-${frame.id}`, index === null || index === i ? 0 : 0.42);
      });
    },
    [],
  );

  useEffect(() => {
    if (!magnetic) return;

    // Per-frame eased state. Nothing here touches React.
    const state = hero.frames.map(() => ({ x: 0, y: 0, r: 0, s: 1, push: 0 }));
    let raf = 0;

    const tick = () => {
      raf = window.requestAnimationFrame(tick);

      const container = stack.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const pointer = pointerState.current;
      const centreX = rect.left + rect.width / 2;
      const centreY = rect.top + rect.height / 2;
      const relX = pointer.active ? (pointer.x - centreX) / Math.max(rect.width, 1) : 0;
      const relY = pointer.active ? (pointer.y - centreY) / Math.max(rect.height, 1) : 0;

      const focus = focusedRef.current;

      hero.frames.forEach((frame, index) => {
        const element = frames.current[index];
        if (!element) return;

        const current = state[index];
        const isFocused = focus === index;

        // The whole stack drifts with the cursor; each card at its own depth.
        const targetX = relX * 34 * frame.depth + (focus !== null && !isFocused
          ? Math.sign(index - focus) * 16
          : 0);
        const targetY = relY * 20 * frame.depth + (isFocused ? -14 : 0);
        const targetR = isFocused ? 0 : frame.rotate;
        const targetS = isFocused ? 1.04 : 1;

        current.x += (targetX - current.x) * 0.085;
        current.y += (targetY - current.y) * 0.085;
        current.r += (targetR - current.r) * 0.09;
        current.s += (targetS - current.s) * 0.1;

        element.style.transform =
          `translate3d(${current.x.toFixed(2)}px, ${(current.y + frame.offset * 1.6).toFixed(2)}px, 0)` +
          ` rotate(${current.r.toFixed(3)}deg) scale(${current.s.toFixed(4)})`;
        element.style.zIndex = isFocused ? '20' : String(10 - Math.abs(index - 2));
      });
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [magnetic]);

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate sm:text-[12px]">
          {hero.eyebrow}
        </p>

        <RevealText
          as="h1"
          immediate
          delay={0.15}
          lines={hero.headline}
          className="mt-6 text-[12vw] leading-[0.92] tracking-[-0.055em] sm:text-[9vw] lg:text-[7.6vw] xl:text-[112px]"
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

      {/* Five-frame fan. */}
      <div className="mx-auto mt-12 max-w-editorial px-5 sm:mt-14 sm:px-8 lg:px-12">
        <div
          ref={stack}
          className="flex items-center justify-center pb-6 pt-8"
          style={{ perspective: '1200px' }}
        >
          {hero.frames.map((frame, index) => (
            <HeroFrame
              key={frame.id}
              frame={frame}
              index={index}
              priority={index < 3}
              register={register}
              onFocusChange={magnetic ? onFocusChange : () => undefined}
            />
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-obsidian/10 pt-4">
          <span className="text-[11px] uppercase tracking-[0.2em] text-slate">
            {focused === null ? hero.scrollHint : hero.frames[focused].discipline}
          </span>
          <span aria-hidden="true" className="text-[11px] tracking-[0.2em] text-slate">
            ↓
          </span>
        </div>
      </div>
    </section>
  );
}
