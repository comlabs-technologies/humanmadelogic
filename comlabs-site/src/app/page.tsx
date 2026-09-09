import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { CapabilitySuite } from '@/components/CapabilitySuite';
import { FeatureBand } from '@/components/FeatureBand';
import { UseCases } from '@/components/UseCases';
import { Testimonials } from '@/components/Testimonials';
import { CtaBand } from '@/components/CtaBand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CapabilitySuite />
      <FeatureBand />
      <UseCases />
      <Testimonials />
      <CtaBand />
    </>
  );
}
