import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A0E1A',
        'bg-surface': '#141929',
        'border-dark': '#1E2740',
        'accent-green': '#0F9D58',
        'accent-blue': '#4285F4',
        'text-primary': '#E2E8F0',
        'text-secondary': '#718096',
        danger: '#E53E3E',
        success: '#38A169',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #0F9D58 0%, #4285F4 100%)',
      },
    },
  },
  plugins: [],
}

export default config
