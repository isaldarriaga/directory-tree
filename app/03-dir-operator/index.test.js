const { Console } = require('console');
const fs = require('fs');

// the program under test
require('dotenv').config();
const options = {
 logger: require('pino')({ level: process.env.DEBUG_LEVEL ? process.env.DEBUG_LEVEL : "info" })
}

describe('The dir-operator module', () => {

 test.skip("creates 100 dirs in the root directory", async () => {

  const validFile = process.env.DIR_OPERATOR_VALID_01;

  const fileParser = require('../02-file-parser');
  const commands = await fileParser.getCommands(validFile, options);

  const dirOperator = require('.');
  const received = await dirOperator.runCommands(commands, options);

  const expected = {
   msg: await fs.readFileSync(process.env.DIR_OPERATOR_EXPECTED_VALID_01, 'utf8'),
   tree: {
    prop: "level_1_100",
    length: 100
   }
  };

  console.log(received.msg);
  console.log(expected.msg);

  expect(received.msg).toBe(expected.msg);
  expect(received.tree).toHaveProperty(expected.tree.prop);
  expect(received.tree.length).toBe(expected.tree.length);

 });

 // test("create", async () => {

 //  const invalidCommandFile = process.env.DIR_OPERATOR_INVALID_01;

 //  process.argv.push('--input-file', invalidCommandFile);

 //  const dirOperator = require('.');

 //  expect.assertions(1);

 //  try {
 //   await dirOperator.runCommands(invalidCommandFile, options)
 //  } catch (e) {
 //   expect(e.msg).toBe(process.env.ERR_INPUT_FILE_HAS_INVALID_COMMAND);
 //  }

 // });

 // test("reject file with wrong number of arguments for command", async () => {

 //  const invalidNumArgsFile = process.env.DIR_OPERATOR_INVALID_02;

 //  process.argv.push('--input-file', invalidNumArgsFile);

 //  const dirOperator = require('.');

 //  expect.assertions(1);

 //  try {
 //   await dirOperator.runCommands(invalidNumArgsFile, options)
 //  } catch (e) {
 //   expect(e.msg).toBe(process.env.ERR_COMMAND_WITH_INVALID_NUM_ARGS);
 //  }

 // });

});
