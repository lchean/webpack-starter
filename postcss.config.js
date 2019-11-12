/* eslint-disable no-unused-vars */
module.exports = ({ file, options, env }) => ({
  plugins: {
    autoprefixer: {},
    'postcss-inline-svg': {},
    cssnano: env === 'production' ? {} : false,
  },
});
