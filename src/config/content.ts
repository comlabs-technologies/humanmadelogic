/**
 * Content layer.
 * --------------
 * Every headline, paragraph, list item, tier and article on the site is
 * defined here. You should be able to rewrite the whole product story
 * without opening a single component file.
 */

import type { CallToAction } from './site';

/* ------------------------------------------------------------------ hero */

export type HeroContent = {
  eyebrow: string;
  heading: string;
  body: string;
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
  /** The command-centre panel that crosses the hero image edge. */
  commandPanel: {
    title: string;
    subtitle: string;
    rows: { label: string; owner: string; status: string; tone: StatusTone }[];
    footnote: string;
  };
  /** Two small evidence cards attached to the command panel. */
  evidenceCards: { label: string; value: string; detail: string }[];
};

export type StatusTone = 'neutral' | 'active' | 'review' | 'done';

export const hero: HeroContent = {
  eyebrow: 'The operating system for work that moves fast',
  heading: 'Clear context for every decision.',
  body: 'Relay brings projects, knowledge, workflows, and AI assistance into one focused workspace—so teams can move from discussion to action without losing the thread.',
  primaryCta: { label: 'Explore Relay', href: '/#capabilities' },
  secondaryCta: { label: 'See the workflow', href: '/#automations' },
  commandPanel: {
    title: 'This week',
    subtitle: 'Northline migration',
    rows: [
      { label: 'Pricing model sign-off', owner: 'A. Cole', status: 'In review', tone: 'review' },
      { label: 'Data retention note', owner: 'J. Park', status: 'Decided', tone: 'done' },
      { label: 'Rollout sequence', owner: 'P. Shah', status: 'In progress', tone: 'active' },
    ],
    footnote: 'Every row carries its decision, its owner and its source.',
  },
  evidenceCards: [
    { label: 'Decision saved', value: 'Tiered pricing', detail: 'Linked to 4 threads' },
    { label: 'Next action', value: 'Draft rollout brief', detail: 'Assigned to P. Shah' },
  ],
};

/* ----------------------------------------------------------- trust strip */

export type TrustStrip = {
  label: string;
  /** Typography-only marks. These are fictional demo customers. */
  marks: string[];
};

export const trustStrip: TrustStrip = {
  label: 'Built for teams turning complex work into momentum.',
  marks: ['Northline', 'Paloma', 'Astrid', 'Truss', 'Fieldwork'],
};

/* ----------------------------------------------------------- capability */

export type CapabilityScene =
  | 'workspace'
  | 'context'
  | 'automations'
  | 'intelligence';

export type Capability = {
  id: CapabilityScene;
  tabLabel: string;
  title: string;
  body: string;
  points: string[];
  scene: CapabilityScene;
};

export const capabilitySuite = {
  eyebrow: 'Capability suite',
  heading: 'Four capabilities, one thread of context.',
  body: 'Each capability is a section you can rename, reorder or remove. The product scenes are built from the same interface primitives, so they stay consistent as you edit them.',
  capabilities: [
    {
      id: 'workspace',
      tabLabel: 'Workspace',
      title: 'Projects, owners, decisions, and progress in one operational view.',
      body: 'Relay replaces the weekly status scramble with a single view that already knows who owns what, what was decided, and what is waiting.',
      points: [
        'Owners and review states on every line of work',
        'Decisions recorded where the work happens',
        'Progress that reads the same to everyone',
      ],
      scene: 'workspace',
    },
    {
      id: 'context',
      tabLabel: 'Context',
      title: 'Search the work, not just files. Bring the right history into the moment.',
      body: 'Ask a question in the language your team uses. Relay returns the decision, the thread it came from, and the document it changed.',
      points: [
        'Results grouped by decision, thread and document',
        'Every answer keeps a link back to its source',
        'Pull history straight into the work in front of you',
      ],
      scene: 'context',
    },
    {
      id: 'automations',
      tabLabel: 'Automations',
      title: 'Trigger trusted workflows with review points where people need control.',
      body: 'Automations run the repetitive part and stop at the step that needs judgement. Nothing leaves the workspace without someone approving it.',
      points: [
        'Named review points inside every run',
        'A full record of what ran, and who approved it',
        'Safe defaults that stop rather than guess',
      ],
      scene: 'automations',
    },
    {
      id: 'intelligence',
      tabLabel: 'Intelligence',
      title: 'Turn meetings, notes, and activity into a next step that is ready to use.',
      body: 'Relay reads the material your team already produced and proposes the next action with an owner, a date, and the sources it drew from.',
      points: [
        'Next steps with an owner and a due date attached',
        'Sources listed beside every suggestion',
        'Save straight into the workspace, or discard',
      ],
      scene: 'intelligence',
    },
  ] as Capability[],
};

/* ------------------------------------------------------- feature band */

export type FeatureBand = {
  eyebrow: string;
  heading: string;
  body: string;
  cta: CallToAction;
  panel: {
    title: string;
    decision: string;
    meta: string;
    owner: string;
    nextStep: string;
  };
};

export const featureBand: FeatureBand = {
  eyebrow: 'A calmer way to move work forward',
  heading: 'Work moves faster when context stays close.',
  body: 'Relay keeps the decision, the source material, the owner, and the next action together—without asking your team to rebuild its habits around another tool.',
  cta: { label: 'Read the product note', href: '/resources/context-that-stays-close' },
  panel: {
    title: 'Saved decision',
    decision: 'Ship tiered pricing in the March release',
    meta: 'Recorded 12 March · 4 linked sources',
    owner: 'Amina Cole · Product',
    nextStep: 'Draft the rollout brief',
  },
};

/* ---------------------------------------------------------- use cases */

export type UseCase = {
  title: string;
  body: string;
  examples: string[];
};

export const useCases = {
  id: 'use-cases',
  eyebrow: 'Template flexibility',
  heading: 'Built for teams with a product to explain',
  body: 'Relay ships as a demo brand, but the layout system underneath is deliberately general. The same sections carry very different products with nothing more than a content edit.',
  items: [
    {
      title: 'AI SaaS',
      body: 'Show the reasoning, the sources and the human review step instead of another chat bubble.',
      examples: ['Assistants', 'Copilots', 'Research tools'],
    },
    {
      title: 'Workflow products',
      body: 'Explain a multi-step process where the interesting part is the state, not the graph.',
      examples: ['Approvals', 'Operations', 'Compliance'],
    },
    {
      title: 'Internal tools',
      body: 'Give a platform team a landing page that reads as carefully as the product they built.',
      examples: ['Developer portals', 'Admin consoles', 'Data platforms'],
    },
    {
      title: 'B2B platforms',
      body: 'Carry a longer story—pricing, proof, resources—without the page turning into a brochure.',
      examples: ['Vertical SaaS', 'Marketplaces', 'Infrastructure'],
    },
  ] as UseCase[],
};

/* -------------------------------------------------------- testimonials */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials = {
  eyebrow: 'Field notes',
  heading: 'What changes when the thread holds.',
  items: [
    {
      quote:
        'We stopped re-deciding things. The decision, the reasoning and the owner sit on the same line, so nobody reopens a settled question three weeks later.',
      name: 'Amina Cole',
      role: 'Director of Operations',
      company: 'Northline',
    },
    {
      quote:
        'The review points are the whole reason this passed our risk team. The automation does the boring part and then waits for a person.',
      name: 'Joel Park',
      role: 'Head of Platform',
      company: 'Truss',
    },
    {
      quote:
        'Onboarding used to mean reading six months of threads. Now a new engineer asks a question and gets the decision plus the thread it came from.',
      name: 'Priya Shah',
      role: 'Engineering Manager',
      company: 'Fieldwork',
    },
  ] as Testimonial[],
};

/* ------------------------------------------------------------ cta band */

export const ctaBand = {
  heading: 'Give your team one place where the thread holds.',
  body: 'Start with the demo content, replace it with your own, and ship a landing page that reads like the product it sells.',
  primaryCta: { label: 'Get Relay', href: '/pricing' },
  secondaryCta: { label: 'Talk to us', href: '/contact' },
};

/* ------------------------------------------------------------- pricing */

export type PricingTier = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  summary: string;
  features: string[];
  cta: CallToAction;
  recommended: boolean;
};

export type ComparisonRow = {
  label: string;
  values: [string, string, string];
};

export const pricing = {
  eyebrow: 'Pricing',
  heading: 'Three tiers, one clear upgrade path.',
  body: 'Prices below are demo values. Swap the tiers, features and comparison rows in `src/config/content.ts` to match your own plans.',
  note: 'All prices per workspace, billed monthly. Annual billing saves two months.',
  tiers: [
    {
      id: 'starter',
      name: 'Starter',
      price: '$29',
      cadence: 'per month',
      summary: 'For a small team keeping one product thread tidy.',
      features: [
        'Up to 5 members',
        '3 active projects',
        'Context search across the workspace',
        'Saved decisions with source links',
        'Community support',
      ],
      cta: { label: 'Start with Starter', href: '/contact' },
      recommended: false,
    },
    {
      id: 'team',
      name: 'Team',
      price: '$79',
      cadence: 'per month',
      summary: 'For teams running several workstreams at once.',
      features: [
        'Up to 25 members',
        'Unlimited projects',
        'Automations with review points',
        'Intelligence next-step suggestions',
        'Priority email support',
      ],
      cta: { label: 'Choose Team', href: '/contact' },
      recommended: true,
    },
    {
      id: 'studio',
      name: 'Studio',
      price: '$149',
      cadence: 'per month',
      summary: 'For organisations with review, audit and access requirements.',
      features: [
        'Unlimited members',
        'Approval policies and audit history',
        'SSO and role-based access',
        'Custom retention windows',
        'Named support contact',
      ],
      cta: { label: 'Choose Studio', href: '/contact' },
      recommended: false,
    },
  ] as PricingTier[],
  comparison: {
    heading: 'Compare the tiers',
    columns: ['Starter', 'Team', 'Studio'] as [string, string, string],
    groups: [
      {
        title: 'Workspace',
        rows: [
          { label: 'Members', values: ['5', '25', 'Unlimited'] },
          { label: 'Active projects', values: ['3', 'Unlimited', 'Unlimited'] },
          { label: 'Saved decisions', values: ['Included', 'Included', 'Included'] },
        ] as ComparisonRow[],
      },
      {
        title: 'Context & intelligence',
        rows: [
          { label: 'Context search', values: ['Workspace', 'Workspace + threads', 'Workspace + threads'] },
          { label: 'Next-step suggestions', values: ['—', 'Included', 'Included'] },
          { label: 'History window', values: ['90 days', '2 years', 'Custom'] },
        ] as ComparisonRow[],
      },
      {
        title: 'Automations & control',
        rows: [
          { label: 'Automation runs', values: ['—', '2,000 / month', 'Unlimited'] },
          { label: 'Review points', values: ['—', 'Included', 'Included'] },
          { label: 'Approval policies', values: ['—', '—', 'Included'] },
          { label: 'SSO & roles', values: ['—', 'Roles', 'SSO + roles'] },
        ] as ComparisonRow[],
      },
      {
        title: 'Support',
        rows: [
          { label: 'Support channel', values: ['Community', 'Priority email', 'Named contact'] },
          { label: 'Response target', values: ['Best effort', '1 business day', '4 hours'] },
        ] as ComparisonRow[],
      },
    ],
  },
  faqs: [
    {
      question: 'Can we change tiers later?',
      answer:
        'Yes. Tiers are pro-rated in the demo copy, and the pricing table is a plain data structure you can rewrite for your own billing rules.',
    },
    {
      question: 'Is there a trial?',
      answer:
        'The demo content describes a 14-day trial on Team. Update the copy in `src/config/content.ts` if your product works differently.',
    },
    {
      question: 'What does the template include?',
      answer:
        'Every route you can see: homepage, pricing, resources index, an article route, contact, privacy, terms and a 404 page—plus metadata, sitemap and robots.',
    },
  ],
};

/* ----------------------------------------------------------- resources */

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string; attribution: string };

export type Article = {
  slug: string;
  category: 'Guides' | 'Customer stories' | 'Changelog' | 'Help centre';
  title: string;
  excerpt: string;
  readingTime: string;
  date: string;
  displayDate: string;
  author: { name: string; role: string };
  imageKey: 'articleWorkflow' | 'articleContext' | 'articleReview';
  body: ArticleBlock[];
};

export const resourcesPage = {
  eyebrow: 'Resources',
  heading: 'Writing that explains the product.',
  body: 'A resources index, a category rail and a full article route—wired to the same content layer as the rest of the template.',
  sections: [
    { id: 'guides', title: 'Guides', description: 'How teams set Relay up and keep it tidy.' },
    { id: 'stories', title: 'Customer stories', description: 'What changed after the thread held.' },
    { id: 'changelog', title: 'Changelog', description: 'What shipped, and why it shipped.' },
    {
      id: 'help',
      title: 'Help centre',
      description: 'Short answers to the questions support hears most.',
    },
  ],
  helpTopics: [
    {
      question: 'How do I invite the rest of my team?',
      answer:
        'Open the workspace switcher, choose Members, and send invitations by email. Roles can be changed after someone joins.',
    },
    {
      question: 'Where do saved decisions live?',
      answer:
        'On the project they belong to, with a permanent link back to the thread and document they came from.',
    },
    {
      question: 'Can I pause an automation mid-run?',
      answer:
        'Yes. Any run stops at its next review point, and the record shows exactly where it paused.',
    },
    {
      question: 'How do I export our history?',
      answer:
        'Workspace settings include a full export of projects, decisions and automation runs as JSON.',
    },
  ],
};

export const articles: Article[] = [
  {
    slug: 'context-that-stays-close',
    category: 'Guides',
    title: 'Context that stays close to the work',
    excerpt:
      'Most teams do not lose information. They lose the connection between a decision and the reason it was made. Here is how we design around that.',
    readingTime: '7 min read',
    date: '2026-03-12',
    displayDate: '12 March 2026',
    author: { name: 'Amina Cole', role: 'Product, Relay' },
    imageKey: 'articleContext',
    body: [
      {
        type: 'paragraph',
        text: 'A team rarely forgets what it decided. It forgets why. Six weeks after a call, the decision is still in the document, but the thread that produced it has scrolled away, the person who argued the other side has moved teams, and the constraint that made the decision obvious is no longer written down anywhere. So the question gets reopened, and the same forty minutes get spent again.',
      },
      {
        type: 'paragraph',
        text: 'We built Relay around a narrow claim: the cost of losing context is not the search time. It is the re-litigation. Every tool that promises to help usually adds one more place where the reasoning can be separated from the outcome.',
      },
      { type: 'heading', text: 'Keep four things on one line' },
      {
        type: 'paragraph',
        text: 'A decision is only useful when it travels with the material around it. In practice that means four things need to sit together and stay together:',
      },
      {
        type: 'list',
        items: [
          'The decision itself, written in one sentence a newcomer can read.',
          'The source material it came from—threads, documents, a meeting recap.',
          'The owner, so the next question has an address.',
          'The next action, with a date, so the decision produces movement.',
        ],
      },
      {
        type: 'paragraph',
        text: 'None of this is novel on its own. What is unusual is refusing to let them drift apart. When you open a project in Relay, you cannot see a status without seeing who owns it, and you cannot open a decision without seeing what it was based on.',
      },
      { type: 'heading', text: 'Search the work, not the filenames' },
      {
        type: 'paragraph',
        text: 'Filename search assumes you remember where something lives. That assumption breaks the moment a team grows past the group that made the original choice. Relay indexes decisions, threads and documents together and returns them grouped by kind, so the answer to “why are we billing per workspace?” is a decision with its reasoning attached, not a folder.',
      },
      {
        type: 'quote',
        text: 'We stopped re-deciding things. The decision, the reasoning and the owner sit on the same line, so nobody reopens a settled question three weeks later.',
        attribution: 'Amina Cole, Director of Operations at Northline',
      },
      { type: 'heading', text: 'Automate the repetition, not the judgement' },
      {
        type: 'paragraph',
        text: 'The temptation with any assistant is to let it finish the job. We deliberately stop short. An automation in Relay runs the mechanical steps—gathering the material, drafting the summary, assembling the checklist—and then halts at a named review point. A person approves, edits, or rejects. The run records which.',
      },
      {
        type: 'paragraph',
        text: 'This is slower on paper. It is faster in practice, because nothing has to be unwound later, and because a team will only delegate work it can audit.',
      },
      { type: 'heading', text: 'What we did not build' },
      {
        type: 'paragraph',
        text: 'We did not build a chat surface that answers without citing. We did not build a dashboard of activity metrics that nobody acts on. And we did not ask teams to change how they write in order to be understood by the system. The habits stay; the thread holds.',
      },
    ],
  },
  {
    slug: 'review-points-in-automated-work',
    category: 'Changelog',
    title: 'Relay 2.4 — review points in every automation',
    excerpt:
      'Automations can now pause at a named review point, hold their state, and record who approved the step that resumed them.',
    readingTime: '4 min read',
    date: '2026-02-27',
    displayDate: '27 February 2026',
    author: { name: 'Joel Park', role: 'Platform, Relay' },
    imageKey: 'articleReview',
    body: [
      {
        type: 'paragraph',
        text: 'Until this release, an automation in Relay either ran to completion or failed. That was fine for gathering material and wrong for anything that leaves the workspace. Relay 2.4 introduces review points: a step that holds the run, notifies a named reviewer, and waits.',
      },
      { type: 'heading', text: 'What shipped' },
      {
        type: 'list',
        items: [
          'Review points can be added to any step in a workflow and assigned to a person or a role.',
          'A paused run keeps its full state, including every draft it produced, for 30 days.',
          'The run record shows who approved, who edited, and what changed between the draft and the approved output.',
          'Declining a step now returns a reason field that is stored with the run.',
        ],
      },
      { type: 'heading', text: 'Why it works this way' },
      {
        type: 'paragraph',
        text: 'We considered a simpler design where a reviewer receives a notification and the run continues optimistically. It tested badly. People treated the notification as noise, and the audit trail could not answer the only question anyone asked afterwards: did a human look at this before it went out?',
      },
      {
        type: 'paragraph',
        text: 'Holding the run is more disruptive and much easier to defend. A stopped automation is visible; an unreviewed one is not.',
      },
      { type: 'heading', text: 'Upgrading' },
      {
        type: 'paragraph',
        text: 'Existing automations keep running unchanged. Adding a review point to a live workflow takes effect on the next run, and any run currently in flight finishes under the previous configuration.',
      },
    ],
  },
  {
    slug: 'northline-cut-status-meetings',
    category: 'Customer stories',
    title: 'How Northline cut its status meetings in half',
    excerpt:
      'A forty-person operations team replaced two weekly syncs with one shared view—and stopped rebuilding the same context every Monday.',
    readingTime: '5 min read',
    date: '2026-01-19',
    displayDate: '19 January 2026',
    author: { name: 'Priya Shah', role: 'Customer engineering, Relay' },
    imageKey: 'articleWorkflow',
    body: [
      {
        type: 'paragraph',
        text: 'Northline runs field operations across eleven regions. Before Relay, every regional lead prepared a written update, and two ninety-minute syncs each week existed largely to reconcile those updates with each other.',
      },
      { type: 'heading', text: 'The problem was not the meeting' },
      {
        type: 'paragraph',
        text: 'The meetings were a symptom. Each lead maintained their own record of what had been decided, and those records disagreed in small ways that only surfaced when two regions collided on a shared deadline.',
      },
      {
        type: 'list',
        items: [
          'Eleven separate status documents, each with its own vocabulary for “done”.',
          'Decisions recorded in whichever tool the conversation happened to occur in.',
          'No shared answer to “who owns this now?” after a handover.',
        ],
      },
      { type: 'heading', text: 'What changed' },
      {
        type: 'paragraph',
        text: 'Northline moved every regional workstream into one Relay workspace with a shared status vocabulary—four states, no more—and required that decisions be recorded on the project rather than in a thread. Automations assembled the weekly rollup and paused for the operations director to approve it.',
      },
      {
        type: 'quote',
        text: 'The rollup is written before the meeting starts. What used to be the meeting is now five minutes of reading, and the meeting is for the two things that are actually contested.',
        attribution: 'Operations director, Northline',
      },
      { type: 'heading', text: 'Where it stands' },
      {
        type: 'paragraph',
        text: 'One sync remains, at half the length. The second was retired after eight weeks. The team reports that the durable change was not the time saved but the disappearance of arguments about what had already been agreed.',
      },
    ],
  },
];

/* ------------------------------------------------------------- contact */

export const contactPage = {
  eyebrow: 'Contact',
  heading: 'Tell us what you are building.',
  body: 'This form is a front-end demonstration with client-side validation only—no backend, no email provider, no third-party dependency. Wire it to your own endpoint when you are ready.',
  successTitle: 'Thanks — your message is ready to send.',
  successBody:
    'This demo form validates and confirms locally. Connect your own handler in `src/components/ContactForm.tsx` to deliver it.',
  topics: ['Buying the template', 'Customisation help', 'Licensing', 'Something else'],
  details: [
    { label: 'Email', value: 'hello@relay.example' },
    { label: 'Support hours', value: 'Monday to Friday, 9am–6pm PT' },
    { label: 'Response target', value: 'One business day' },
  ],
};

/* --------------------------------------------------------- legal pages */

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

export const privacyPage = {
  title: 'Privacy',
  updated: 'Last updated 1 March 2026',
  intro:
    'This is placeholder policy copy supplied with the Relay template. Replace it with a policy reviewed by your own counsel before launch.',
  sections: [
    {
      id: 'collection',
      title: 'What we collect',
      paragraphs: [
        'The demo site collects nothing. No analytics script, cookie banner or tracking pixel ships with this template.',
        'If you add analytics or a form handler, describe here what you collect, why you collect it, and how long you keep it.',
      ],
      list: [
        'Account details you provide directly',
        'Workspace content you choose to store',
        'Operational logs required to run the service',
      ],
    },
    {
      id: 'use',
      title: 'How information is used',
      paragraphs: [
        'Describe the lawful basis for each use, and whether any processing is automated.',
        'Keep this section specific. Vague policies age badly and are difficult to honour.',
      ],
    },
    {
      id: 'sharing',
      title: 'Sharing and processors',
      paragraphs: [
        'List every processor you rely on, the category of data each one receives, and the region it operates in.',
      ],
    },
    {
      id: 'security',
      title: 'Security',
      paragraphs: [
        'Describe your access controls, encryption in transit and at rest, and how you handle disclosure of a security issue.',
        'Give a contact address that a researcher can actually reach, and commit to a response window you can meet.',
      ],
      list: [
        'Role-based access with least privilege',
        'Encryption in transit and at rest',
        'A published disclosure address and response target',
      ],
    },
    {
      id: 'rights',
      title: 'Your rights',
      paragraphs: [
        'Explain how someone requests access to, correction of, or deletion of their data, and how long each request takes.',
      ],
    },
  ] as LegalSection[],
};

export const termsPage = {
  title: 'Terms',
  updated: 'Last updated 1 March 2026',
  intro:
    'These are placeholder terms supplied with the Relay template. They are not legal advice—replace them before you launch.',
  sections: [
    {
      id: 'agreement',
      title: 'The agreement',
      paragraphs: [
        'State who the agreement is between, what is being licensed, and when the terms take effect.',
      ],
    },
    {
      id: 'licence',
      title: 'Template licence',
      paragraphs: [
        'The Relay template is sold for use on projects you build. Describe here whether a licence covers one site or many, and whether resale of the template itself is permitted.',
      ],
      list: [
        'Use on client and personal projects',
        'Modification of any file in the repository',
        'No redistribution of the template as a template',
      ],
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable use',
      paragraphs: [
        'Set out what customers may not do with the service, and how you handle violations.',
      ],
    },
    {
      id: 'payment',
      title: 'Payment and renewal',
      paragraphs: [
        'Describe billing cadence, renewal, refunds and what happens to data after cancellation.',
      ],
    },
    {
      id: 'liability',
      title: 'Warranties and liability',
      paragraphs: [
        'Have counsel review this section. Limitation clauses vary by jurisdiction and are frequently the section that matters.',
      ],
    },
  ] as LegalSection[],
};

export const notFoundPage = {
  code: '404',
  heading: 'This page has moved on.',
  body: 'The link you followed does not resolve. The pages below cover everything the template ships with.',
  links: [
    { label: 'Homepage', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Resources', href: '/resources' },
    { label: 'Contact', href: '/contact' },
  ],
};
