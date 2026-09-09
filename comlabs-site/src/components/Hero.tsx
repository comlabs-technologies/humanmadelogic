import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { Avatar, FieldLabel, Panel, PanelFootnote, PanelHead, StatusPill } from '@/components/ui/Panel';
import { Container, Eyebrow } from '@/components/ui/Section';
import { hero } from '@/config/content';
import { images } from '@/config/images';

function CommandCentre() {
  const { commandPanel } = hero;

  return (
    <Panel elevated className="w-full sm:w-[352px]">
      <PanelHead
        title={commandPanel.title}
        meta={commandPanel.subtitle}
        accessory={<StatusPill label="Live" tone="done" />}
      />
      <ul className="divide-y divide-hairline">
        {commandPanel.rows.map((row) => (
          <li key={row.label} className="px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[13px] tracking-tight text-ink truncate">{row.label}</p>
              <StatusPill label={row.status} tone={row.tone} />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Avatar name={row.owner} size={20} />
              <span className="text-[11px] tracking-tight text-subtle">{row.owner}</span>
            </div>
          </li>
        ))}
      </ul>
      <PanelFootnote>{commandPanel.footnote}</PanelFootnote>
    </Panel>
  );
}

function EvidenceCards({ stacked = false }: { stacked?: boolean }) {
  return (
    <div className={`flex gap-3 ${stacked ? 'flex-col' : 'flex-col sm:flex-row'}`}>
      {hero.evidenceCards.map((card) => (
        <div
          key={card.label}
          className={`flex-1 bg-surface border border-line rounded-panel shadow-panel px-3.5 py-3 ${
            stacked ? 'w-[196px]' : 'w-full'
          }`}
        >
          <FieldLabel>{card.label}</FieldLabel>
          <p className="text-[13px] tracking-tight text-ink mt-1.5">{card.value}</p>
          <p className="text-[11px] tracking-tight text-subtle mt-1">{card.detail}</p>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative bg-canvas overflow-hidden">
      {/* Barely-visible vertical rail system — hero only. */}
      <div
        aria-hidden="true"
        className="hero-rails absolute inset-x-0 top-0 h-[560px] max-w-container mx-auto"
      />

      <Container className="relative pt-12 sm:pt-16 lg:pt-20 pb-8 text-center">
        <Eyebrow className="mb-5">{hero.eyebrow}</Eyebrow>
        <h1 className="text-[38px] leading-[1.06] sm:text-[54px] sm:leading-[1.0] lg:text-display lg:leading-[0.98] font-medium tracking-[-0.042em] text-ink max-w-[820px] mx-auto">
          {hero.heading}
        </h1>
        <p className="text-body-lg sm:text-subheading text-muted mt-5 max-w-[600px] mx-auto">
          {hero.body}
        </p>
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href={hero.primaryCta.href} size="large" className="w-full sm:w-auto">
            {hero.primaryCta.label}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
          <Button
            href={hero.secondaryCta.href}
            variant="secondary"
            size="large"
            className="w-full sm:w-auto"
          >
            {hero.secondaryCta.label}
          </Button>
        </div>
      </Container>

      <Container className="relative pb-14 lg:pb-28">
        <div className="relative">
          <div className="relative editorial-grain rounded-scene overflow-hidden border border-line aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8]">
            <EditorialImage
              asset={images.hero}
              priority
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-ink/5" />
          </div>

          {/* Product proof: one substantial panel crossing the image edge,
              with two small evidence cards attached to it. */}
          <div className="hidden lg:flex items-end gap-3 absolute left-8 -bottom-16 z-10">
            <CommandCentre />
            <EvidenceCards stacked />
          </div>

          <div className="lg:hidden -mt-10 sm:-mt-14 px-1 sm:px-6 relative z-10 flex flex-col gap-3">
            <CommandCentre />
            <EvidenceCards />
          </div>
        </div>
      </Container>
    </section>
  );
}
