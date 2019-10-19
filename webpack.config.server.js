const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');

const {
  getConfig,
  getBaseConfig,
  getFileLoader,
} = require('./webpack.config.base');

const clientConfig = getConfig(getBaseConfig(), {
  name: 'server',

  target: 'node',

  entry: './src/server',

  module: {
    rules: [getFileLoader(false)],
  },

  output: {
    path: resolve(__dirname, 'build', 'server'),
  },

  externals: [nodeExternals()],
});

module.exports = clientConfig;
