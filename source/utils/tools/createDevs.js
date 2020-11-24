const shell = require('shelljs');

const devs = ['express', 'cors', 'dotenv', 'socket.io', 'socket.io-client'];
exports.createDevs = async ({ database }) => {
  const dbDevs = database.MongoDB ? 'mongoose' : 'pg pg-hstore sequelize';
  await shell.exec('npm init -y');
  await shell.exec(`npm i ${devs.join(' ')} ${dbDevs}`);
};
