import type { Config } from 'tailwindcss'

/**
 * Relay design tokens.
 * Change the palette here and the whole template follows.
 */
const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/config/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#f6f4ef',
        surface: '#ffffff',
        raised: '#fbfaf6',
        ink: '#141412',
        muted: '#5b594f',
        subtle: '#8a877c',
        line: '#e3dfd4',
        hairline: '#efece3',
        moss: '#14322c',
        'moss-deep': '#0c211d',
        'moss-light': '#2f6b57',
        signal: '#2f6b57',
        amber: '#9a6a24',
        footer: '#131210',
      },
      fontFamily: {
        display: ['Google Sans', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        secondary: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-serif)', 'Iowan Old Style', 'Georgia', 'serif'],
      },
      fontSize: {
        display: ['72px', { lineHeight: '0.98', fontWeight: '500', letterSpacing: '-0.042em' }],
        'heading-xl': ['48px', { lineHeight: '1.06', fontWeight: '500', letterSpacing: '-0.034em' }],
        'heading-lg': ['38px', { lineHeight: '1.1', fontWeight: '500', letterSpacing: '-0.03em' }],
        'heading-md': ['27px', { lineHeight: '1.18', fontWeight: '500', letterSpacing: '-0.024em' }],
        subheading: ['21px', { lineHeight: '1.4', fontWeight: '400', letterSpacing: '-0.018em' }],
        'body-lg': ['17px', { lineHeight: '1.6', fontWeight: '400', letterSpacing: '-0.012em' }],
        body: ['15px', { lineHeight: '1.6', fontWeight: '400', letterSpacing: '-0.01em' }],
        label: ['12px', { lineHeight: '1.3', fontWeight: '500', letterSpacing: '0.02em' }],
        micro: ['11px', { lineHeight: '1.3', fontWeight: '500', letterSpacing: '0.04em' }],
      },
      maxWidth: {
        container: '1180px',
        prose: '680px',
      },
      spacing: {
        'gutter-mobile': '20px',
        'gutter-tablet': '28px',
        'gutter-desktop': '40px',
        'section-mobile': '56px',
        'section-tablet': '76px',
        'section-desktop': '104px',
      },
      borderRadius: {
        control: '9px',
        scene: '16px',
        panel: '14px',
      },
      boxShadow: {
        panel: '0 1px 2px rgba(20, 20, 18, 0.04), 0 12px 32px -12px rgba(20, 20, 18, 0.16)',
        raised: '0 1px 2px rgba(20, 20, 18, 0.05), 0 24px 60px -24px rgba(20, 20, 18, 0.32)',
      },
      transitionDuration: {
        DEFAULT: '180ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      keyframes: {
        'scene-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'scene-in': 'scene-in 180ms cubic-bezier(0.32, 0.72, 0, 1) both',
      },
    },
  },
  plugins: [],
}

export default config
