const Mustache = require('mustache');
const fs = require('fs');

const readFile = (path) => {
  try {
    return fs.readFileSync(path, 'utf8');
  } catch (err) {
    console.log(err);
    return false;
  }
};

const fromTemplate = (toWriteFrom, answers) => Mustache.render(readFile(toWriteFrom), answers);

exports.createsFiles = (answers, toWriteTo, toWriteFrom) => {
  fs.writeFileSync(toWriteTo, fromTemplate(toWriteFrom, answers));
};
// todo change it so works after npm
