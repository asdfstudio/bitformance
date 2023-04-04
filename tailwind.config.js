/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        DM_Sans: "'DM Sans', sans-serif",
        book: "'Maison Neue Book', sans-serif",
      },
      colors: {
        main: {
          deepestBlue: "#142b4f",
          deepBlue: "#1c448e",
          gColor: "#5290f4",
          buttonBlue: "#5290f4",
          red: "#f64740",
          black: "#192332",
          gray: "#566375",
          lightGray: "#f7f9fc",
          lightGrayBorder: "#e9edf1",
          deepOrange: "#fd5d60",
          white: "#ffffff"

        },
      }
    },
  },
  plugins: [],
}
