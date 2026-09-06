/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        mist: '#F3F6FA', // soft blue-white
        cloud: '#E7EEF5', // pale blue
        navy: '#3A5A7C', // dusty blue — script names / headings
        blue: '#7C9BB8', // mid dusty blue
        blush: '#D9A9AE', // muted rose
        gold: '#B08A50', // gold accents / rules
        ink: '#33475B', // dark slate — body text
        stone: '#8290A0', // blue-grey — secondary text
        // legacy aliases so older class names keep working
        ivory: '#FFFFFF',
        cream: '#F3F6FA',
        sand: '#E7EEF5',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 9s linear infinite',
      },
    },
  },
  plugins: [],
};
