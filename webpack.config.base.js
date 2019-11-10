/* eslint-disable */
const { resolve } = require('path');
const merge = require('webpack-merge');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');
const webpack = require('webpack');

const INCLUDE = resolve(__dirname, 'src');
const PORT = 8081;

const dev = process.env.NODE_ENV === 'development';

const config = {
  mode: dev ? 'development' : 'production',

  devtool: dev ? 'eval-source-map' : 'none',

  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: dev ? `http://localhost:${PORT}/static/` : '/static/',
  },

  module: {
    rules: [
      {
        test: /\.tsx|ts$/,
        loader: 'babel-loader',
        include: INCLUDE,
      },
    ],
  },

  node: {
    __dirname: false,
    __filename: false,
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
    alias: {
      '~': INCLUDE,
      'react-dom': dev ? '@hot-loader/react-dom' : 'react-dom',
    },
  },

  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    children: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false,
  },

  plugins: [],
};

function getConfig(...cfg) {
  return merge(config, ...cfg);
}

const getBaseConfig = () => {
  const config = {
    plugins: [...getDevPlugins()],

    output: {},
    entry: {},
  };

  return config;
};

const getDevPlugins = () => {
  if (!dev) return [];

  return [
    new HardSourceWebpackPlugin(),
    new WriteFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ];
};

const getFileLoader = (emitFile = true) => {
  return {
    test: /\.(png|gif|jpg|woff2|ttf|svg)$/,
    include: INCLUDE,
    use: [
      {
        loader: 'file-loader',
        options: {
          emitFile,
        },
      },
    ],
  };
};

module.exports = {
  getConfig,
  dev,
  getBaseConfig,
  getDevPlugins,
  PORT,
  getFileLoader,
};
