import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { Container, Eyebrow } from '@/components/ui/Section';
import { CtaBand } from '@/components/CtaBand';
import { articles, resourcesPage } from '@/config/content';
import { images } from '@/config/images';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Resources',
  description:
    'Guides, customer stories and changelog entries for Relay — a full resources index and article route included with the template.',
  path: '/resources',
});

const categoryForSection: Record<string, string> = {
  guides: 'Guides',
  stories: 'Customer stories',
  changelog: 'Changelog',
};

const [featured, ...rest] = articles;

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow={resourcesPage.eyebrow}
        heading={resourcesPage.heading}
        body={resourcesPage.body}
      >
        <ul className="flex flex-wrap gap-2">
          {resourcesPage.sections.map((section) => (
            <li key={section.id}>
              <Link
                href={`#${section.id}`}
                className="inline-flex items-center h-9 px-3.5 rounded-control border border-line bg-surface text-[13px] font-medium tracking-tight text-ink hover:border-ink/30 transition-colors"
              >
                {section.title}
              </Link>
            </li>
          ))}
        </ul>
      </PageHeader>

      <section className="bg-canvas py-12 lg:py-16" aria-labelledby="featured-heading">
        <Container>
          <h2 id="featured-heading" className="sr-only">
            Featured
          </h2>
          <Link
            href={`/resources/${featured.slug}`}
            className="group grid lg:grid-cols-2 gap-6 lg:gap-12 items-center bg-surface border border-line rounded-scene overflow-hidden"
          >
            <div className="relative editorial-grain aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[320px] overflow-hidden">
              <EditorialImage
                asset={images.resourceFeature}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-6 lg:p-10">
              <Eyebrow className="mb-4">{featured.category}</Eyebrow>
              <h3 className="text-heading-md lg:text-heading-lg text-ink">{featured.title}</h3>
              <p className="text-body-lg text-muted mt-4">{featured.excerpt}</p>
              <p className="text-[13px] text-subtle mt-5">
                {featured.author.name} · {featured.displayDate} · {featured.readingTime}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink mt-6 group-hover:gap-2.5 transition-all">
                Read the article
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </div>
          </Link>
        </Container>
      </section>

      {resourcesPage.sections
        .filter((section) => section.id !== 'help')
        .map((section, index) => {
          const items = rest.filter(
            (article) => article.category === categoryForSection[section.id],
          );

          return (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className={`scroll-mt-20 py-12 lg:py-16 ${
                index % 2 === 0 ? 'bg-raised border-y border-line' : 'bg-canvas'
              }`}
            >
              <Container>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 id={`${section.id}-heading`} className="text-heading-md text-ink">
                    {section.title}
                  </h2>
                  <p className="text-body text-subtle">{section.description}</p>
                </div>

                {items.length > 0 ? (
                  <ul className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((article) => (
                      <li key={article.slug}>
                        <Link
                          href={`/resources/${article.slug}`}
                          className="group flex flex-col h-full bg-surface border border-line rounded-scene overflow-hidden hover:border-ink/25 transition-colors"
                        >
                          <div className="relative editorial-grain aspect-[16/9] overflow-hidden">
                            <EditorialImage
                              asset={images[article.imageKey]}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <Eyebrow className="mb-3">{article.category}</Eyebrow>
                            <h3 className="text-[18px] tracking-[-0.03em] text-ink">
                              {article.title}
                            </h3>
                            <p className="text-body text-muted mt-2.5 flex-1">{article.excerpt}</p>
                            <p className="text-[12px] text-subtle mt-4">
                              {article.displayDate} · {article.readingTime}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-8 text-body text-subtle">
                    Add entries to <code className="text-ink">articles</code> in{' '}
                    <code className="text-ink">src/config/content.ts</code> to fill this section.
                  </p>
                )}
              </Container>
            </section>
          );
        })}

      <section
        id="help"
        aria-labelledby="help-heading"
        className="scroll-mt-20 bg-raised border-y border-line py-12 lg:py-16"
      >
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="help-heading" className="text-heading-md text-ink">
              Help centre
            </h2>
            <p className="text-body text-subtle">
              Short answers to the questions support hears most.
            </p>
          </div>

          <dl className="mt-8 grid md:grid-cols-2 gap-px bg-line border border-line rounded-scene overflow-hidden">
            {resourcesPage.helpTopics.map((topic) => (
              <div key={topic.question} className="bg-surface p-6">
                <dt className="text-[16px] font-medium tracking-tight text-ink">{topic.question}</dt>
                <dd className="text-body text-muted mt-2">{topic.answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
