const chalk = require('chalk');

const getColor = type => {
  switch (type) {
    case 'warning':
      return 'yellow';
    case 'error':
      return 'blue';
  }

  return 'greenBright';
};

const print = (name, message, type = 'info') => {
  const color = getColor(type);

  console.log(`${chalk.cyan.bold(`[${name}]`)} ${chalk[color](message)}`);
};

const compilerPromise = (name, compiler) => {
  return new Promise((resolve, reject) => {
    compiler.hooks.compile.tap(name, () => {
      print(name, 'Compiling');
    });

    compiler.hooks.done.tap(name, stats => {
      if (!stats.hasErrors()) {
        resolve();
      } else {
        print(name, 'Failed to compile!', 'error');
        reject();
      }
    });
  });
};

module.exports = {
  print,
  compilerPromise,
};
