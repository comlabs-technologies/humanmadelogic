/**
 * Image manifest.
 * ---------------
 * Every image used by the template is bundled locally under `/public/images`
 * and described here. Swap the `src` values for your own photography or
 * illustration and keep the `alt` text descriptive.
 *
 * Replacing an image:
 *   1. Drop your file into `public/images/`.
 *   2. Point the `src` below at `/images/<your-file>`.
 *   3. Update `alt` (leave it as an empty string for purely decorative art).
 */

export type ImageAsset = {
  src: string;
  alt: string;
  /** CSS object-position, useful when swapping in a photograph. */
  position?: string;
};

export type ImageManifest = {
  hero: ImageAsset;
  featureBand: ImageAsset;
  intelligenceScene: ImageAsset;
  useCases: ImageAsset;
  resourceFeature: ImageAsset;
  articleWorkflow: ImageAsset;
  articleContext: ImageAsset;
  articleReview: ImageAsset;
  contact: ImageAsset;
  ogFallback: ImageAsset;
};

export const images: ImageManifest = {
  hero: {
    src: '/images/editorial-hero.svg',
    alt: 'Abstract editorial composition of layered daylight across a quiet interior',
    position: 'center 40%',
  },
  featureBand: {
    src: '/images/editorial-moss.svg',
    alt: '',
    position: 'center',
  },
  intelligenceScene: {
    src: '/images/editorial-sand.svg',
    alt: '',
    position: 'center',
  },
  useCases: {
    src: '/images/editorial-rails.svg',
    alt: '',
    position: 'center',
  },
  resourceFeature: {
    src: '/images/editorial-hero.svg',
    alt: 'Abstract editorial composition of layered daylight',
    position: 'center 45%',
  },
  articleWorkflow: {
    src: '/images/editorial-sand.svg',
    alt: 'Abstract warm composition of overlapping planes',
  },
  articleContext: {
    src: '/images/editorial-rails.svg',
    alt: 'Abstract composition of vertical rails and soft light',
  },
  articleReview: {
    src: '/images/editorial-moss.svg',
    alt: 'Abstract deep green composition of layered planes',
  },
  contact: {
    src: '/images/editorial-rails.svg',
    alt: '',
    position: 'center',
  },
  /**
   * Open Graph fallback. Generated at build time by
   * `src/app/opengraph-image.tsx`; point this at a static file instead if
   * you would rather ship your own artwork.
   */
  ogFallback: {
    src: '/opengraph-image',
    alt: 'Relay — a focused workspace for teams in motion',
  },
};
