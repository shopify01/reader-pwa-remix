/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    fontWeight: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    colors: {
      grey: {
        light: "#e6e6e6",
        default: "#808080",
        dark: "#505050 "
      },
      gray: {
        light: " #FAF9F6",
      },
      black: {
        default: "#000",
        light: "#8c8c8c",
      },
      white: {
        default: "#fff",
        light: "#e6e6e6",
      },
      orange: {
        default: "#fca72cc4",
        dark: "#fb9404",
        light: "#ffedcc",
      },
      red: {
        default: "#ff3333",
      },
      blue: {
        default: "#3333ff",
      },
      green: {
        default: "#00b300",
      },
    },
    extend: {},
  },
  plugins: [],
};
