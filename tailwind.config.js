/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: '#a855f7',
          blue: '#0ea5e9',
          pink: '#ec4899',
          cyan: '#06b6d4',
        },
        cyberpunk: {
          dark: '#0a0a0a',
          darkGray: '#1a1a1a',
          gray: '#2a2a2a',
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'shimmer': 'shimmer 2s infinite',
        'neon-flicker': 'neon-flicker 0.15s infinite',
        'waveform': 'waveform 1s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)', opacity: '1' },
          '50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)', opacity: '0.8' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'neon-flicker': {
          '0%, 18%, 22%, 25%, 54%, 56%, 100%': { textShadow: '0 0 10px #a855f7, 0 0 20px #ec4899' },
          '20%, 24%, 55%': { textShadow: 'none' },
        },
        'waveform': {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.5)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
