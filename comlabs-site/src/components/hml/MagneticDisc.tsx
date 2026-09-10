'use client';

import { useEffect, useRef } from 'react';
import { pointerState } from '@/lib/hml/usePointerVelocity';
import { useFinePointer } from '@/lib/hml/useMediaQuery';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';

/**
 * The yellow field used on dark HML sections. Motion only ever moves this
 * decorative disc — readable copy stays in the DOM.
 */
export function MagneticDisc({ className = '' }: { className?: string }) {
  const section = useRef<HTMLDivElement>(null);
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
    <div ref={section} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(60% 60% at 78% 18%, rgba(244,189,73,0.16) 0%, rgba(21,21,21,0) 70%), radial-gradient(50% 50% at 12% 88%, rgba(244,189,73,0.09) 0%, rgba(21,21,21,0) 70%)',
        }}
      />
      <div
        ref={disc}
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[62vw] max-h-[560px] w-[62vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signalYellow opacity-[0.14] blur-[2px] lg:left-[72%]"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}
