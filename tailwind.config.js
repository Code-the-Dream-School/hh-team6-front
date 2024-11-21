/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: '320px', // => @media (min-width: 320px) { ... }
        tablet: '640px', // => @media (min-width: 640px) { ... }
        laptop: '1024px', // => @media (min-width: 1024px) { ... }
        desktop: '1280px', // => @media (min-width: 1280px) { ... }
        wide: '1536px', // => @media (min-width: 1536px) { ... }
      },
      colors: {
        black: '#160C0B',
        white: '#FFFFFF',
        red: '#D33A10', // used for buttons, text, and border in outline buttons
        yellow: '#FFB347', // used for buttons, text, and border in outline buttons
        darkGreen: '#007185', // used for buttons, text, and border in outline buttons
        lightBlue: '#F5F9FA', // used for backgrounds of book cards, footer, etc.
        gray: '#8799A9', // used for borders, input borders, and buttons in the header
        blueGray: '#47667E', // used for text in buttons in the header
      },
      fontFamily: {
        headings: ['Literata', 'serif'], // font for headings
        body: ['Magra', 'sans-serif'], // font for main body text
      },
    },
  },
  plugins: [],
};
