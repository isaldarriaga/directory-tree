const { Console } = require('console');
const fs = require('fs');

// the program under test
require('dotenv').config();
const options = {
 logger: require('pino')({ level: process.env.DEBUG_LEVEL ? process.env.DEBUG_LEVEL : "info" })
}

describe('The dir-operator module', () => {

 test("creates 100 dirs in the root directory", async () => {

  const inputFile = process.env.DIR_OPERATOR_VALID_01;

  const fileParser = require('../02-file-parser');
  const commands = await fileParser.getCommands(inputFile, options);

  const dirOperator = require('.');
  const received = await dirOperator.runCommands(commands, options);

  const expected = {
   msg: await fs.readFileSync(process.env.DIR_OPERATOR_EXPECTED_VALID_01, 'utf8'),
   tree: {
    prop: "level_1_100",
    length: 100
   }
  };

  expect(received.msg).toBe(expected.msg);
  expect(received.tree).toHaveProperty(expected.tree.prop);
  expect(Object.keys(received.tree).length).toBe(expected.tree.length);

 });

 test("create a second level dir with 2 valid commands", async () => {

  const inputFile = process.env.DIR_OPERATOR_VALID_02;

  const fileParser = require('../02-file-parser');
  const commands = await fileParser.getCommands(inputFile, options);

  const dirOperator = require('.');
  const received = await dirOperator.runCommands(commands, options);

  const expected = {
   msg: await fs.readFileSync(process.env.DIR_OPERATOR_EXPECTED_VALID_02, 'utf8'),
   tree: {
    level_1_1: {
     level_2_1: {}
    }
   }
  };

  expect(received.msg).toBe(expected.msg);
  expect(JSON.stringify(received.tree)).toBe(JSON.stringify(expected.tree));
 });

 test("reject a second level dir if 1st level doesn't exist", async () => {

  const inputFile = process.env.DIR_OPERATOR_INVALID_01;

  const fileParser = require('../02-file-parser');
  const commands = await fileParser.getCommands(inputFile, options);

  const dirOperator = require('.');
  const received = await dirOperator.runCommands(commands, options);

  const expected = {
   msg: await fs.readFileSync(process.env.DIR_OPERATOR_EXPECTED_INVALID_01, 'utf8'),
   tree: {}
  };

  expect(received.msg).toBe(expected.msg);
  expect(JSON.stringify(received.tree)).toBe(JSON.stringify(expected.tree));

 });

});
