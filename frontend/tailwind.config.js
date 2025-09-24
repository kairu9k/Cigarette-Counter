import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-green': {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bde5be',
          300: '#92d394',
          400: '#5fb863',
          500: '#3a9a3e',
          600: '#2c7b30',
          700: '#246228',
          800: '#1f4f23',
          900: '#1b401f',
          950: '#0a240c',
        }
      },
      backgroundImage: {
        'gradient-dark-green': 'linear-gradient(135deg, #0a240c 0%, #1b401f 25%, #246228 50%, #2c7b30 75%, #3a9a3e 100%)',
        'gradient-dark-green-card': 'linear-gradient(145deg, #1b401f 0%, #246228 50%, #2c7b30 100%)',
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        darkgreen: {
          "primary": "#3a9a3e",
          "secondary": "#5fb863",
          "accent": "#92d394",
          "neutral": "#1b401f",
          "base-100": "#0a240c",
          "base-200": "#1b401f",
          "base-300": "#246228",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
};
