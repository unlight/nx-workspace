const nrwlReact = require('@nrwl/react/plugins/webpack');

/**
 * @param  { import('webpack').Configuration } config
 */
module.exports = (config, { options, configuration }) => {
  config = nrwlReact(config);

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
