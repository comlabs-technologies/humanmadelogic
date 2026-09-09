import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container, Eyebrow } from '@/components/ui/Section';
import { notFoundPage } from '@/config/content';

export const metadata = {
  title: 'Page not found',
  description: 'The page you were looking for does not exist.',
};

export default function NotFound() {
  return (
    <section className="bg-canvas">
      <Container className="py-20 lg:py-32">
        <div className="max-w-[620px]">
          <Eyebrow className="mb-5">Error {notFoundPage.code}</Eyebrow>
          <h1 className="text-[36px] leading-[1.06] tracking-[-0.035em] sm:text-[44px] sm:leading-[1.04] lg:text-[56px] lg:leading-[1.02] lg:tracking-[-0.04em] font-medium text-ink">
            {notFoundPage.heading}
          </h1>
          <p className="text-body-lg text-muted mt-5">{notFoundPage.body}</p>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {notFoundPage.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span className="text-[19px] tracking-[-0.03em] text-ink">{link.label}</span>
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="text-subtle shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
