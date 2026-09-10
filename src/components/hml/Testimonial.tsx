import { testimonial } from '@/config/agency';
import { RevealText } from './RevealText';

export function Testimonial() {
  return (
    <section className="py-24 sm:py-32 lg:py-44">
      <figure className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <blockquote>
          <RevealText
            as="p"
            lines={[`“${testimonial.quote}”`]}
            className="max-w-[20ch] text-[7.6vw] leading-[1.08] tracking-[-0.04em] sm:max-w-[16ch] sm:text-[5.2vw] lg:max-w-[18ch] lg:text-[3.8vw] xl:text-[56px]"
          />
        </blockquote>
        <figcaption className="mt-10 flex items-center gap-3 text-[14px] lg:mt-14">
          <span aria-hidden="true" className="h-px w-10 bg-obsidian/25" />
          <span>{testimonial.name}</span>
          <span className="text-slate">— {testimonial.role}</span>
        </figcaption>
      </figure>
    </section>
  );
}
