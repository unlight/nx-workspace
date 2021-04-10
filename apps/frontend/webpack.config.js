const assert = require('assert');
const nrwlReact = require('@nrwl/react/plugins/webpack');

/**
 * @param  { import('webpack').Configuration } config
 */
module.exports = (config, { options, configuration }) => {
  config = nrwlReact(config);

  const cssRule = config.module.rules.find(r => String(r.test).includes('\\.css$'));
  cssRule.oneOf
    .flatMap(x => x.use)
    .filter(x => x.loader?.includes('postcss-loader'))
    .map(x =>
      x.options.postcssOptions.postcssOptions ? x.options.postcssOptions : x.options,
    )
    .forEach(configurePostcssLoaderOptions);

  config.plugins = config.plugins.filter(p => {
    const pluginName = p?.constructor?.name;
    if (
      pluginName === 'ForkTsCheckerWebpackPlugin' &&
      process.env.WORKSPACE_NO_TS_CHECK
    ) {
      return false;
    }
    return true;
  });

  return config;
};

function configurePostcssLoaderOptions(options) {
  assert.strictEqual(typeof options.postcssOptions, 'function');
  options.postcssOptions = createPostcssOptions.bind(undefined, options.postcssOptions);
}

function createPostcssOptions(originalPostcssOptions, loaderContext) {
  const postcssConfig = originalPostcssOptions(loaderContext);
  postcssConfig.plugins.push(
    require('tailwindcss')({ config: `${__dirname}/tailwind.config.js` }),
  );
  const autoprefixerIndex = postcssConfig.plugins.findIndex(
    p => p.postcssPlugin === 'autoprefixer',
  );
  // Move autoprefixer to last position
  postcssConfig.plugins.push(...postcssConfig.plugins.splice(autoprefixerIndex, 1));
  return postcssConfig;
}
