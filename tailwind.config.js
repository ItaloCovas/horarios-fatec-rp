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
        gray: {
          primary: '#66645E',
        },
        red: {
          primary: '#95291A',
          secondary: '#771F13',
        },
      },
      keyframes: {
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
        float: 'float 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
