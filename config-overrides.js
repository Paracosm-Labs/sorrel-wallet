const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = { "querystring": require.resolve("querystring-es3") };

  return config;
};