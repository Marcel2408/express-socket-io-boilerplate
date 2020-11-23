const shell = require('shelljs');

const createDirectories = async (parentDirectory, ...directoryList) => {
  try {
    process.chdir(parentDirectory);
    await shell.exec(`mkdir ${directoryList.join(' ')}`);
    process.chdir('..');
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = createDirectories;
