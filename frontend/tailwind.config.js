/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        themeColor: "#005e8c",
        themeColor1: "#0037FF",
        sidebarIcon: "#535862",
      },
      backgroundImage: {
        themeGradient: "linear-gradient(78deg, #497d8d, #005e8c)",
        themeGradientHover: "linear-gradient(78deg, #005e8c, #497d8d)",
        redGradient: "linear-gradient(78deg, #FF4E00, #D50000)",
        redGradientHover: "linear-gradient(78deg, #D50000, #FF4E00)",
      },
    },
  },
  plugins: [],
};
