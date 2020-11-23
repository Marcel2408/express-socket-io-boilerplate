// get user options for settings

module.exports = [
  {
    type: 'list',
    name: 'database',
    message: 'Choose a database: ',
    default: 'MongoDB',
    choices: ['MongoDB', 'PostgreSQL'],
  },
  {
    name: 'db_name',
    message: 'What is your database name?',
    default: '',
  },
];
