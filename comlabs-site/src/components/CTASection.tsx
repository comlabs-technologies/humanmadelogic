import { ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { EditorialImage } from './EditorialImage';
import { editorialImages } from '@/lib/editorialImages';

export function CTASection() {
  return (
    <section id="get-superhuman" className="relative overflow-hidden">
      <EditorialImage
        src={editorialImages.hero}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        objectPosition="68% center"
      />
      <div className="absolute inset-0 bg-[#d7e6f2]/88" />
      <div className="relative z-10 max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <h2 className="font-sans text-heading-lg md:text-heading-xl tracking-tight text-ink max-w-[640px]">
            AI that works everywhere you work
          </h2>
          <Button href="#signin" size="large" className="bg-white text-ink hover:bg-white/90 shrink-0">
            Get Superhuman
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
