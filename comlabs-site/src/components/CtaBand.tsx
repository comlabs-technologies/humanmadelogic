import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { ctaBand } from '@/config/content';

export function CtaBand() {
  return (
    <section className="bg-canvas border-t border-line">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-[620px]">
            <h2 className="text-heading-md sm:text-heading-lg lg:text-heading-xl text-ink">
              {ctaBand.heading}
            </h2>
            <p className="text-body-lg text-muted mt-4 max-w-[520px]">{ctaBand.body}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button href={ctaBand.primaryCta.href} size="large">
              {ctaBand.primaryCta.label}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href={ctaBand.secondaryCta.href} variant="secondary" size="large">
              {ctaBand.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
