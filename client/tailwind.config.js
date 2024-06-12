import { violet, blackA, mauve, green } from '@radix-ui/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        md: '1000px',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      colors: {
        ...mauve,
        ...violet,
        ...green,
        ...blackA,
        gray: {
          primary: '#66645E',
        },
        red: {
          primary: '#95291A',
          secondary: '#771F13',
        },
      },
      keyframes: {
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        contentShow: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -48%) scale(0.96)',
          },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
        float: {
          '0%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
          '100%': {
            transform: 'translateY(0px)',
          },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        float: 'float 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
