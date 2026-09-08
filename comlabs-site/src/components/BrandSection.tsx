import { Button } from './Button';
import { EditorialImage } from './EditorialImage';
import { editorialImages } from '@/lib/editorialImages';

export function BrandSection() {
  return (
    <section className="relative overflow-hidden bg-forest">
      <EditorialImage
        src={editorialImages.lagoonTexture}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-forest/84" />

      <div className="relative z-10 max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop py-section-mobile md:py-section-desktop">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden bg-forest">
            <EditorialImage
              src={editorialImages.motion}
              alt="Arched architecture with sunlight"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              objectPosition="center"
            />
            <div className="absolute inset-0 bg-forest/30" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 glass-panel rounded-card w-[58%] p-4">
              <p className="font-secondary text-label tracking-tight text-ink/70 mb-2">Announcement</p>
              <p className="font-sans text-[15px] tracking-tight text-ink">Becoming Superhuman</p>
            </div>
          </div>

          <div>
            <h2 className="font-sans text-heading-xl tracking-tight text-white mb-5">
              Becoming Superhuman.
            </h2>
            <p className="font-secondary text-body-lg text-white/80 tracking-tight mb-8 max-w-[460px]">
              Superhuman is the suite for writing, planning, and communicating with AI that
              meets you where you already work—Mail, Docs, Grammarly, and Go.
            </p>
            <Button
              href="#announcement"
              variant="secondary"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Read our announcement
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
