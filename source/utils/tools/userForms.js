const inquirer = require('inquirer');
const databaseForm = require('../../forms/database.forms');
const { log, multicolor } = require('./logger');

const userForms = async () => {
  const options = {};

  try {
    multicolor('Database information required', 'attention');

    const database = await inquirer.prompt(databaseForm);
    options.database = database;

    return options;
  } catch (e) {
    multicolor('Error while running the configuration forms', 'error');
    throw new Error(e);
  }
};

module.exports = userForms;
