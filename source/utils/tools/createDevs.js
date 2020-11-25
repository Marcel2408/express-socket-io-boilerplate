const shell = require('shelljs');
const fs = require('fs');

const devs = ['express', 'cors', 'dotenv', 'socket.io', 'socket.io-client'];
const saveDevs = ['jest'];
const scripts = {
  start: 'NODE_ENV=PROD node ./server',
  test: 'NODE_ENV=TEST jest -i',
};
exports.createDevs = async ({ database }, appName, path) => {
  const dbDevs = database.MongoDB ? 'mongoose' : 'pg pg-hstore sequelize';
  await shell.exec('npm init -y');
  await shell.exec(`npm i ${devs.join(' ')} ${dbDevs}`);
  await shell.exec(`npm i ${saveDevs.join(' ')} -D`);
  const packageJSONFile = JSON.parse(fs.readFileSync(`${path}/${appName}/package.json`));
  // passing scripts for different environments
  packageJSONFile.scripts = scripts;
  fs.writeFileSync(`${path}/${appName}/package.json`, JSON.stringify(packageJSONFile));
};
