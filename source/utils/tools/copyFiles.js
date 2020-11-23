const { copy } = require('fs-extra');

exports.copyFiles = async (prevPath, newPath) => {
  try {
    await copy(prevPath, newPath);
  } catch (err) {
    throw new Error(err);
  }
};
