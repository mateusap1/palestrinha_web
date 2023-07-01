/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        128: "32rem",
      },
      colors: {
        primary: "#0C134F",
        secundary: "#0a0f40",
        opposite: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
