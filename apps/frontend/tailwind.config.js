module.exports = {
  mode: 'aot',
  purge: {
    mode: 'all',
    content: [`${__dirname}/src/index.html`, `${__dirname}/src/**/*.tsx`],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
