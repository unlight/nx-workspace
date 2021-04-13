module.exports = ({ env, cwd }) => {
  const isProduction = env === 'production';
  const plugins = [
    require('tailwindcss')({ config: `${__dirname}/tailwind.config.js` }),
    require('autoprefixer')(),
    isProduction
      ? require('@fullhuman/postcss-purgecss')({
          content: [`${__dirname}/src/index.html`, `${__dirname}/src/**/*.tsx`],
        })
      : false,
    isProduction
      ? require('cssnano')({
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        })
      : false,
  ];

  return {
    plugins: plugins.filter(Boolean),
  };
};
