import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Container } from '@/components/ui/Section';
import type { LegalSection } from '@/config/content';

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader eyebrow={updated} heading={title} body={intro} />

      <section className="bg-canvas py-12 lg:py-16">
        <Container>
          <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
            <nav aria-label="On this page" className="lg:sticky lg:top-24">
              <p className="text-micro uppercase tracking-[0.12em] text-subtle mb-4">
                On this page
              </p>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-[14px] text-muted hover:text-ink transition-colors"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="max-w-prose">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24 mb-12 last:mb-0">
                  <h2 className="text-heading-md text-ink">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-body-lg text-muted mt-4">
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="mt-5 space-y-2.5">
                      {section.list.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-[10px] w-1 h-1 rounded-full bg-subtle shrink-0"
                          />
                          <span className="text-body-lg text-muted">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
