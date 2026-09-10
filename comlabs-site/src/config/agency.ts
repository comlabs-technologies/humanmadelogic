/**
 * Human Made Logic — homepage content.
 * Every string, capability, project and stat on the homepage lives here.
 */

import type { MediaKey } from './media';

export type NavLink = { label: string; href: string };

export const agency = {
  name: 'Human Made Logic',
  shortName: 'HML',
  principle: 'Human instinct. Creative systems. Measurable growth.',
  email: 'hello@humanmadelogic.com',
  location: 'Working worldwide',
  availability: 'Taking projects for Q3',
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#capabilities' },
    { label: 'Studio', href: '#studio' },
    { label: 'Contact', href: '#contact' },
  ] as NavLink[],
  cta: { label: 'Start a project', href: '#contact' },
  social: [
    { label: 'Instagram', href: '#contact' },
    { label: 'LinkedIn', href: '#contact' },
  ] as NavLink[],
} as const;

/* ------------------------------------------------------------------ hero */

export type HeroFrame = {
  /** Key into the art-direction manifest in `src/config/media.ts`. */
  media: MediaKey;
  discipline: string;
  /** Vertical offset in % of the frame height — drives the alternating fan. */
  offset: number;
  /** Resting rotation in degrees. */
  rotate: number;
  /** Pointer-follow depth multiplier. Higher = moves further. */
  depth: number;
};

export const hero = {
  eyebrow: 'Independent creative partner · Strategy to scale',
  headline: ['We make brands', 'impossible to ignore.'],
  body: 'Human Made Logic is a marketing and design agency building identities, digital experiences and campaigns that turn attention into measurable growth.',
  primaryCta: { label: 'Start a project', href: '#contact' },
  secondaryCta: { label: 'Explore our work', href: '#work' },
  scrollHint: 'Scroll',
  frames: [
    { media: 'heroIdentity', discipline: 'Identity', offset: 4, rotate: -3.4, depth: 0.55 },
    { media: 'heroArtDirection', discipline: 'Art direction', offset: -7, rotate: 2.1, depth: 0.9 },
    { media: 'heroProduct', discipline: 'Product', offset: 2, rotate: -1.2, depth: 1.25 },
    { media: 'heroCampaign', discipline: 'Campaign', offset: -9, rotate: 3.1, depth: 0.9 },
    { media: 'heroCulture', discipline: 'Culture', offset: 6, rotate: -2.4, depth: 0.55 },
  ] as HeroFrame[],
};

/* ------------------------------------------------------------- statement */

export const statement = {
  label: '/ What we believe',
  lines: ['Good marketing earns attention.', 'Great design makes it meaningful.'],
  body: 'We connect brand thinking, visual craft and commercial strategy to create work people remember—and businesses can measure.',
};

/* ---------------------------------------------------------- capabilities */

export type CapabilityVisualKind =
  | 'letterforms'
  | 'system'
  | 'cursor'
  | 'contact-sheet'
  | 'signal'
  | 'modules';

export type Capability = {
  index: string;
  title: string;
  body: string;
  visual: CapabilityVisualKind;
};

export const capabilities = {
  label: '/ What we do',
  heading: 'One creative system. Every point of contact.',
  items: [
    {
      index: '01',
      title: 'Brand Strategy',
      body: 'Positioning, research, naming and the strategic foundations that make every creative decision clearer.',
      visual: 'letterforms',
    },
    {
      index: '02',
      title: 'Identity Systems',
      body: 'Visual identities built to remain distinctive across campaigns, products and platforms.',
      visual: 'system',
    },
    {
      index: '03',
      title: 'Web & Digital',
      body: 'High-performance websites and digital experiences designed around real audience behaviour.',
      visual: 'cursor',
    },
    {
      index: '04',
      title: 'Campaigns',
      body: 'Creative concepts and launch systems that turn cultural relevance into sustained attention.',
      visual: 'contact-sheet',
    },
    {
      index: '05',
      title: 'Performance Marketing',
      body: 'Paid media, experimentation and conversion strategy informed by creative intelligence.',
      visual: 'signal',
    },
    {
      index: '06',
      title: 'Content Systems',
      body: 'Repeatable visual and editorial systems that help brands publish without becoming predictable.',
      visual: 'modules',
    },
  ] as Capability[],
};

/* ------------------------------------------------------------------ work */

export type Project = {
  id: string;
  client: string;
  summary: string;
  services: string[];
  result: string;
  year: string;
  /** Key into the art-direction manifest in `src/config/media.ts`. */
  media: MediaKey;
  /** Composition weight — alternates the layout down the page. */
  layout: 'monument' | 'offset-right' | 'offset-left' | 'panorama';
};

export const work = {
  label: '/ Selected work',
  heading: ['Ideas made visible.', 'Results made measurable.'],
  items: [
    {
      id: 'northline',
      client: 'Northline',
      summary: 'Repositioning a fintech platform for its next stage of growth',
      services: ['Strategy', 'Identity', 'Digital'],
      result: '42% increase in qualified demo enquiries',
      year: '2025',
      media: 'identity',
      layout: 'monument',
    },
    {
      id: 'soma',
      client: 'Soma',
      summary: 'Turning a wellness product into a culturally relevant daily ritual',
      services: ['Campaign', 'Art Direction', 'Content'],
      result: '3.1× campaign return on ad spend',
      year: '2025',
      media: 'culture',
      layout: 'offset-right',
    },
    {
      id: 'fieldnote',
      client: 'Fieldnote',
      summary: 'A digital flagship for an independent fashion label',
      services: ['E-commerce', 'UX', 'Development'],
      result: '28% higher conversion rate',
      year: '2024',
      media: 'digital',
      layout: 'offset-left',
    },
    {
      id: 'common-ground',
      client: 'Common Ground',
      summary: 'Building a launch system for a modern hospitality group',
      services: ['Brand', 'Web', 'Campaign'],
      result: 'Three locations launched through one flexible system',
      year: '2024',
      media: 'terrain',
      layout: 'panorama',
    },
  ] as Project[],
};

/* --------------------------------------------------------------- process */

export const process = {
  label: '/ How we work',
  heading: 'Clear thinking before decoration.',
  steps: [
    {
      index: '01',
      title: 'Discover',
      body: 'We uncover the audience tension, commercial goal and cultural opportunity.',
    },
    {
      index: '02',
      title: 'Define',
      body: 'We turn research into a focused position, creative idea and measurable brief.',
    },
    {
      index: '03',
      title: 'Design',
      body: 'We build the identity, experience and campaign as one connected system.',
    },
    {
      index: '04',
      title: 'Deliver',
      body: 'We launch, learn and keep improving the work using real performance signals.',
    },
  ],
};

/* ----------------------------------------------------------------- proof */

export const proof = [
  { value: '24', label: 'launches' },
  { value: '11', label: 'industries' },
  { value: '8', label: 'countries' },
  { value: '92%', label: 'referral-led' },
  { value: 'Strategy', label: 'through execution' },
];

/* ----------------------------------------------------------- testimonial */

export const testimonial = {
  quote:
    'Human Made Logic gave us more than a new identity. They gave the entire company a clearer way to speak, design and make decisions.',
  name: 'Maya Rao',
  role: 'Co-founder, Northline',
};

/* ------------------------------------------------------------- final cta */

export const finalCta = {
  heading: 'Have something worth noticing?',
  body: 'Tell us what you are building, changing or trying to make impossible to ignore.',
  cta: { label: 'Start a project', href: `mailto:${agency.email}` },
};
