import React from 'react';

export function Container({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`max-w-container mx-auto px-gutter-mobile sm:px-gutter-tablet lg:px-gutter-desktop ${className}`}
    >
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  tone = 'dark',
  className = '',
}: {
  children: React.ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <p
      className={`text-micro uppercase tracking-[0.14em] font-medium ${
        tone === 'dark' ? 'text-subtle' : 'text-white/60'
      } ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  heading,
  body,
  align = 'left',
  className = '',
  as: Heading = 'h2',
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <div
      className={`${align === 'center' ? 'text-center mx-auto' : ''} max-w-[720px] ${className}`}
    >
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <Heading className="text-heading-md sm:text-heading-lg lg:text-heading-xl text-ink">
        {heading}
      </Heading>
      {body && <p className="text-body-lg text-muted mt-4 max-w-[560px]">{body}</p>}
    </div>
  );
}
