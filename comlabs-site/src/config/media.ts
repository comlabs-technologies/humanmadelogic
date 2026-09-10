/**
 * Human Made Logic — art direction manifest.
 *
 * Photography is treated as raw material for the WebGL layer, not as section
 * illustration. Every entry carries its own crop, focal point and shader
 * treatment, and each one is art-directed separately for desktop and mobile.
 *
 * Tuning a composition should never require touching a component: change the
 * `aspect` / `position` here and the DOM frame, the `next/image` crop and the
 * WebGL plane all follow, because the plane tracks the DOM box.
 */

/* Supplied source assets. */
const ARCHITECTURE_PRIMARY =
  'https://images.openai.com/static-rsc-4/iRNYKtOeCAd7w8SGvB_l0DYXZ58c99r0Py1FHnOzYaQ8OHI4M5JeFZa6AAA_2ik9f22nMxuX5vqzNPcjhTlJ-AaKCsblh3D5nmW5Cw2sRSk-ell5XcfAwsBETQTT0WJmt5J3MDszcaMTbzM4GZ6VKCk0eMKmoYS6oKMQwxmkdt2Iai5nY2TH1bNvTFraj8k6?purpose=fullsize';

const ARCHITECTURE_SECOND =
  'https://images.openai.com/static-rsc-4/9AefW1IFiK6y_DpdSL35yBizrsaUYP4zh3F7_3ToOKY8EAEc68oYYDxJIrnMPf9C0OOxRUtJUqEt4cUB8_6iHeo5Nxk5zAATPljCkWCHOfA-gCka04dypDJaiICPglc-l9lQ7Zp-1EGyRXnz7pZ-pTPSG-de8BJ8X5d9ekph61QlHauAjsDdmuDYqqzU0Q3z?purpose=fullsize';

const ARCHITECTURE_THIRD =
  'https://images.openai.com/static-rsc-4/rNdlU2BkpVvxZQEGDjEaORZ1a1sLFG-bqCgbXYf-0kPWxKu-8i1W1YoW5yCcqrx6nG9c65z9onAfeFN7EauDugsmUMHyeAv-xbJDxr-vbP0K0AI0E0TzSFqV_TdBoGXu5FIfazdsxsxPi8jvx1D5ENU_QoPImwC-V34O5n1sEvztg__O2rwxJ4l6X2xFMIKU?purpose=fullsize';

const DUNES =
  'https://images.openai.com/static-rsc-4/Vf2HAya10f5eAGtEd1rYTDVU56yY6WWYCpmWBO5xP0Ea94PVfurrocDxRzwWbBnI8WoH8m_xZa9zHXFqdJtgTh5DcAmOCdyTgB8Tu7XfNV76LCmQ0xAptltSeJmkDstMv3CGS5zXYrCUERDrzFmP6TtoA094tvYiDbCYadFUuLqsmlvxEfmaW_4gvzf9_jCo?purpose=fullsize';

const VOLCANIC =
  'https://images.openai.com/static-rsc-4/CBoiHfIaLQhY5J4ySzBiHlkHyxbXn4slxgCKybLmH-ARcL0ky0FUXvjkbPYHcLWnkxUy0glA-l_a-6W-snhtSPC65-5WfWPnUzMHcBaULPYd5Tueo5nICcicH1-Qm1COoCpODtUmnA6apWYvy4Ky2e_uCqzi9SckvnKdP0WAFlPmX48HmU5fKJUlU0kPnwlU?purpose=fullsize';

const GLASS =
  'https://images.openai.com/static-rsc-4/QYvYP3ynUG7ax6Tiuiy25OGR5ujSuptDQTk9HaAONb5qw39QE1hqdpfYBuWj2gXWa5hkH6OucdVmMY3LnI6xZFKioCEmUTIK9QBYny33mekIbflJr4fKv2kTSSFuD3DzBl5rDrjtf-_0pL8ARwPvAn9JVu7U6dWEjxeGppm2gKfi9MBkLz9tkA-kkLsmXZ6N?purpose=fullsize';

const OCEAN =
  'https://images.openai.com/static-rsc-4/Ju81xEISB1elUMCPkv86UCxA-ecgX049Gi7e5Mr4HQ0NtUER3LU4mhK5P731Y4skE3mIMZlhOW2WEEkqAtAKa98eOoau4HwiN_50D1W5tdavvfrOfmnxemVB7eGXBTalzmtwSqKWF-xksYSTa7aAlNP_lAPyyM0B2-e-i1obrGkl8LTxaj9dHYB_wL4_KEST?purpose=fullsize';

const HUMAN =
  'https://images.openai.com/static-rsc-4/x8SYJiCiH7FvNqZ5JtZfB8Xz6PmgvHt56v78CZxoYUIyCnNSIUx3AXHhsyJ9uxcUUEKwxCAROISM7t4ysLqxdA3a5VT1Hi84PozsyjC0i7NpOnCGA95GrRTHCmuHp1wjZr9sjJdaTKY7rvmqlJOsYTrdS04k9B0ojb2ERJWiwVFok3h0cP74bYKmXEs8fc1L?purpose=fullsize';

/**
 * Shader behaviour per image. Each mode is a different physical idea, not a
 * different amount of the same wobble.
 *
 * refract   — architecture: very slow, edge-aware refraction + pointer parallax
 * material  — dunes/terrain: low-frequency drift along the flow of the form
 * optical   — glass: the frame is still until the pointer bends it locally
 * current   — ocean: horizontal displacement with a trailing pointer field
 * kinetic   — human: directional stretch driven only by scroll velocity
 */
export type SurfaceMode = 'refract' | 'material' | 'optical' | 'current' | 'kinetic';

export const SURFACE_MODE_IDS: Record<SurfaceMode, number> = {
  refract: 0,
  material: 1,
  optical: 2,
  current: 3,
  kinetic: 4,
};

export type Grade = {
  /** 1 = untouched. Everything here sits slightly below it. */
  saturation: number;
  contrast: number;
  /** Negative deepens the blacks. */
  lift: number;
  /** Warm bias applied in the highlights only. */
  warmth: number;
};

export type Crop = {
  /** CSS aspect-ratio for the frame. */
  aspect: string;
  /** object-position / shader focal point, as `x% y%`. */
  position: string;
};

export type Treatment = {
  mode: SurfaceMode;
  grade: Grade;
  /** Overall displacement amount. Deliberately small everywhere. */
  displacement: number;
  pointerInfluence: number;
  scrollInfluence: number;
  /** Chromatic separation ceiling, in UV units. Kept near invisible. */
  chromatic: number;
  /** Higher settles faster. */
  damping: number;
};

export type MediaAsset = {
  id: string;
  src: string;
  /** Empty string marks the image decorative. */
  alt: string;
  desktop: Crop;
  mobile: Crop;
  treatment: Treatment;
  /** Corner radius in CSS pixels, matched by the shader mask. */
  radius: number;
};

/* Grading presets — one family so eight different photographs read as one
   universe: lowered saturation, deeper blacks, restrained highlights. */
const EDITORIAL: Grade = { saturation: 0.78, contrast: 1.1, lift: -0.035, warmth: 0.02 };
const EDITORIAL_WARM: Grade = { saturation: 0.8, contrast: 1.12, lift: -0.04, warmth: 0.05 };
const EDITORIAL_COOL: Grade = { saturation: 0.86, contrast: 1.14, lift: -0.05, warmth: -0.01 };
const EDITORIAL_DEEP: Grade = { saturation: 0.7, contrast: 1.16, lift: -0.06, warmth: 0.015 };


/* Neutral grade for the hero studies. These are HML's own artwork rather
   than sourced photography, so they are shown as authored. */
const AUTHORED: Grade = { saturation: 1, contrast: 1, lift: 0, warmth: 0 };

/**
 * The hero fan. Five studies, each a distinct discipline, treated with the
 * original cursor-driven refraction rather than the editorial photographic
 * grade used for the sourced imagery.
 */
const heroStudy = (id: string, file: string, alt: string): MediaAsset => ({
  id: `hero-${id}`,
  src: `/images/hml/${file}.png`,
  alt,
  desktop: { aspect: '3 / 4', position: '50% 50%' },
  mobile: { aspect: '3 / 4', position: '50% 50%' },
  radius: 16,
  treatment: {
    mode: 'refract',
    grade: AUTHORED,
    displacement: 1,
    pointerInfluence: 1.35,
    scrollInfluence: 0.6,
    chromatic: 1,
    damping: 7,
  },
});

/*
 * Shared treatment for the three architectural panels: the original V1 hover
 * feel — strong cursor-driven refraction that settles once the pointer leaves.
 */
const PANEL_TREATMENT: Treatment = {
  mode: 'refract',
  grade: EDITORIAL,
  displacement: 1,
  pointerInfluence: 1.35,
  scrollInfluence: 0.55,
  chromatic: 1,
  damping: 7,
};

export const media = {
  /* ---------------------------------------------------------------- hero */

  heroIdentity: heroStudy(
    'identity',
    'hero-identity',
    'Typographic identity study: a black counter-form beside a yellow vertical bar',
  ),
  heroArtDirection: heroStudy(
    'art-direction',
    'hero-artdirection',
    'Art direction study: warm light falling across a dark field',
  ),
  heroProduct: heroStudy(
    'product',
    'hero-product',
    'Product design study: layered interface surfaces on a fine grid',
  ),
  heroCampaign: heroStudy(
    'campaign',
    'hero-campaign',
    'Campaign study: a contact sheet of frames with one selected in yellow',
  ),
  heroCulture: heroStudy(
    'culture',
    'hero-culture',
    'Culture study: soft black forms against a warm yellow field',
  ),

  /* -------------------------------------------------------- architecture */

  /*
   * A stack of three overlapping panels rather than a scattered cluster: one
   * large plate, a second crossing its lower-right corner, and a narrow third
   * sitting behind them at the right. All three carry the original V1 hover
   * treatment — strong cursor-driven refraction that settles when the pointer
   * leaves — so the movement matches the hero fan rather than the subdued
   * treatment used for the full-bleed photographic bands.
   */
  /** The primary panel. */
  monument: {
    id: 'process-monument',
    src: ARCHITECTURE_PRIMARY,
    alt: 'Monumental concrete architecture, cropped so the structure falls away into deep shadow',
    desktop: { aspect: '16 / 10', position: '40% 44%' },
    mobile: { aspect: '4 / 3', position: '44% 44%' },
    radius: 16,
    treatment: PANEL_TREATMENT,
  },

  /** Crosses the lower-right corner of the primary panel. */
  aperture: {
    id: 'process-aperture',
    src: ARCHITECTURE_THIRD,
    alt: '',
    desktop: { aspect: '16 / 11', position: '52% 48%' },
    mobile: { aspect: '4 / 3', position: '52% 46%' },
    radius: 16,
    treatment: PANEL_TREATMENT,
  },

  /** Narrow panel tucked behind the stack, visible at the right edge. */
  pillar: {
    id: 'process-pillar',
    src: ARCHITECTURE_SECOND,
    alt: '',
    desktop: { aspect: '3 / 5', position: '52% 38%' },
    mobile: { aspect: '3 / 4', position: '50% 40%' },
    radius: 16,
    treatment: PANEL_TREATMENT,
  },

  /* ----------------------------------------------------------- statement */

  /**
   * Aerial dunes cropped to a hard panorama until the ridge lines read as
   * folded fabric rather than landscape.
   */
  belief: {
    id: 'belief-dunes',
    src: DUNES,
    alt: 'Aerial dunes cropped until the ridgelines read as folded fabric',
    desktop: { aspect: '32 / 9', position: '50% 52%' },
    mobile: { aspect: '4 / 5', position: '58% 50%' },
    radius: 2,
    treatment: {
      mode: 'material',
      grade: EDITORIAL_WARM,
      displacement: 0.55,
      pointerInfluence: 0.3,
      scrollInfluence: 1.15,
      chromatic: 0,
      damping: 3.2,
    },
  },

  /* ---------------------------------------------------------------- work */

  /** Optical glass — one source refracted into several coherent expressions. */
  identity: {
    id: 'work-identity',
    src: GLASS,
    alt: 'An optical glass form splitting a single light source into several coherent bands',
    desktop: { aspect: '16 / 9', position: '50% 46%' },
    mobile: { aspect: '4 / 3', position: '50% 46%' },
    radius: 2,
    treatment: {
      mode: 'optical',
      grade: EDITORIAL_COOL,
      displacement: 0.85,
      pointerInfluence: 1.35,
      scrollInfluence: 0.25,
      chromatic: 1.1,
      damping: 6.5,
    },
  },

  /** The single human moment on the page. */
  culture: {
    id: 'work-culture',
    src: HUMAN,
    alt: 'A figure in motion against a black field, cropped close',
    desktop: { aspect: '4 / 5', position: '48% 38%' },
    mobile: { aspect: '4 / 5', position: '50% 36%' },
    radius: 2,
    treatment: {
      mode: 'kinetic',
      grade: EDITORIAL,
      displacement: 0.7,
      pointerInfluence: 0.2,
      scrollInfluence: 1.5,
      chromatic: 0.35,
      damping: 4,
    },
  },

  /** Dark water — cropped past recognition into black, cyan and turbulence. */
  digital: {
    id: 'work-digital',
    src: OCEAN,
    alt: 'Dark water cropped to abstraction: black, deep cyan and white turbulence',
    desktop: { aspect: '5 / 4', position: '54% 55%' },
    mobile: { aspect: '4 / 3', position: '54% 55%' },
    radius: 2,
    treatment: {
      mode: 'current',
      grade: EDITORIAL_COOL,
      displacement: 0.75,
      pointerInfluence: 1.15,
      scrollInfluence: 0.7,
      chromatic: 0.9,
      damping: 4.5,
    },
  },

  /** Volcanic terrain for the launch-system project. */
  terrain: {
    id: 'work-terrain',
    src: VOLCANIC,
    alt: 'Volcanic terrain from above, burnt orange against deep shadow',
    desktop: { aspect: '16 / 9', position: '46% 50%' },
    mobile: { aspect: '4 / 3', position: '48% 50%' },
    radius: 2,
    treatment: {
      mode: 'material',
      grade: EDITORIAL_WARM,
      displacement: 0.5,
      pointerInfluence: 0.45,
      scrollInfluence: 1,
      chromatic: 0,
      damping: 3.6,
    },
  },
} satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof media;
