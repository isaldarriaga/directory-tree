const fs = require('fs');

// the program under test
require('dotenv').config();
const options = {
 logger: require('pino')({ level: process.env.DEBUG_LEVEL ? process.env.DEBUG_LEVEL : "info" })
}

describe('The cli-manager module', () => {

 test("accepts an input file that exist", async () => {

  const validFile = process.env.CLI_MANAGER_VALID_01;
  const validFileCopy = validFile + ".copy";

  if (!fs.existsSync(validFileCopy)) {
   fs.copyFileSync(validFile, validFileCopy);
  }

  process.argv.push('--input-file', validFileCopy);

  const cliManager = require('.');
  const args = cliManager.getArguments(options);

  if (fs.existsSync(validFileCopy)) {
   fs.unlinkSync(validFileCopy, '');
  }

  expect(args.inputFile).toBe(validFileCopy);

 });

 test("reject a file that doesn't exist", async () => {

  const unexistingFile = process.env.CLI_MANAGER_VALID_01 + ".rnd-" + Math.ceil(Math.random() * 1000);

  process.argv.push('--input-file', unexistingFile);

  const cli = require('.');

  expect.assertions(1);

  try {
   cli.getArguments(options);
  } catch (e) {
   expect(e.msg).toBe(process.env.ERR_INPUT_FILE_DOES_NOT_EXIST);
  }

 });

});
