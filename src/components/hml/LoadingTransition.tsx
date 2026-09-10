'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { agency } from '@/config/agency';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';

const SESSION_KEY = 'hml-intro-played';

/**
 * A short, once-per-session intro. It sits above the page rather than gating
 * it: the homepage is fully rendered and readable underneath from the first
 * paint, so a slow script or WebGL never holds up content.
 */
export function LoadingTransition() {
  const [done, setDone] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let played = true;
    try {
      played = window.sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      // Private browsing — treat it as already played rather than replaying.
    }
    if (!played) setDone(false);
  }, []);

  useEffect(() => {
    if (done) return;

    const markPlayed = () => {
      try {
        window.sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        /* nothing to do */
      }
    };

    if (reducedMotion) {
      markPlayed();
      setDone(true);
      return;
    }

    const element = root.current;
    if (!element) return;

    document.body.style.overflow = 'hidden';

    const context = gsap.context(() => {
      const progress = { value: 0 };
      const timeline = gsap.timeline({
        onComplete: () => {
          markPlayed();
          document.body.style.overflow = '';
          setDone(true);
        },
      });

      timeline
        .to(progress, {
          value: 100,
          duration: 1,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counter.current) {
              counter.current.textContent = String(Math.round(progress.value)).padStart(3, '0');
            }
          },
        })
        .fromTo('[data-intro-rule]', { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, 0)
        .to('[data-intro-mark]', { opacity: 0, duration: 0.25, ease: 'power2.out' }, 1.0)
        .to(element, { yPercent: -100, duration: 0.62, ease: 'power4.inOut' }, 1.05);
    }, element);

    return () => {
      context.revert();
      document.body.style.overflow = '';
    };
  }, [done, reducedMotion]);

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-paper px-6 py-6 sm:px-10 sm:py-10"
    >
      <div data-intro-mark className="flex items-baseline justify-between">
        <span className="text-[13px] uppercase tracking-[0.18em] text-slate">{agency.shortName}</span>
        <span ref={counter} className="text-[13px] tabular-nums tracking-[0.18em] text-slate">
          000
        </span>
      </div>

      <div data-intro-mark className="text-[11vw] leading-[0.85] tracking-[-0.055em] sm:text-[8vw]">
        {agency.name}
      </div>

      <div
        data-intro-rule
        className="h-[3px] w-full origin-left bg-signalYellow"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
