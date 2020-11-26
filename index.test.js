const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const createBoilerplate = require('./source/index.js');
const expectedFileStructure = require('./expectedFileStructure');

const testFolder = `${__dirname}/test`;
const callerPath = process.cwd();

const getAllFiles = (dirPath, arrayOfFiles) => {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    if (fs.statSync(`${dirPath}/${file}`).isDirectory() && file !== 'node_modules' && file !== '.git') {
      arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles);
    } else if (file !== 'node_modules' && file !== '.git') arrayOfFiles.push(path.join(file));
  });

  return arrayOfFiles;
};

const testsPass = async () => {
  try {
    process.chdir(testFolder);
    const put = shell.exec('npm run test');
    return !put.stderr.includes('ERR!');
  } catch (error) {
    return false;
  }
};

describe('Check that file structure is copied correctly', () => {
  beforeAll(() => createBoilerplate('test', callerPath, 'MongoDB'));
  afterAll((done) => {
    fs.rmdir(testFolder, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
      done();
    });
  });
  it('checks the files have been created with the correct structure', () => {
    expect(getAllFiles(testFolder)).toEqual(expect.arrayContaining(expectedFileStructure));
  });
  it('checks that the tests run after installation', () => testsPass()
    .then((result) => expect(result).toBe(true)));
});
