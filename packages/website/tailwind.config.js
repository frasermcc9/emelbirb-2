module.exports = {
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "f-primary": "#F55D3E",
        "f-offdark": "#292841",
        "f-dark": "#1C1B29",
        "f-light": "#EFF1F3",
        "f-blue": "#5299D3",
        "f-purple": "#8332Ac",
        "f-ultradark": "#08080D",
        "f-semidark": "#353054",
      },
      width: {
        "11/24": "45.83%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
