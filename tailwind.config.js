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
        small:"60px",
        huge: "128px",
      },
      fontFamily: {
        "cabinet-grotesk": ['"Cabinet Grotesk"'],
        "inter": ['"Inter"']
      },
      colors: {
        "shadow-gray": "#23262F99",
        "divider-color": "#23262F1A",
        "light-black": "#23262F",
        "gradient-2": "#C9FFF5",
        "gradient-3": "rgba(255, 221, 160, 1)",
        "button-blue": "#2772F0",
        "logout-bg":"#E6521F1A",
        "logout-text":"#E6521FCC",
        "blue-active":"rgba(39, 114, 240, 0.8)",
        "light-button-blue":"rgba(50, 107, 255, 0.1)",
        "blue-text":"rgba(50, 107, 255, 1)"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
