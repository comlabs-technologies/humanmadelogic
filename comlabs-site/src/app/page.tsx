import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { EditorialSplit } from '@/components/EditorialSplit';
import { SystemSection } from '@/components/SystemSection';
import { LagoonFeature } from '@/components/LagoonFeature';
import { FeatureRows } from '@/components/FeatureRows';
import { ComparisonSection } from '@/components/ComparisonSection';
import { TestimonialSection } from '@/components/TestimonialSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas">
      <Navbar />
      <Hero />
      <TrustStrip />
      <EditorialSplit />
      <SystemSection />
      <LagoonFeature />
      <FeatureRows />
      <ComparisonSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </main>
  );
}
