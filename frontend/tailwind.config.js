/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  safelist: [
    "bg-navy",
    "bg-sky",
    "bg-beige",
    "text-navy",
    "text-softwhite",
    "border-teal",
  ],

  theme: {
    extend: {
      colors: {
        navy: "#2F4156",
        teal: "#567C8D",
        sky: "#C8D9E6",
        beige: "#F5EFEB",
        softwhite: "#FFFFFF",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },

  plugins: [],
};
