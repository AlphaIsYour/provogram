// tailwind.config.ts

import aspectRatio from "@tailwindcss/aspect-ratio";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ... tema Anda yang lain
    },
  },
  plugins: [
    aspectRatio, // <-- TAMBAHKAN BARIS INI
  ],
};

export default config;
