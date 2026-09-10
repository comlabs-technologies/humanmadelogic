import { proof } from '@/config/agency';

/**
 * Marquee on large screens, static grid everywhere else. The reduced-motion
 * rule in globals.css stops the animation without hiding any of the content.
 */
export function ProofStrip() {
  const row = (
    <ul className="flex shrink-0 items-baseline gap-10 pr-10 sm:gap-16 sm:pr-16">
      {proof.map((item) => (
        <li key={item.label} className="flex shrink-0 items-baseline gap-3 whitespace-nowrap">
          <span className="text-[26px] tracking-[-0.04em] sm:text-[32px]">{item.value}</span>
          <span className="text-[13px] text-slate">{item.label}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Studio in numbers" className="border-y border-obsidian/10 py-8 sm:py-10">
      {/* Large screens: a gently moving marquee. */}
      <div className="hidden overflow-hidden lg:block">
        <div className="hml-marquee flex w-max">
          {row}
          <span aria-hidden="true" className="contents">
            {row}
          </span>
        </div>
      </div>

      {/* Small screens and reduced motion: a plain grid. */}
      <ul className="mx-auto grid max-w-editorial grid-cols-2 gap-x-6 gap-y-6 px-5 sm:grid-cols-3 sm:px-8 lg:hidden">
        {proof.map((item) => (
          <li key={item.label}>
            <p className="text-[26px] tracking-[-0.04em]">{item.value}</p>
            <p className="mt-1 text-[13px] text-slate">{item.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
