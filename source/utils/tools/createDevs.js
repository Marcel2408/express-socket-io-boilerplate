const shell = require('shelljs');
const fs = require('fs');
const { multicolor } = require('./logger');

const devs = ['express', 'cors', 'dotenv', 'socket.io', 'socket.io-client'];
const saveDevs = ['jest', 'nodemon'];
const scripts = {
  start: 'NODE_ENV=PROD node ./server',
  dev: 'NODE_ENV=DEV nodemon ./server',
  test: 'NODE_ENV=TEST jest -i',
};
exports.createDevs = async ({ database }, appName, path) => {
  multicolor('Initializing Git...');
  await shell.exec('git init');
  multicolor('Git Initialized ...');
  const dbDevs = database.MongoDB ? 'mongoose' : 'pg pg-hstore sequelize';
  await shell.exec('npm init -y');
  multicolor('Installing npm...', 'working');
  await shell.exec(`npm i ${devs.join(' ')} ${dbDevs}`);
  multicolor('Installing your dependencies...', 'working');
  multicolor('This may take a while....', 'info');
  await shell.exec(`npm i ${saveDevs.join(' ')} -D`);
  const packageJSONFile = JSON.parse(fs.readFileSync(`${path}/${appName}/package.json`));
  // passing scripts for different environments
  packageJSONFile.scripts = scripts;
  fs.writeFileSync(`${path}/${appName}/package.json`, JSON.stringify(packageJSONFile));
};
