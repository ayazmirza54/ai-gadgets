/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#08080A',
          900: '#0E0E11',
          850: '#131317',
          800: '#18181D',
          700: '#22222A',
          600: '#2E2E37',
          500: '#4A4A55',
          400: '#71717D',
          300: '#A1A1AC',
          200: '#CFCFD6',
          100: '#F2F2F5',
        },
        zap: {
          DEFAULT: '#22F06A',
          400: '#5CFF95',
          500: '#22F06A',
          600: '#12C957',
        },
        volt: '#2FA8FF',
        ember: '#FF7A45',
        aqua: '#19E6E6',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'fade-up': { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'none' } },
        pulseDot: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.35' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'fade-up': 'fade-up .6s cubic-bezier(.2,.7,.2,1) both',
        'pulse-dot': 'pulseDot 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
