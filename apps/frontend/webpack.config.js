const assert = require('assert');
const nrwlReact = require('@nrwl/react/plugins/webpack');
const createPostcssConfig = require('./postcss.config.js');

/**
 * @param  { import('webpack').Configuration } config
 */
module.exports = (config, { options, configuration }) => {
  config = nrwlReact(config);
  const cssRule = config.module.rules.find(r => String(r.test).includes('\\.css$'));
  const postcssCreateContext = { env: config.mode };
  cssRule.oneOf
    .flatMap(x => x.use)
    .filter(x => x.loader?.includes('postcss-loader'))
    .map(x =>
      x.options.postcssOptions.postcssOptions ? x.options.postcssOptions : x.options,
    )
    .forEach(configurePostcssLoaderOptions.bind(undefined, postcssCreateContext));

  config.plugins = config.plugins.filter(p => {
    const pluginName = p?.constructor?.name;
    if (
      pluginName === 'ForkTsCheckerWebpackPlugin' &&
      process.env.WORKSPACE_NO_TS_CHECK
    ) {
      return false;
    }
    if (pluginName === 'LicenseWebpackPlugin') {
      return false;
    }
    return true;
  });

  return config;
};

function configurePostcssLoaderOptions(postcssCreateContext, options) {
  assert.strictEqual(typeof options.postcssOptions, 'function');
  options.postcssOptions = createPostcssOptions.bind(
    undefined,
    postcssCreateContext,
    options.postcssOptions,
  );
}

function createPostcssOptions(
  postcssCreateContext,
  originalPostcssOptions,
  loaderContext,
) {
  const postcssConfig = originalPostcssOptions(loaderContext);
  postcssConfig.plugins = postcssConfig.plugins.filter(
    p => p.postcssPlugin !== 'autoprefixer',
  );
  const { plugins } = createPostcssConfig(postcssCreateContext);
  postcssConfig.plugins.push(...plugins);
  return postcssConfig;
}
