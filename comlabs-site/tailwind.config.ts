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
        canvas: '#f2f0eb',
        surface: '#ffffff',
        ink: '#292827',
        muted: '#666666',
        line: '#e3e3e2',
        wine: '#421d24',
        violet: '#714cb6',
        lilac: '#d4c7ff',
        lagoon: '#0c4243',
      },
      fontFamily: {
        sans: ['Google Sans', 'Inter', 'system-ui', 'sans-serif'],
        secondary: ['Inter', 'Google Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['64px', { lineHeight: '0.96', fontWeight: '500', letterSpacing: '-0.032em' }],
        'heading-xl': ['49px', { lineHeight: '1.20', fontWeight: '500', letterSpacing: '-0.030em' }],
        'heading-lg': ['48px', { lineHeight: '0.96', fontWeight: '500', letterSpacing: '-0.028em' }],
        'heading-md': ['28px', { lineHeight: '1.14', fontWeight: '500', letterSpacing: '-0.022em' }],
        'subheading': ['26px', { lineHeight: '1.30', fontWeight: '500', letterSpacing: '-0.020em' }],
        'body-lg': ['20px', { lineHeight: '1.50', fontWeight: '400', letterSpacing: '-0.018em' }],
        'body': ['16px', { lineHeight: '1.50', fontWeight: '400', letterSpacing: '-0.016em' }],
        'label': ['14px', { lineHeight: '1.20', fontWeight: '500', letterSpacing: '-0.014em' }],
      },
      maxWidth: {
        'container': '1200px',
      },
      spacing: {
        'gutter-desktop': '40px',
        'gutter-tablet': '24px',
        'gutter-mobile': '20px',
        'section-desktop': '96px',
        'section-tablet': '72px',
        'section-mobile': '52px',
      },
      borderRadius: {
        'small': '8px',
        'card': '16px',
        'button': '16px',
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
