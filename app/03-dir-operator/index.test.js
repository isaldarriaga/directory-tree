const fs = require('fs');

// the program under test
require('dotenv').config();
const options = {
 logger: require('pino')({ level: process.env.DEBUG_LEVEL ? process.env.DEBUG_LEVEL : "info" })
}

describe('The dir-operator module', () => {

 test("creates 100 dirs in the root directory", async () => {

  const validFile = process.env.DIR_OPERATOR_VALID_01;

  const fileParser = require('.');
  const commands = JSON.stringify(await fileParser.getCommands(validFile, options));

  const expected = await fs.readFileSync(process.env.DIR_OPERATOR_EXPECTED_VALID_01, 'utf8')

  expect(commands).toBe(expected);

 });

 test("create", async () => {

  const invalidCommandFile = process.env.DIR_OPERATOR_INVALID_01;

  process.argv.push('--input-file', invalidCommandFile);

  const fileParser = require('.');

  expect.assertions(1);

  try {
   await fileParser.getCommands(invalidCommandFile, options)
  } catch (e) {
   expect(e.msg).toBe(process.env.ERR_INPUT_FILE_HAS_INVALID_COMMAND);
  }

 });

 test("reject file with wrong number of arguments for command", async () => {

  const invalidNumArgsFile = process.env.DIR_OPERATOR_INVALID_02;

  process.argv.push('--input-file', invalidNumArgsFile);

  const fileParser = require('.');

  expect.assertions(1);

  try {
   await fileParser.getCommands(invalidNumArgsFile, options)
  } catch (e) {
   expect(e.msg).toBe(process.env.ERR_COMMAND_WITH_INVALID_NUM_ARGS);
  }

 });

});
