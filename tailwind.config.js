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
      animation: {
        'spin': 'spin 1s linear infinite',
        'pulse': 'pulse 1.5s infinite',
        'fade-in': 'fade-in 0.8s ease-out',
        'slide-in': 'slide-in 1.5s linear infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      colors: {
        primary: '#E9B434',
        'primary-alt': '#F7E5B8',
        'primary-dark': '#CF9B16',
        'primary-light': '#FDFCF9',
        'footer-bg': '#FEFBF5',
        'primary-light-alt': '#FAE6C0',
        secondary: '#F74C06',
        'secondary-light': '#FFF6F3',
        'dark-primary': '#272424',
        'gray-primary': '#7C7E7D',
      },
      fontSize: {
        h1: ['52px', { lineHeight: '120%', fontWeight: '700', letterSpacing: '-2%', }],
        h2: ['44px', { lineHeight: '120%', fontWeight: '700' }],
        h3: ['36px', { lineHeight: '120%', fontWeight: '700' }],
        h4: ['30px', { lineHeight: '120%', fontWeight: '600' }],
        h5: ['26px', { lineHeight: '130%', fontWeight: '600' }],
        h6: ['22px', { lineHeight: '130%', fontWeight: '600',  }],
        b18: ['18px', { lineHeight: '140%' }],
        b16: ['16px', { lineHeight: '150%' }],
        b14: ['14px', { lineHeight: '150%' }],
        caption: ['12px', { lineHeight: '120%' }],

        'h1-xl': ['64px', { lineHeight: '120%', fontWeight: '700', letterSpacing: '-2%', }],
        'h1-m': ['36px', { lineHeight: '120%', fontWeight: '700' }],
        'h2-m': ['32px', { lineHeight: '120%', fontWeight: '700' }],
        'h3-m': ['28px', { lineHeight: '120%', fontWeight: '700' }],
        'h4-m': ['24px', { lineHeight: '120%', fontWeight: '600' }],
        'h5-m': ['22px', { lineHeight: '120%', fontWeight: '600' }],
        'h6-m': ['20px', { lineHeight: '120%', fontWeight: '600' }],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
