#!/usr/bin/env node

const process = require('process');
const createBoilerplate = require('../source/index.js');

// check passed arguments
const args = process.argv.splice(process.execArgv.length + 2);

// get path of directory where the script was called
const callerPath = process.cwd();

const appName = args.length > 0
  ? args.map((arg) => arg.toLowerCase()).join('_')
  : 'express-socket-io-boilerplate';

createBoilerplate(appName, callerPath);
