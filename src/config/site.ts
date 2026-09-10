/**
 * Relay — Editorial AI SaaS Template
 * ----------------------------------
 * Global site identity, navigation and metadata.
 * Edit this file first when you rebrand the template.
 */

export type NavItem = {
  label: string;
  href: string;
  /** Optional short description used by the mobile menu. */
  hint?: string;
};

export type CallToAction = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type SiteConfig = {
  /** Demo brand name. Replace with your own. */
  name: string;
  /** Product line used in metadata titles, e.g. "Relay — …". */
  titleSuffix: string;
  tagline: string;
  description: string;
  /** Absolute production URL. Used by metadata, sitemap and robots. */
  url: string;
  locale: string;
  /** Shown in the announcement bar. Set to `null` to hide the bar. */
  announcementBar: { label: string; href: string } | null;
  nav: NavItem[];
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
  social: SocialLink[];
  contactEmail: string;
  contactPhone: string;
  addressLines: string[];
  legalName: string;
  /** Used by the “built by” line in the footer. */
  builtByLabel: string;
};

export const siteConfig: SiteConfig = {
  name: 'Relay',
  titleSuffix: 'Relay',
  tagline: 'A focused workspace for teams in motion.',
  description:
    'Relay brings projects, knowledge, workflows, and AI assistance into one focused workspace, so teams can move from discussion to action without losing the thread.',
  url: 'https://relay-template.vercel.app',
  locale: 'en',
  announcementBar: {
    label: 'Relay 2.4 adds review points to every automation',
    href: '/resources/review-points-in-automated-work',
  },
  nav: [
    { label: 'Product', href: '/#capabilities', hint: 'The four Relay capabilities' },
    { label: 'Use cases', href: '/#use-cases', hint: 'Who this template is built for' },
    { label: 'Resources', href: '/resources', hint: 'Guides, stories and changelog' },
    { label: 'Pricing', href: '/pricing', hint: 'Three tiers and a comparison' },
    { label: 'Contact', href: '/contact', hint: 'Talk to the team' },
  ],
  primaryCta: { label: 'Get Relay', href: '/pricing' },
  secondaryCta: { label: 'Contact', href: '/contact' },
  social: [
    { label: 'Changelog', href: '/resources#changelog' },
    { label: 'Guides', href: '/resources#guides' },
    { label: 'Contact', href: '/contact' },
  ],
  contactEmail: 'hello@relay.example',
  contactPhone: '+1 (555) 014 2280',
  addressLines: ['Relay Software', 'Studio 4, 118 Wharf Lane', 'Portland, OR 97209'],
  legalName: 'Relay Software, Inc.',
  builtByLabel: 'Relay is a demo brand used to showcase this template.',
};

/**
 * Footer navigation. Point these at your own routes when you rebrand —
 * every href below resolves to a page that ships with the template.
 */
export const footerColumns: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Workspace', href: '/#workspace' },
      { label: 'Context', href: '/#context' },
      { label: 'Automations', href: '/#automations' },
      { label: 'Intelligence', href: '/#intelligence' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Changelog', href: '/resources#changelog' },
      { label: 'Guides', href: '/resources#guides' },
      { label: 'Customer stories', href: '/resources#stories' },
      { label: 'Help centre', href: '/resources#help' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/#use-cases' },
      { label: 'Careers', href: '/contact' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Security', href: '/privacy#security' },
    ],
  },
];
