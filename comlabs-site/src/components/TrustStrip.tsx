const companies = ['Figma', 'DoorDash', 'Zapier', 'GEICO', 'Rivian'];

export function TrustStrip() {
  return (
    <section className="bg-canvas py-12 md:py-16">
      <div className="max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop text-center">
        <p className="font-secondary text-label text-muted tracking-tight mb-8">
          Trusted by the most innovative companies in the world.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-y-4">
          {companies.map((name, index) => (
            <div key={name} className="flex items-center">
              {index > 0 && <span className="hidden sm:block w-px h-5 bg-line mx-6 md:mx-10" />}
              <span className="font-sans text-[18px] md:text-[20px] font-medium tracking-tight text-ink/70 px-3 sm:px-0">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
