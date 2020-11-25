const chalk = require('chalk');

module.exports.multicolor = (message) => {
  let i = 0;
  const colors = [chalk.rgb(184, 17, 184), chalk.rgb(7, 96, 131), chalk.magenta, chalk.yellow, chalk.blue, chalk.grey, chalk.green];
  console.log(message.split('').reduce((a, b) => {
    i += 1;
    if (i === 7) i = 0;
    return a += colors[i](b);
  }, ''));
};

module.exports.highlight = (message, expression = '') => message.replace(expression, chalk.bold.whiteBright(expression));

module.exports.log = (message = '', status = null) => {
  let icon = '';
  let spaces = ' ';
  let content = '';

  switch (status) {
    case 'finish':
      content = chalk.green(message);
      break;
    case 'success':
      icon = '✅';
      content = chalk.green(message);
      break;
    case 'attention':
      icon = '⚡';
      content = chalk.red(message);
      break;
    case 'warning':
      icon = '⚠️';
      spaces = '  ';
      content = chalk.yellow(message);
      break;
    case 'error':
      icon = '❌';
      content = chalk.red(message);
      break;
    case 'info':
      icon = '❕';
      content = chalk.white.bold(message);
      break;
    case 'working':
      icon = '⚙️';
      spaces = '  ';
      content = chalk.cyan(message);
      break;
    default:
      icon = '';
      spaces = '';
      content = message;
      break;
  }

  console.log(`${icon}${spaces}${content}`);
};
