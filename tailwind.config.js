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
    extend: {
      blur: {
        huge: "128px",
      },
    },
    colors: {
      "shadow-gray": "#23262F99",
      "divider-color": "#23262F1A",
      "light-black": "#23262F",
      "gradient-2": "#C9FFF5",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
