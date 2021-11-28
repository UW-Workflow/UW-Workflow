module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    height: {
      "gradient-2-circle": "408px",
    },
    width: {
      "gradient-2-circle": "408px",
    },
    // fontSize:{
    //   xl:['48px','72px']
    // },
    extend: {
      blur: {
        huge: "128px",
      },
      backgroundImage: {
        "about-us-gradient": "url('/gradientBgAboutUs.png')",
      },
      fontFamily: {
        "cabinet-grotesk": ['"Cabinet Grotesk"'],
      },
      colors: {
        "shadow-gray": "#23262F99",
        "divider-color": "#23262F1A",
        "light-black": "#23262F",
        "gradient-2": "#C9FFF5",
        "gradient-pink": "#E6D0F5",
        "button-blue": "#2772F0",
        "login-blue": "#326BFF",
        "overlay-grey": "#21262E",
      },
      margin: {
        105: "30rem",
      },
      minWidth: {
        400: "400px",
        100: "100px",
        300: "300px",
        200: "200px",
        120: "120px",
        20: "20px",
      },
      maxWidth: {
        400: "400px",
        20: "20px",
      },
      outline: {
        gray: "1px solid #23262f",
      },
    },
  },
  variants: {
    extend: {},
    display: ["group-hover"],
  },
  plugins: [require("@tailwindcss/forms")],
};
