const fs = require('fs');
const path = require('path');
const buildBoilerplate = require('./index.js');

const testFolder = `${__dirname}/test`;
const callerPath = process.cwd();

const getAllFiles = function (dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    if (fs.statSync(`${dirPath}/${file}`).isDirectory() && file !== 'node_modules' && file !== '.git') {
      arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(file));
    }
  });

  return arrayOfFiles;
};

let expectedFiles = ['.git',
  'node_modules',
  'package-lock.json',
  'package.json',
];

describe('Check that file structure is copied correctly', () => {
  beforeAll(() => {
    expectedFiles = getAllFiles(`${__dirname}/src`, expectedFiles);
    return buildBoilerplate('test', callerPath);
  });
  afterAll(() => fs.rmdir(testFolder, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  }));
  it('checks the files have been created', async () => expect(getAllFiles(testFolder)).toEqual(expectedFiles));
});
