'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Project } from '@/config/agency';
import { useFinePointer } from '@/lib/hml/useMediaQuery';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { useWebGLSurface } from './webgl/registry';

const layoutClasses: Record<Project['layout'], { frame: string; body: string; aspect: string }> = {
  wide: {
    frame: 'lg:col-span-12',
    body: 'lg:col-span-12 lg:flex lg:items-end lg:justify-between lg:gap-12',
    aspect: 'aspect-[4/3] sm:aspect-[16/9]',
  },
  'offset-right': {
    frame: 'lg:col-span-7 lg:col-start-6',
    body: 'lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:self-end',
    aspect: 'aspect-[4/3] sm:aspect-[5/4]',
  },
  'offset-left': {
    frame: 'lg:col-span-7',
    body: 'lg:col-span-4 lg:col-start-9 lg:self-end',
    aspect: 'aspect-[4/3] sm:aspect-[5/4]',
  },
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const frame = useWebGLSurface<HTMLDivElement>(`work-${project.id}`, {
    src: project.image.src,
    radius: 18,
    distortion: 0.8,
    restGrayscale: 0.25,
    hoverZoom: 0.9,
    scrollInfluence: 0.9,
  });

  const label = useRef<HTMLSpanElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const [open, setOpen] = useState(false);

  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const interactive = finePointer && !reducedMotion;

  // Pointer listeners are attached on enter and removed on leave, so nothing
  // keeps running once the cursor is elsewhere.
  const onEnter = useCallback(() => {
    if (!interactive) return;
    const element = frame.current;
    if (!element) return;

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (label.current) {
        label.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(1)`;
        label.current.style.opacity = '1';
      }
      if (title.current) {
        const dx = (x / rect.width - 0.5) * 18;
        title.current.style.transform = `translate3d(${dx.toFixed(2)}px, 0, 0)`;
      }
    };

    const onLeave = () => {
      if (label.current) {
        label.current.style.opacity = '0';
        label.current.style.transform += ' scale(0.7)';
      }
      if (title.current) title.current.style.transform = 'translate3d(0, 0, 0)';
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerleave', onLeave);
    };

    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerleave', onLeave);
  }, [frame, interactive]);

  useEffect(() => {
    const element = frame.current;
    if (!element || !interactive) return;
    element.addEventListener('pointerenter', onEnter);
    return () => element.removeEventListener('pointerenter', onEnter);
  }, [frame, interactive, onEnter]);

  const classes = layoutClasses[project.layout];

  return (
    <article
      data-project
      className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-x-8"
    >
      <div className={classes.frame}>
        <div
          ref={frame}
          className={`webgl-surface relative w-full overflow-hidden rounded-[18px] bg-obsidian/5 ${classes.aspect}`}
        >
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            loading="lazy"
            className="object-cover"
          />

          {/* Decorative pointer label — the card itself is not a link, so
              nothing here promises a page that does not exist. */}
          <span
            ref={label}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[92px] w-[92px] items-center justify-center rounded-full bg-signalYellow text-center text-[11px] uppercase leading-[1.25] tracking-[0.12em] text-obsidian opacity-0 transition-opacity duration-300 lg:flex"
            style={{ transform: 'translate3d(-100px, -100px, 0) scale(0.7)' }}
          >
            View
            <br />
            project
          </span>
        </div>
      </div>

      <div className={`${classes.body} pt-1`} data-project-body>
        <div>
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

        <div className="mt-6 lg:mt-0 lg:shrink-0 lg:text-right">
          <ul className="flex flex-wrap gap-2 lg:justify-end">
            {project.services.map((service) => (
              <li
                key={service}
                className="rounded-full border border-obsidian/15 px-3 py-1.5 text-[12px] text-slate"
              >
                {service}
              </li>
            ))}
          </ul>

          <p className="mt-5 flex items-baseline gap-2 text-[15px] lg:justify-end">
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
