/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kaushan: ["Kaushan Script", "cursive"],
        serif: ["DM Serif Display", "serif"],
        sans: ["Inter", "sans"],
        playfair: ["Playfair Display", "serif"],
        poppins: ["Poppins", "sans"],
      },
    },
  },
  plugins: [],
};
