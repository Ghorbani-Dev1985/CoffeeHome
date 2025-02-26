/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/app/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          md: "0.625rem",
        },
      },
      colors:{
       primary: '#ec4899',
       secondary: '#fce7f3',
       textColor: '#242424',
       success: 'rgb(0 , 192 , 115)',
       warning: 'rgb(255 , 153 , 0)',
       error: 'rgb(255,71 , 87)',
       danger: '#f43f5e'
       },
      fontFamily: {
        ShabnamFD: ["Shabnam-FD", "Tahoma"],
        Shabnam: ["Shabnam", "Tahoma"],
      },
      backgroundImage: {
        'footerBg' : 'url("/images/footer/footer-bg.png")',
      }
    },
  },
  plugins: [
    function ({ addVariant } : any) : void {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
    require("tailwind-scrollbar"),
  ],
}
