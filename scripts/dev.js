const webpack = require('webpack');
const nodemon = require('nodemon');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const { print, compilerPromise } = require('./utils');

const { PORT } = require('../webpack.config.base.js');
const clientConfig = require('../webpack.config.client.js');
const serverConfig = require('../webpack.config.server.js');

const watchOptions = {
  ignored: /node_modules/,
  stats: clientConfig.stats,
};

const startNodemon = () => {
  const script = nodemon({
    script: `build/server/main.js`,
    ignore: ['src', 'scripts', 'webpack.*', 'build/client'],
    delay: 200,
  });

  script.on('restart', () => {
    print('server', 'Restarted!', 'warning');
  });

  script.on('quit', () => {
    print('server', 'Process ended!', 'warning');
    process.exit();
  });

  script.on('error', () => {
    print('server', 'An error occured!', 'error');
    process.exit(1);
  });
};

const app = express();

const init = async () => {
  const multiCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = multiCompiler.compilers.find(r => r.name === 'client');
  const serverCompiler = multiCompiler.compilers.find(r => r.name === 'server');

  const clientPromise = compilerPromise('client', clientCompiler);
  const serverPromise = compilerPromise('server', serverCompiler);

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  app.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      stats: clientConfig.stats,
      watchOptions,
    }),
  );

  app.use(webpackHotMiddleware(clientCompiler));
  app.use('/static', express.static('build/client'));
  app.listen(PORT);

  serverCompiler.watch(watchOptions, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
    } else {
      if (error) {
        print('server', error, 'error');
      }

      if (stats.hasErrors()) {
        const info = stats.toJson();
        const errors = info.errors[0].split('\n');

        errors.forEach(r => print('server', r, 'error'));
      }
    }
  });

  try {
    await Promise.all([serverPromise, clientPromise]);
  } catch (error) {
    return print('compiler', error, 'error');
  }

  startNodemon();
};

init();
