import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#f5f3ee',
        surface: '#ffffff',
        ink: '#171717',
        muted: '#5c5c5c',
        line: '#e6e4df',
        banner: '#241833',
        forest: '#0e3b32',
        footer: '#1a1210',
      },
      fontFamily: {
        sans: ['Google Sans', 'Inter', 'system-ui', 'sans-serif'],
        secondary: ['Inter', 'Google Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['72px', { lineHeight: '0.96', fontWeight: '500', letterSpacing: '-0.038em' }],
        'heading-xl': ['48px', { lineHeight: '1.08', fontWeight: '500', letterSpacing: '-0.032em' }],
        'heading-lg': ['40px', { lineHeight: '1.10', fontWeight: '500', letterSpacing: '-0.028em' }],
        'heading-md': ['28px', { lineHeight: '1.16', fontWeight: '500', letterSpacing: '-0.022em' }],
        'subheading': ['22px', { lineHeight: '1.35', fontWeight: '400', letterSpacing: '-0.018em' }],
        'body-lg': ['18px', { lineHeight: '1.55', fontWeight: '400', letterSpacing: '-0.014em' }],
        'body': ['16px', { lineHeight: '1.50', fontWeight: '400', letterSpacing: '-0.012em' }],
        'label': ['13px', { lineHeight: '1.25', fontWeight: '500', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        'container': '1180px',
      },
      spacing: {
        'gutter-desktop': '40px',
        'gutter-tablet': '24px',
        'gutter-mobile': '20px',
        'section-desktop': '104px',
        'section-tablet': '72px',
        'section-mobile': '56px',
      },
      borderRadius: {
        'small': '8px',
        'card': '16px',
        'button': '8px',
      },
      transitionDuration: {
        'DEFAULT': '200ms',
      },
      transitionTimingFunction: {
        'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
