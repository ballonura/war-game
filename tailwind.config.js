/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    colors: {
      red: "#CF6766",
      blue: "#30415D",
      white: "#ffffff",
      grey: "#e8e8e8",
      "grey-100": "#222222",
      "grey-200": "#eeeeee",
      "grey-300": "#cbcbcb"
    },
    container: {
      center: true,
      padding: "20px"
    }
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === "production",
    content: [
      "components/**/*.vue",
      "layouts/**/*.vue",
      "pages/**/*.vue",
      "plugins/**/*.js",
      "nuxt.config.js"
    ]
  }
};
