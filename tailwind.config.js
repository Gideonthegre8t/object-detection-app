/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable dark mode via class
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#1DA1F2', 
        secondary: '#14171A', 
        customPurple: '#755AE2',
        customWhite:'#FFFFFF',

      },
      fontFamily: {
        sans: ['YourCustomFont', 'system-ui', 'sans-serif','Nunito'], // Add custom font
      },
    },
  },
  plugins: [],
};
