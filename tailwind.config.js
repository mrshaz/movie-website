/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: '#E50914',
          dark: '#141414',
          gray: '#808080',
        },
        accent: {
          violet: '#7C3AED',
          cyan: '#06B6D4',
        },
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInFast: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.8s linear infinite',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        fadeInFast: 'fadeInFast 0.3s ease-out forwards',
      },
      backgroundImage: {
        'shimmer-gradient':
          'linear-gradient(90deg, #1f1f1f 25%, #2a2a2a 50%, #1f1f1f 75%)',
      },
    },
  },
  plugins: [],
};
