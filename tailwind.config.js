/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)'],
      },
      colors: {
        primary: '#E9B434',
        'primary-dark': '#CF9B16',
        secondary: '#F74C06',
        'dark-primary': '#272424',
        'gray-primary': '#7C7E7D',
      },
      fontSize: {
        h1: ['52px', { lineHeight: '120%' }],
        h2: ['44px', { lineHeight: '120%' }],
        h3: ['36px', { lineHeight: '120%' }],
        h4: ['30px', { lineHeight: '120%' }],
        h5: ['26px', { lineHeight: '130%' }],
        h6: ['22px', { lineHeight: '130%' }],
        b18: ['18px', { lineHeight: '140%' }],
        b16: ['16px', { lineHeight: '150%' }],
        b14: ['14px', { lineHeight: '150%' }],
        caption: ['12px', { lineHeight: '120%' }],

        'h1-m': ['36px', { lineHeight: '120%' }],
        'h2-m': ['32px', { lineHeight: '120%' }],
        'h3-m': ['28px', { lineHeight: '120%' }],
        'h4-m': ['24px', { lineHeight: '120%' }],
        'h5-m': ['22px', { lineHeight: '120%' }],
        'h6-m': ['20px', { lineHeight: '120%' }],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
