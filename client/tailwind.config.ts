/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
     extend: {
      fontFamily: {
        primary: ['var(--font-primary)'],
        heading: ['var(--font-heading)'],
      },
       animation: {
        'spin-slow': 'spin 5s linear infinite',
        'fade-in': 'fadeIn 4s ease-out',
        'bounce-slow': 'bounce 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-1rem)' }
        }
      }
    },
    },
  plugins: [],
}