/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#35374B',
        primary: '#50727B',
        secondary: '#344955',
        tertiary: '#78A083',
        darkBackground: '#171821',
      },

      keyframes: {
        'bounce-up': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },

      animation: {
        'bounce-up': 'bounce-up 0.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

