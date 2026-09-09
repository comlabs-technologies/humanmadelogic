import React from 'react';
import { Container } from '@/components/ui/Section';
import { trustStrip } from '@/config/content';

/**
 * Typography-only customer marks. These are fictional demo names — replace
 * them with your own customers, or with real logos if you have permission.
 */
export function TrustStrip() {
  return (
    <section aria-label="Customers" className="bg-canvas border-y border-line">
      <Container className="py-10 lg:py-12">
        <p className="text-[13px] tracking-tight text-subtle text-center">{trustStrip.label}</p>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {trustStrip.marks.map((mark) => (
            <li
              key={mark}
              className="text-[17px] sm:text-[19px] font-medium tracking-[-0.04em] text-ink/55"
            >
              {mark}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
