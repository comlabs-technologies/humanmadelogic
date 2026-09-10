import React from 'react';
import { ArrowRight, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { Avatar, FieldLabel } from '@/components/ui/Panel';
import { Container, Eyebrow } from '@/components/ui/Section';
import { featureBand } from '@/config/content';
import { images } from '@/config/images';

/**
 * The dark editorial band. One original abstract composition, one floating
 * interface panel — no placeholder blocks, no gradients beyond the artwork.
 */
export function FeatureBand() {
  const { panel } = featureBand;

  return (
    <section className="relative bg-moss overflow-hidden">
      <EditorialImage
        asset={images.featureBand}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-moss/70" />

      <Container className="relative py-section-mobile lg:py-section-desktop">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-20 items-center">
          <div>
            <Eyebrow tone="light" className="mb-5">
              {featureBand.eyebrow}
            </Eyebrow>
            <h2 className="text-heading-md sm:text-heading-lg lg:text-heading-xl text-white max-w-[520px]">
              {featureBand.heading}
            </h2>
            <p className="text-body-lg text-white/70 mt-5 max-w-[500px]">{featureBand.body}</p>
            <div className="mt-8">
              <Button href={featureBand.cta.href} variant="inverse" size="large">
                {featureBand.cta.label}
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="relative lg:pl-8">
            <div className="bg-surface border border-line rounded-scene shadow-raised max-w-[420px] lg:ml-auto overflow-hidden">
              <div className="px-4 py-3 border-b border-hairline flex items-center justify-between">
                <FieldLabel>{panel.title}</FieldLabel>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-subtle">
                  <Link2 size={12} aria-hidden="true" />4 sources
                </span>
              </div>
              <div className="px-4 py-4">
                <p className="text-[17px] tracking-[-0.02em] text-ink leading-snug">
                  {panel.decision}
                </p>
                <p className="text-[11px] tracking-tight text-subtle mt-2">{panel.meta}</p>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-hairline">
                  <Avatar name={panel.owner} size={22} />
                  <span className="text-[12px] tracking-tight text-muted">{panel.owner}</span>
                </div>

                <div className="mt-3 rounded-panel border border-line bg-raised px-3.5 py-3">
                  <FieldLabel>Next action</FieldLabel>
                  <p className="text-[13px] tracking-tight text-ink mt-1.5">{panel.nextStep}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
