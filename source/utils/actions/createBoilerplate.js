/* eslint-disable no-console */
const shell = require('shelljs');
// const fs = require('fs-extra');
const { log } = require('../tools/logger');

const createDirectories = require('../tools/createDirectories');
const { copyFiles } = require('../tools/copyFiles');
const { createsFiles } = require('../tools/createsFiles');
const userForms = require('../tools/userForms');
const structure = require('../tools/fileStructure');
const { createDevs } = require('../tools/createDevs');

async function createBoilerplate(appName, path) {
  // check presence of required dependencies

  const requiredDep = ['git', 'npm', 'npx'];

  requiredDep.forEach((dep) => {
    shell.which(dep);
    if (!shell.which(dep)) {
      console.log(`Sorry, this script requires ${dep}`, 'error');
      shell.exit(1);
    }
  });

  try {
    // root file created

    shell.mkdir(appName);
    log('Root folder created', 'success');
  } catch (err) {
    throw new Error(err);
  }

  try {
    // create base directories
    await createDirectories(appName, 'server', 'public');

    // copy public files
    // todo: update this so it works when npm installed
    await copyFiles(`${path}/source/boilerplate/public`, `${path}/${appName}/public`);

    log('Base files created', 'success');
  } catch (err) {
    throw new Error(err);
  }

  // getting user choices for DB, and adding chosen db to answers
  const answers = await userForms(appName);
  const db = answers.database.database;
  answers.database[db] = true;

  const serverFolders = ['routers', 'models', 'controllers', 'services', 'socket', 'event_handlers'];
  await createDirectories(`${appName}/server`, ...serverFolders);

  const structurePaths = Object.keys(structure);
  structurePaths.forEach((folder) => {
    structure[folder].forEach((file) => {
      const toWriteTo = `${path}/${appName}/${folder}/${file}`;
      const toWriteFrom = `${path}/source/boilerplate/${folder}/${file}.mustache`;
      createsFiles(answers, toWriteTo, toWriteFrom);
    });
  });

  // create package.json and required devs
  await createDevs(answers, appName, path);
}

module.exports = createBoilerplate;
