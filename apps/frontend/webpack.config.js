const nrwlReact = require('@nrwl/react/plugins/webpack');

/**
 * @param  { import('webpack').Configuration } config
 */
module.exports = (config, { options, configuration }) => {
  config = nrwlReact(config);

  const cssRule = config.module.rules.find(r => String(r.test).includes('\\.css$'));
  const loaders = cssRule?.oneOf?.filter(loader => String(loader.test) === '/\\.css$/');
  const [cssLoader, globalStyleLoader] = loaders;
  globalStyleLoader && configurePostcssLoader(globalStyleLoader);
  // console.dir(loaders, { depth: 5 });

  config.plugins = config.plugins.filter(p => {
    const pluginName = p?.constructor?.name;
    if (
      options.watch &&
      pluginName === 'ForkTsCheckerWebpackPlugin' &&
      process.env.WORKSPACE_NO_TS_CHECK
    ) {
      return false;
    }
    return true;
  });

  return config;
};

function configurePostcssLoader(loader) {
  const postcssLoader = loader.use.find(
    loader =>
      typeof loader === 'object' && typeof loader.options.postcssOptions === 'function',
  );
  const originalPostcssOptions = postcssLoader.options.postcssOptions;

  postcssLoader.options.postcssOptions = configurePostcssOptions;

  function configurePostcssOptions(loaderContext) {
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
}
