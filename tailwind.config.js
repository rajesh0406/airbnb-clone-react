/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E81948",
        black: "#222222",
        "custom-grey": "#6A6A6A",
        "dark-black": "#000000",
      },
    },
  },
  plugins: [],
};
