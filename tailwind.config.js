/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blueprint: {
          bg: '#0E2238',      // deep blueprint navy
          bgDeep: '#0A1B2C',  // darker panel navy
          line: '#EDEEF0',    // off-white linework
          accent: '#5EA8FF',  // cyan-blue accent
          amber: '#FFB454',   // warm highlight, used sparingly
          slate: '#8CA0B3',   // muted secondary text
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        grid: `linear-gradient(rgba(237,238,240,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(237,238,240,0.06) 1px, transparent 1px)`,
      },
      backgroundSize: {
        grid: '32px 32px',
      },
    },
  },
  plugins: [],
}
