const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const createBoilerplate = require('./source/index.js');

const testFolder = `${__dirname}/test`;
const callerPath = process.cwd();

// const getAllFiles = function (dirPath, arrayOfFiles) {
//   const files = fs.readdirSync(dirPath);

//   arrayOfFiles = arrayOfFiles || [];

//   files.forEach((file) => {
//     if (fs.statSync(`${dirPath}/${file}`).isDirectory() && file !== 'node_modules' && file !== '.git') {
//       arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles);
//     } else {
//       arrayOfFiles.push(path.join(file));
//     }
//   });

//   return arrayOfFiles;
// };

// let expectedFiles = ['.git',
//   'node_modules',
//   'package-lock.json',
//   'package.json',
// ];

async function testsPass() {
  try {
    await process.chdir(testFolder);
    const shellCommand = await shell.exec('npm run test');
    console.log(shellCommand);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

describe('Check that file structure is copied correctly', () => {
  beforeAll(() => createBoilerplate('test', callerPath));
  // expectedFiles = getAllFiles(`${__dirname}/src`, expectedFiles);
  afterAll(() => fs.rmdir(testFolder, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  }));
  // it('checks the files have been created', async () => expect(getAllFiles(testFolder)).toEqual(expectedFiles));
  it('checks that the tests run after installation', () => expect(testsPass()).toBe(true));
});
