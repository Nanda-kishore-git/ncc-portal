import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
      },
      colors: {
        'ncc-red': '#ef1c25',      // Army (red)
        'ncc-navy': '#003366',     // Navy (deep blue)
        'ncc-air': '#00aeef',      // Air Force (light blue)
        'ncc-gold': '#ffcb06',     // Accent (yellow/gold)
        'ncc-gray': '#f5f6fa'      // Background gray
      },
    },
  },
  plugins: [],
}
export default config