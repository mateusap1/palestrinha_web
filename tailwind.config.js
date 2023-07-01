/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      "primary": "#0C134F",
      "secundary": "#0a0f40",
      "opposite": "#FFFFFF"
    },
    extend: {
      width: {
        128: "32rem",
      },
    },
  },
  plugins: [],
};
