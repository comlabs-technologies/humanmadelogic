# Relay — Editorial AI SaaS Template for Next.js

A configurable, editorial landing-page system for AI workspaces, productivity
software, internal platforms, developer tools and modern B2B products.

Relay is the fictional demo brand shipped with the template. Every headline,
link, price, capability card and image path lives in a small configuration
layer, so you can rebrand the whole site without touching a component.

---

## What's inside

| Route | Description |
| --- | --- |
| `/` | Homepage: hero with command-centre product proof, trust strip, four-capability tab suite, dark editorial feature band, use-case grid, testimonials, CTA |
| `/pricing` | Three tiers, one recommended, plus a grouped comparison table and FAQ |
| `/resources` | Resource index with a featured article, category sections and a help-centre grid |
| `/resources/[slug]` | Full article route, statically generated from the content layer |
| `/contact` | Accessible contact form with client-side validation states (no backend) |
| `/privacy` | Placeholder privacy policy with an in-page contents rail |
| `/terms` | Placeholder terms, including template licence notes |
| `404` | Custom not-found page |

Also included: complete per-route metadata, `robots.txt`, `sitemap.xml`, an SVG
favicon, and an Open Graph fallback image generated at build time.

## Stack

- **Next.js 14** (App Router, TypeScript, static export-friendly)
- **Google Sans** (display) self-hosted from `public/fonts`, **Inter** and **Instrument Serif** through `next/font` — no runtime request to a font CDN
- **Tailwind CSS 3** with a small token layer
- **lucide-react** for icons
- No CMS, no database, no environment variables

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint (next/core-web-vitals)
```

Requires Node 18.17 or newer.

### Environment variables

None. The template ships without an `.env.example` because nothing in it reads
from the environment. If you connect the contact form or an analytics provider,
add your own `.env.local` and document it here.

## Customisation

Everything a buyer normally edits lives in three files.

### `src/config/site.ts`

Brand identity and structure:

- `siteConfig.name`, `tagline`, `description` — used across metadata and the footer
- `siteConfig.url` — **set this to your production URL**; metadata, canonicals, `robots.ts` and `sitemap.ts` all derive from it
- `siteConfig.nav` — primary navigation
- `siteConfig.primaryCta` / `secondaryCta` — button labels and destinations
- `siteConfig.announcementBar` — set to `null` to remove the top bar
- `siteConfig.contactEmail`, `contactPhone`, `addressLines`, `legalName`
- `footerColumns` — the four footer columns

### `src/config/content.ts`

All page copy, typed and grouped by section:

- `hero` — eyebrow, headline, body, both CTAs, the command-centre panel rows and the two evidence cards
- `trustStrip` — label and the typography-only customer marks
- `capabilitySuite` — the four capabilities (tab label, title, body, bullet points, scene)
- `featureBand` — the dark editorial band and its floating interface panel
- `useCases` — the "Built for teams with a product to explain" grid
- `testimonials`, `ctaBand`
- `pricing` — tiers, comparison groups and FAQ
- `articles` — the resource articles; add an entry and its route is generated automatically
- `contactPage`, `privacyPage`, `termsPage`, `notFoundPage`

### `src/config/images.ts`

The image manifest. Each entry has a `src`, `alt` and optional `position`.

## Replacing images

All artwork ships locally in `public/images/` as original abstract SVG
compositions — nothing is fetched from a third-party host and nothing is
licensed from a stock library.

To use your own photography:

1. Put the file in `public/images/` (JPG, PNG, WebP and SVG all work).
2. Update the matching entry in `src/config/images.ts`:

   ```ts
   hero: {
     src: '/images/my-photograph.jpg',
     alt: 'Describe what the image shows',
     position: 'center 40%', // optional CSS object-position
   },
   ```

3. Leave `alt` as an empty string for purely decorative artwork — the component
   then marks the image `aria-hidden`.

Images render through `src/components/ui/EditorialImage.tsx`, a thin `<img>`
wrapper. Swap it for `next/image` if you move to remotely hosted assets, and
add the host to `next.config.js` under `images.remotePatterns`.

### Favicon and Open Graph

- **Favicon** — `src/app/icon.svg`. Replace the file; Next.js emits the tags.
- **Open Graph** — `src/app/opengraph-image.tsx` renders a 1200×630 PNG at
  build time. Edit the JSX, or delete the file and drop a static
  `opengraph-image.png` into `src/app/` instead.

## Design tokens

`tailwind.config.ts` holds the palette, type scale, spacing and radii:

- `canvas` warm paper, `ink` charcoal, `line` / `hairline` borders
- `moss` for the dark editorial band, `signal` and `amber` for status states
- Radii: `rounded-scene` (16px) for elevated product scenes,
  `rounded-panel` (14px) for nested cards, `rounded-control` (9px) for controls

### Typography

The template uses a two-tier system: a display face for headings, wordmarks and
figures, and Inter for body copy, UI labels and the product scenes.

| Role | Face | Loaded from |
| --- | --- | --- |
| Display (`h1`–`h6`, `font-display`) | Google Sans | `@font-face` in `globals.css`, file in `public/fonts/` |
| Body (default, `font-sans`) | Inter | `next/font/google` in `layout.tsx` → `--font-sans` |
| Accent (`font-serif`, pull quotes) | Instrument Serif | `next/font/google` in `layout.tsx` → `--font-serif` |

> **Replace the display face before you ship.** `google-sans-latin-wght-normal.woff2`
> is Google's proprietary typeface. It is not offered on Google Fonts and is not
> licensed for redistribution or third-party use, so it is included here only to
> show the intended composition. Swap it for a face you hold a licence to — the
> template is built so this is a two-file change:
>
> 1. Drop your `.woff2` into `public/fonts/` and update the `@font-face` block at
>    the top of `src/app/globals.css` (or load the face with `next/font`).
> 2. Update the `display` entry in `tailwind.config.ts` and the `h1–h6` rule in
>    `globals.css` to name it.
>
> Open faces that sit close to this composition include Figtree and Plus Jakarta
> Sans; both carry the SIL Open Font License.

A few base styles live in `src/app/globals.css`: the focus ring, the skip link,
the hero rail system and the footer watermark.

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Shell: announcement bar, nav, footer, metadata
│   ├── page.tsx                # Homepage composition
│   ├── globals.css             # Base styles and tokens
│   ├── icon.svg                # Favicon
│   ├── opengraph-image.tsx     # OG fallback, generated at build
│   ├── robots.ts / sitemap.ts  # Generated from siteConfig
│   ├── not-found.tsx
│   ├── pricing/  contact/  privacy/  terms/
│   └── resources/
│       ├── page.tsx            # Index
│       └── [slug]/page.tsx     # Article route
├── components/
│   ├── ui/                     # Button, EditorialImage, Panel primitives, Section
│   ├── scenes/                 # The four capability product scenes
│   ├── Hero.tsx  Navbar.tsx  Footer.tsx  ...
│   └── ContactForm.tsx
├── config/                     # site.ts, content.ts, images.ts
└── lib/seo.ts                  # buildMetadata helper
```

### Product scenes

The four capability scenes in `src/components/scenes/CapabilityScenes.tsx` are
built from shared primitives in `src/components/ui/Panel.tsx` (`Panel`,
`PanelHead`, `StatusPill`, `Avatar`, `FieldLabel`, `PanelFootnote`). Reuse them
when you build a fifth scene and the borders, spacing, status colours and text
hierarchy will match the rest of the site automatically.

## Accessibility

- Skip link to `#main` on every page
- The capability tabs implement the ARIA tabs pattern with roving tabindex and
  arrow / Home / End key support
- Visible focus rings on all interactive elements
- Form fields use real labels, `aria-invalid` and `aria-describedby` error text
- `prefers-reduced-motion` disables transitions and smooth scrolling
- The only motion in the template is a 180ms fade when switching capability tabs

## Deployment

### Vercel

Push the repository and import it. Nothing to configure — no environment
variables, no build overrides. Set the project root to this directory if the
repository contains other packages.

### Any Node host

```bash
npm run build
npm run start   # serves on $PORT, default 3000
```

### Static hosting

The site has no server-side data. Add `output: 'export'` to `next.config.js` and
run `npm run build` to emit a fully static `out/` directory.

**Before you deploy:** set `siteConfig.url` to your real domain, or canonical
URLs, `robots.txt` and `sitemap.xml` will point at the demo address.

## Licence and demo content

Relay, Northline, Paloma, Astrid, Truss and Fieldwork are fictional names used
for demonstration. The privacy policy and terms are placeholders — replace them
with documents reviewed by your own counsel before launch.
