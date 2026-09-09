import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { ContactForm } from '@/components/ContactForm';
import { Container } from '@/components/ui/Section';
import { contactPage } from '@/config/content';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact',
  description:
    'An accessible contact form with client-side validation states — no backend and no email provider required.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow={contactPage.eyebrow}
        heading={contactPage.heading}
        body={contactPage.body}
      />

      <section className="bg-canvas py-14 lg:py-20">
        <Container>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
            <ContactForm />

            <aside className="lg:pt-2">
              <h2 className="text-[16px] font-medium tracking-tight text-ink">Reach us directly</h2>
              <dl className="mt-5 divide-y divide-hairline border-y border-line">
                {contactPage.details.map((detail) => (
                  <div key={detail.label} className="py-3.5">
                    <dt className="text-[12px] uppercase tracking-[0.09em] text-subtle">
                      {detail.label}
                    </dt>
                    <dd className="text-body text-ink mt-1">{detail.value}</dd>
                  </div>
                ))}
                <div className="py-3.5">
                  <dt className="text-[12px] uppercase tracking-[0.09em] text-subtle">Studio</dt>
                  <dd className="text-body text-ink mt-1">
                    {siteConfig.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <p className="text-[13px] text-subtle mt-6">
                Contact details are demo values. Update them in{' '}
                <code className="text-ink">src/config/site.ts</code>.
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
