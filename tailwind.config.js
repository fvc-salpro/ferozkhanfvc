module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: 'var(--font-inter), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    extend: {
      colors: {
        primary: '#4FBBF3',
        secondary: '#0FAE18',
        'dark-primary': '#05090D',
      },
      fontSize: {
        h1: ['56px', { lineHeight: '120%' }],
        h2: ['48px', { lineHeight: '120%' }],
        h3: ['40px', { lineHeight: '120%' }],
        h4: ['32px', { lineHeight: '120%' }],
        h5: ['28px', { lineHeight: '130%' }],
        h6: ['24px', { lineHeight: '130%' }],
        b18: ['18px', { lineHeight: '140%' }],
        b16: ['16px', { lineHeight: '150%' }],
        b14: ['14px', { lineHeight: '150%' }],

        'h1-m': ['42px', { lineHeight: '120%' }],
        'h2-m': ['36px', { lineHeight: '120%' }],
        'h3-m': ['30px', { lineHeight: '120%' }],
        'h4-m': ['26px', { lineHeight: '120%' }],
        'h5-m': ['22px', { lineHeight: '120%' }],
        'h6-m': ['20px', { lineHeight: '120%' }],
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio"), require('@tailwindcss/typography')],
};
