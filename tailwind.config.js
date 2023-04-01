/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        DM_Sans: "'DM Sans', sans-serif"
      },
      colors: {
        main: {
          deepestBlue: "#142b4f",
          deepBlue: "#1c448e",
          gColor: "#5290f4",
          buttonBlue: "#5290f4",

        },
      }
    },
  },
  plugins: [],
}
