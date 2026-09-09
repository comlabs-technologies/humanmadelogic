'use client';

import { useEffect, useRef } from 'react';
import { finalCta } from '@/config/agency';
import { pointerState } from '@/lib/hml/usePointerVelocity';
import { useFinePointer } from '@/lib/hml/useMediaQuery';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';

/**
 * Near-black closing section with an oversized yellow object that responds
 * elastically to the pointer. Everything readable is plain DOM text — the
 * motion only ever moves the decorative disc.
 */
export function FinalCTA() {
  const section = useRef<HTMLElement>(null);
  const disc = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!finePointer || reducedMotion) return;

    const element = section.current;
    const target = disc.current;
    if (!element || !target) return;

    const state = { x: 0, y: 0, scale: 1 };
    let raf = 0;
    let inside = false;

    const onEnter = () => {
      inside = true;
    };
    const onLeave = () => {
      inside = false;
    };

    element.addEventListener('pointerenter', onEnter);
    element.addEventListener('pointerleave', onLeave);

    const tick = () => {
      raf = window.requestAnimationFrame(tick);

      const rect = element.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const pointer = pointerState.current;
      const centreX = rect.left + rect.width / 2;
      const centreY = rect.top + rect.height / 2;

      const targetX = inside ? (pointer.x - centreX) * 0.16 : 0;
      const targetY = inside ? (pointer.y - centreY) * 0.16 : 0;
      const targetScale = inside ? 1.06 + pointer.velocity * 0.05 : 1;

      // Low stiffness gives the disc a soft, weighted lag.
      state.x += (targetX - state.x) * 0.06;
      state.y += (targetY - state.y) * 0.06;
      state.scale += (targetScale - state.scale) * 0.08;

      target.style.transform = `translate3d(${state.x.toFixed(2)}px, ${state.y.toFixed(2)}px, 0) scale(${state.scale.toFixed(4)})`;
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      element.removeEventListener('pointerenter', onEnter);
      element.removeEventListener('pointerleave', onLeave);
    };
  }, [finePointer, reducedMotion]);

  return (
    <section
      id="contact"
      ref={section}
      className="relative scroll-mt-24 overflow-hidden bg-obsidian text-paper"
    >
      {/* Decorative field. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(60% 60% at 78% 18%, rgba(244,189,73,0.16) 0%, rgba(21,21,21,0) 70%), radial-gradient(50% 50% at 12% 88%, rgba(244,189,73,0.09) 0%, rgba(21,21,21,0) 70%)',
        }}
      />
      <div
        ref={disc}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[62vw] max-h-[560px] w-[62vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signalYellow opacity-[0.14] blur-[2px] lg:left-[72%]"
        style={{ willChange: 'transform' }}
      />

      <div className="relative mx-auto max-w-editorial px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-48">
        <h2 className="max-w-[15ch] text-[11vw] leading-[0.96] tracking-[-0.05em] sm:text-[7.5vw] lg:text-[5.6vw] xl:text-[86px]">
          {finalCta.heading}
        </h2>

        <p className="mt-8 max-w-[46ch] text-[16px] leading-[1.6] text-paper/65 sm:text-[18px]">
          {finalCta.body}
        </p>

        <a
          href={finalCta.cta.href}
          className="group mt-12 inline-flex h-14 items-center gap-3 rounded-full bg-signalYellow px-7 text-[16px] font-medium text-obsidian transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian"
        >
          {finalCta.cta.label}
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
