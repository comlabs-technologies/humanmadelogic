import React from 'react';
import { Container, Eyebrow } from '@/components/ui/Section';

export function PageHeader({
  eyebrow,
  heading,
  body,
  children,
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="bg-canvas border-b border-line">
      <Container className="pt-14 lg:pt-20 pb-12 lg:pb-16">
        {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
        <h1 className="text-[34px] leading-[1.08] tracking-[-0.035em] sm:text-[44px] sm:leading-[1.05] lg:text-[56px] lg:leading-[1.02] lg:tracking-[-0.04em] font-medium text-ink max-w-[760px]">
          {heading}
        </h1>
        {body && <p className="text-body-lg text-muted mt-5 max-w-[620px]">{body}</p>}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </header>
  );
}
