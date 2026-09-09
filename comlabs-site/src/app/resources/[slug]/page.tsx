import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { Container, Eyebrow } from '@/components/ui/Section';
import { CtaBand } from '@/components/CtaBand';
import { articles } from '@/config/content';
import { images } from '@/config/images';
import { buildMetadata } from '@/lib/seo';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: Params) {
  const article = articles.find((entry) => entry.slug === params.slug);

  if (!article) {
    return buildMetadata({
      title: 'Article not found',
      description: 'This article does not exist.',
      path: `/resources/${params.slug}`,
    });
  }

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/resources/${article.slug}`,
    type: 'article',
    publishedTime: article.date,
  });
}

export default function ArticlePage({ params }: Params) {
  const article = articles.find((entry) => entry.slug === params.slug);

  if (!article) {
    notFound();
  }

  const related = articles.filter((entry) => entry.slug !== article.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="bg-canvas border-b border-line">
          <Container className="pt-10 lg:pt-14 pb-10 lg:pb-14">
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-ink"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              All resources
            </Link>

            <div className="max-w-prose mt-8">
              <Eyebrow className="mb-4">{article.category}</Eyebrow>
              <h1 className="text-[32px] leading-[1.08] tracking-[-0.035em] sm:text-[42px] sm:leading-[1.06] lg:text-[52px] lg:leading-[1.04] lg:tracking-[-0.04em] font-medium text-ink">
                {article.title}
              </h1>
              <p className="text-body-lg text-muted mt-5">{article.excerpt}</p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-7 text-[13px] text-subtle">
                <span className="text-ink font-medium">{article.author.name}</span>
                <span aria-hidden="true">·</span>
                <span>{article.author.role}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={article.date}>{article.displayDate}</time>
                <span aria-hidden="true">·</span>
                <span>{article.readingTime}</span>
              </div>
            </div>
          </Container>
        </header>

        <Container className="pt-10 lg:pt-14">
          <div className="relative editorial-grain rounded-scene overflow-hidden border border-line aspect-[16/9] lg:aspect-[16/7]">
            <EditorialImage
              asset={images[article.imageKey]}
              priority
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </Container>

        <Container className="py-12 lg:py-16">
          <div className="max-w-prose">
            {article.body.map((block, index) => {
              if (block.type === 'heading') {
                return (
                  <h2
                    key={index}
                    className="text-heading-md text-ink mt-10 first:mt-0 mb-3 scroll-mt-20"
                  >
                    {block.text}
                  </h2>
                );
              }

              if (block.type === 'list') {
                return (
                  <ul key={index} className="my-5 space-y-2.5">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[10px] w-1 h-1 rounded-full bg-subtle shrink-0"
                        />
                        <span className="text-body-lg text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              if (block.type === 'quote') {
                return (
                  <blockquote
                    key={index}
                    className="my-9 border-l-2 border-moss pl-6 py-1 max-w-[620px]"
                  >
                    <p className="font-serif text-[24px] leading-[1.35] tracking-[-0.01em] text-ink">
                      “{block.text}”
                    </p>
                    <footer className="text-[13px] text-subtle mt-3">{block.attribution}</footer>
                  </blockquote>
                );
              }

              return (
                <p key={index} className="text-body-lg text-muted mt-5 first:mt-0">
                  {block.text}
                </p>
              );
            })}
          </div>
        </Container>
      </article>

      <section
        aria-labelledby="related-heading"
        className="bg-raised border-y border-line py-12 lg:py-16"
      >
        <Container>
          <h2 id="related-heading" className="text-heading-md text-ink">
            Keep reading
          </h2>
          <ul className="mt-8 grid md:grid-cols-2 gap-5">
            {related.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={`/resources/${entry.slug}`}
                  className="group flex flex-col h-full bg-surface border border-line rounded-scene p-6 hover:border-ink/25 transition-colors"
                >
                  <Eyebrow className="mb-3">{entry.category}</Eyebrow>
                  <h3 className="text-[18px] tracking-[-0.03em] text-ink">{entry.title}</h3>
                  <p className="text-body text-muted mt-2.5 flex-1">{entry.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink mt-5 group-hover:gap-2.5 transition-all">
                    Read
                    <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
