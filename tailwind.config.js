/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode:'class',
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
        '2xl':'5rem',
      },
    },
    extend: {
      fontFamily:{
        nunito:['"Nunito-Sans"', 'sans-serif']
      },
      colors:{
        darkFeatures:"hsl(209, 23%, 22%)",
        darkBackground: "hsl(207, 26%, 17%)",
        darkElText: "hsl(0, 0%, 100%)",
        lightFeatures: "hsl(0, 0%, 100%)",
        lightBackground: "hsl(0, 0%, 98%)",
        lightElText: "hsl(200, 15%, 8%)",
        lightElInput: "hsl(0, 0%, 52%)",      
      },
      spacing:{
        minus:'calc(100vh - 300px)'
      }
    },
  },
  plugins: [],
}
