import React from 'react';
import { Container, SectionHeading } from '@/components/ui/Section';
import { useCases } from '@/config/content';

/**
 * "Built for teams with a product to explain" — the section that shows a buyer
 * this template is not tied to one product category.
 */
export function UseCases() {
  return (
    <section
      id={useCases.id}
      className="bg-raised border-y border-line py-section-mobile lg:py-section-desktop scroll-mt-20"
    >
      <Container>
        <SectionHeading
          eyebrow={useCases.eyebrow}
          heading={useCases.heading}
          body={useCases.body}
        />

        <ul className="mt-10 lg:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-scene overflow-hidden">
          {useCases.items.map((item) => (
            <li key={item.title} className="bg-surface p-6 lg:p-7 flex flex-col">
              <h3 className="text-[19px] tracking-[-0.03em] text-ink">{item.title}</h3>
              <p className="text-body text-muted mt-3 flex-1">{item.body}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {item.examples.map((example) => (
                  <li
                    key={example}
                    className="inline-flex items-center h-[24px] px-2 rounded-[6px] border border-line bg-canvas text-[11px] font-medium tracking-tight text-muted"
                  >
                    {example}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
