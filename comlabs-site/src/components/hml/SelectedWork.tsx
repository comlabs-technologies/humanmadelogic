'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { work } from '@/config/agency';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { useIsomorphicLayoutEffect } from '@/lib/hml/useIsomorphicLayoutEffect';
import { ProjectCard } from './ProjectCard';
import { RevealText } from './RevealText';

export function SelectedWork() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const element = section.current;
    if (!element || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-project]').forEach((project) => {
        const body = project.querySelector('[data-project-body]');
        if (!body) return;

        gsap.from(body.children, {
          y: 26,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: project, start: 'top 72%', once: true },
        });
      });
    }, element);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section id="work" ref={section} className="scroll-mt-24 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate lg:col-span-3">
            {work.label}
          </p>
          <RevealText
            lines={work.heading}
            className="text-[7.4vw] leading-[1.05] tracking-[-0.04em] sm:text-[4.8vw] lg:col-span-9 lg:text-[3.6vw] xl:text-[52px]"
          />
        </div>

        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28 lg:space-y-36">
          {work.items.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
