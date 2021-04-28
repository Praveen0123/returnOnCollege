module.exports = {
  module: {
    rules: [
      {
        test: /tailwind\.css$/,
        loader: 'postcss-loader',
        options: {
          ident: 'embedded',
          plugins: [
            require('postcss-import'),
            require('postcss-nested'),
            require('tailwindcss')(
              'apps/roc-modeling/src/scss/vendors/tailwindcss/tailwind.config.js'
            ),
            require('autoprefixer'),
          ],
        },
      },
    ],
  },
};
