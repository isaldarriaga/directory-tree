import fs from 'fs';
import CLInterface from '../../src/UI/CLInterface.js';

describe('The CLInterface class', () => {

 let clInterface;

 beforeEach(() => {
  clInterface = new CLInterface();
 });

 test("accepts an input file that exist", async () => {

  const validFile = process.env.COMMAND_VALID_01;
  const validFileCopy = validFile + ".copy";

  if (!fs.existsSync(validFileCopy)) {
   fs.copyFileSync(validFile, validFileCopy);
  }

  process.argv.push('--input-file', validFileCopy);

  const args = clInterface.getArguments();

  if (fs.existsSync(validFileCopy)) {
   fs.unlinkSync(validFileCopy, '');
  }

  expect(args.inputFile).toBe(validFileCopy);

 });

 test("reject a file that doesn't exist", async () => {

  const inputFile = process.env.CLI_MANAGER_VALID_01 + ".rnd-" + Math.ceil(Math.random() * 1000);

  process.argv.push('--input-file', inputFile);

  expect.assertions(1);

  try {
   clInterface.getArguments();
  } catch (e) {
   expect(e.msg).toBe(process.env.ERR_INPUT_FILE_DOES_NOT_EXIST);
  }

 });

});
