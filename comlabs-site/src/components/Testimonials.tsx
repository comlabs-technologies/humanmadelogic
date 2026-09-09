import React from 'react';
import { Container, SectionHeading } from '@/components/ui/Section';
import { testimonials } from '@/config/content';

export function Testimonials() {
  return (
    <section className="bg-canvas py-section-mobile lg:py-section-desktop">
      <Container>
        <SectionHeading eyebrow={testimonials.eyebrow} heading={testimonials.heading} />

        <ul className="mt-10 lg:mt-14 grid md:grid-cols-3 gap-5">
          {testimonials.items.map((item) => (
            <li
              key={item.name}
              className="bg-surface border border-line rounded-scene p-6 flex flex-col"
            >
              <blockquote className="text-body-lg text-ink flex-1">
                <p>“{item.quote}”</p>
              </blockquote>
              <footer className="mt-6 pt-5 border-t border-hairline">
                <p className="text-[13px] font-medium tracking-tight text-ink">{item.name}</p>
                <p className="text-[12px] tracking-tight text-subtle mt-0.5">
                  {item.role} · {item.company}
                </p>
              </footer>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
