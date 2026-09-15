import { agency } from '@/config/agency';
import { capabilities, work } from '@/config/agency';
import { siteConfig } from '@/config/site';

/**
 * JSON-LD for the homepage: who the studio is, what it offers, and the
 * search action for the site itself. Rendered as a script tag rather than
 * through `metadata`, which has no structured-data slot.
 */
export function StructuredData() {
  const url = siteConfig.url;

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${url}/#organization`,
        name: agency.name,
        alternateName: agency.shortName,
        url,
        email: agency.email,
        slogan: agency.principle,
        description: siteConfig.description,
        logo: { '@type': 'ImageObject', url: `${url}/icon.svg` },
        image: `${url}/opengraph-image`,
        areaServed: 'Worldwide',
        knowsAbout: capabilities.items.map((item) => item.title),
        makesOffer: work.items.map((item) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: item.client,
            description: item.summary,
          },
        })),
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Sales',
          email: agency.email,
          availableLanguage: 'English',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url,
        name: agency.name,
        description: siteConfig.description,
        publisher: { '@id': `${url}/#organization` },
        inLanguage: 'en',
      },
      {
        '@type': 'WebPage',
        '@id': `${url}/#webpage`,
        url,
        name: `${agency.name} — ${agency.principle}`,
        isPartOf: { '@id': `${url}/#website` },
        about: { '@id': `${url}/#organization` },
        inLanguage: 'en',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Serialised from our own config — no user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
