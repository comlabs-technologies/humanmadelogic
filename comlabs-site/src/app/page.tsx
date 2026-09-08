import { Banner } from '@/components/Banner';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { SuiteSection } from '@/components/SuiteSection';
import { BrandSection } from '@/components/BrandSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas">
      <Banner />
      <Navbar />
      <Hero />
      <TrustStrip />
      <SuiteSection />
      <BrandSection />
      <CTASection />
      <Footer />
    </main>
  );
}
