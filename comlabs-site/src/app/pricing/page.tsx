import React from 'react';
import { Check, Minus } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { CtaBand } from '@/components/CtaBand';
import { pricing } from '@/config/content';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Pricing',
  description:
    'Three demo tiers — Starter, Team and Studio — with a full comparison table. Every value is editable from the template content layer.',
  path: '/pricing',
});

function CellValue({ value }: { value: string }) {
  if (value === '—') {
    return (
      <span className="inline-flex items-center text-subtle">
        <Minus size={14} aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  if (value === 'Included') {
    return (
      <span className="inline-flex items-center gap-1.5 text-ink">
        <Check size={14} className="text-signal" aria-hidden="true" />
        Included
      </span>
    );
  }
  return <span className="text-ink">{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      <PageHeader eyebrow={pricing.eyebrow} heading={pricing.heading} body={pricing.body} />

      <section className="bg-canvas py-14 lg:py-20" aria-labelledby="tiers-heading">
        <Container>
          <h2 id="tiers-heading" className="sr-only">
            Plans
          </h2>
          <ul className="grid md:grid-cols-3 gap-5 items-start">
            {pricing.tiers.map((tier) => (
              <li
                key={tier.id}
                className={`bg-surface rounded-scene p-6 lg:p-7 flex flex-col h-full ${
                  tier.recommended
                    ? 'border-2 border-moss shadow-panel'
                    : 'border border-line'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[19px] tracking-[-0.03em] text-ink">{tier.name}</h3>
                  {tier.recommended && (
                    <span className="inline-flex items-center h-[22px] px-2 rounded-[6px] bg-moss text-white text-[11px] font-medium tracking-tight">
                      Recommended
                    </span>
                  )}
                </div>

                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-display text-[40px] leading-none font-medium tracking-[-0.04em] text-ink">
                    {tier.price}
                  </span>
                  <span className="text-[13px] text-subtle">{tier.cadence}</span>
                </p>

                <p className="text-body text-muted mt-3">{tier.summary}</p>

                <ul className="mt-6 space-y-2.5 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check size={15} className="mt-1 text-signal shrink-0" aria-hidden="true" />
                      <span className="text-body text-ink">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <Button
                    href={tier.cta.href}
                    variant={tier.recommended ? 'primary' : 'secondary'}
                    size="large"
                    className="w-full"
                  >
                    {tier.cta.label}
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <p className="text-[13px] text-subtle mt-6">{pricing.note}</p>
        </Container>
      </section>

      <section
        className="bg-raised border-y border-line py-14 lg:py-20"
        aria-labelledby="comparison-heading"
      >
        <Container>
          <h2 id="comparison-heading" className="text-heading-md lg:text-heading-lg text-ink">
            {pricing.comparison.heading}
          </h2>

          <div className="mt-8 overflow-x-auto rounded-scene border border-line bg-surface">
            <table className="w-full min-w-[640px] border-collapse text-body">
              <caption className="sr-only">
                Feature comparison across the Starter, Team and Studio tiers
              </caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="text-left font-medium text-ink px-5 py-4 w-[34%]">
                    Feature
                  </th>
                  {pricing.comparison.columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="text-left font-medium text-ink px-5 py-4"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricing.comparison.groups.map((group) => (
                  <React.Fragment key={group.title}>
                    <tr className="bg-canvas">
                      <th
                        scope="colgroup"
                        colSpan={4}
                        className="text-left px-5 py-2.5 text-micro uppercase tracking-[0.12em] text-subtle font-medium"
                      >
                        {group.title}
                      </th>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.label} className="border-t border-hairline">
                        <th
                          scope="row"
                          className="text-left font-normal text-muted px-5 py-3.5 align-top"
                        >
                          {row.label}
                        </th>
                        {row.values.map((value, index) => (
                          <td key={`${row.label}-${index}`} className="px-5 py-3.5 align-top">
                            <CellValue value={value} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="bg-canvas py-14 lg:py-20" aria-labelledby="faq-heading">
        <Container>
          <h2 id="faq-heading" className="text-heading-md lg:text-heading-lg text-ink">
            Common questions
          </h2>
          <dl className="mt-8 grid md:grid-cols-3 gap-x-8 gap-y-8">
            {pricing.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-[16px] font-medium tracking-tight text-ink">{faq.question}</dt>
                <dd className="text-body text-muted mt-2">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
