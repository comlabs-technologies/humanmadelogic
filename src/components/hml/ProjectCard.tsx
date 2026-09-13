'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Project } from '@/config/agency';
import { media } from '@/config/media';
import { useFinePointer } from '@/lib/hml/useMediaQuery';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { ScenicStage, StageWindow } from './ScenicStage';

/**
 * Four deliberately different compositions rather than four cards.
 *
 * monument     — the frame runs past the right edge, copy held left
 * offset-right — tall portrait crop on the right, copy in the outer column
 * offset-left  — the frame breaks the left edge, copy pulled to the far right
 * panorama     — a narrow full-bleed band with the copy sitting beneath it
 */
const LAYOUTS = {
  monument: {
    root: 'lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-8',
    frame: 'lg:col-span-8 lg:col-start-5 lg:-mr-[7vw]',
    body: 'lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:pb-6',
    sizes: '(max-width: 1024px) 100vw, 62vw',
    stageAspect: 'aspect-[4/3] sm:aspect-[16/10]',
    window: 'left-[6%] top-[8%] w-[80%]',
  },
  'offset-right': {
    root: 'lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8',
    frame: 'lg:col-span-5 lg:col-start-8',
    body: 'lg:col-span-5 lg:col-start-1 lg:row-start-1',
    sizes: '(max-width: 1024px) 100vw, 42vw',
    stageAspect: 'aspect-[4/3] sm:aspect-[5/4]',
    window: 'right-[6%] top-[10%] w-[80%]',
  },
  'offset-left': {
    root: 'lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8',
    frame: 'lg:col-span-7 lg:col-start-1 lg:-ml-[7vw]',
    body: 'lg:col-span-4 lg:col-start-9',
    sizes: '(max-width: 1024px) 100vw, 58vw',
    stageAspect: 'aspect-[4/3] sm:aspect-[5/4]',
    window: 'bottom-[9%] left-[6%] w-[80%]',
  },
  panorama: {
    root: '',
    frame: 'lg:-mx-[7vw]',
    body: 'lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-8',
    sizes: '100vw',
    stageAspect: 'aspect-[16/10] sm:aspect-[21/9]',
    window: 'left-[4%] top-[9%] w-[72%] md:w-[64%]',
  },
} as const;

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const asset = media[project.media];
  const layout = LAYOUTS[project.layout];

  const frame = useRef<HTMLDivElement | null>(null);
  const label = useRef<HTMLSpanElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const [open, setOpen] = useState(false);

  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const interactive = finePointer && !reducedMotion;

  const registerFrame = useCallback((element: HTMLDivElement | null) => {
    frame.current = element;
  }, []);

  // Pointer listeners attach on enter and detach on leave — nothing keeps
  // running once the cursor is elsewhere on the page.
  useEffect(() => {
    const element = frame.current;
    if (!element || !interactive) return;

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (label.current) {
        label.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(1)`;
        label.current.style.opacity = '1';
      }
      if (title.current) {
        const dx = (x / rect.width - 0.5) * 14;
        title.current.style.transform = `translate3d(${dx.toFixed(2)}px, 0, 0)`;
      }
    };

    const onLeave = () => {
      if (label.current) {
        label.current.style.opacity = '0';
        label.current.style.transform += ' scale(0.72)';
      }
      if (title.current) title.current.style.transform = 'translate3d(0, 0, 0)';
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerleave', onLeave);
    };

    const onEnter = () => {
      element.addEventListener('pointermove', onMove);
      element.addEventListener('pointerleave', onLeave);
    };

    element.addEventListener('pointerenter', onEnter);
    return () => {
      element.removeEventListener('pointerenter', onEnter);
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerleave', onLeave);
    };
  }, [interactive]);

  return (
    <article data-project className={layout.root}>
      <div className={layout.frame}>
        {/* Every project photograph sits on its own shader field, inset so the
            ground reads around it — the same stage language as the belief
            section, at a single-window scale. */}
        <ScenicStage id={`work-${project.id}`} aspect={layout.stageAspect} wash={0.34}>
          <StageWindow
            id={`work-${project.id}`}
            asset={asset}
            layer={20}
            onFrame={registerFrame}
            sizes={layout.sizes}
            restGrayscale={0.2}
            className={layout.window}
          >
            {/* Decorative pointer label. The card is not a link, so nothing
                here promises a case-study page that does not exist. */}
            <span
              ref={label}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-20 hidden h-[96px] w-[96px] items-center justify-center rounded-full bg-signalYellow text-center text-[11px] uppercase leading-[1.25] tracking-[0.12em] text-obsidian opacity-0 transition-opacity duration-300 lg:flex"
              style={{ transform: 'translate3d(-200px, -200px, 0) scale(0.72)' }}
            >
              Explore
              <br />
              service
            </span>
          </StageWindow>
        </ScenicStage>
      </div>

      <div className={`${layout.body} mt-7 lg:mt-0`} data-project-body>
        <div className={project.layout === 'panorama' ? 'lg:col-span-7 lg:pt-10' : ''}>
          <div className="flex items-baseline gap-4">
            <span className="text-[12px] tabular-nums tracking-[0.18em] text-slate">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-[12px] tracking-[0.14em] text-slate">{project.year}</span>
          </div>

          <h3
            ref={title}
            className="mt-3 text-[34px] leading-[1.05] tracking-[-0.045em] transition-transform duration-500 ease-out sm:text-[44px] lg:text-[52px]"
          >
            {project.client}
          </h3>

          <p className="mt-3 max-w-[42ch] text-[16px] leading-[1.55] text-slate">
            {project.summary}
          </p>
        </div>

        <div
          className={
            project.layout === 'panorama'
              ? 'mt-6 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:pt-10 lg:text-right'
              : 'mt-6'
          }
        >
          <ul
            className={`flex flex-wrap gap-2 ${
              project.layout === 'panorama' ? 'lg:justify-end' : ''
            }`}
          >
            {project.services.map((service) => (
              <li
                key={service}
                className="rounded-full border border-obsidian/15 px-3 py-1.5 text-[12px] text-slate"
              >
                {service}
              </li>
            ))}
          </ul>

          <p
            className={`mt-5 flex items-baseline gap-2 text-[15px] ${
              project.layout === 'panorama' ? 'lg:justify-end' : ''
            }`}
          >
            <span aria-hidden="true" className="h-[6px] w-[6px] rounded-full bg-signalYellow" />
            {project.result}
          </p>

          {/* Touch devices get a real control instead of a hover affordance. */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="mt-5 inline-flex h-11 items-center rounded-full border border-obsidian/20 px-5 text-[14px] lg:hidden"
          >
            {open ? 'Hide detail' : 'Project detail'}
          </button>

          {open && (
            <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.6] text-slate lg:hidden">
              {project.client} — {project.summary}. Delivered across{' '}
              {project.services.join(', ').toLowerCase()}, {project.result.toLowerCase()}.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
