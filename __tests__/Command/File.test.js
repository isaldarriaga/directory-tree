import CommandFile from "../../src/Command/File.js";

describe('The CommandFile object', () => {

 let commandFile;

 test("returns the array of commands from a command file", async () => {
  const inputFile = process.env.COMMAND_VALID_01;
  commandFile = new CommandFile(inputFile);

  const received = await commandFile.getCommands();
  const expected = [{ "cmd": "CREATE", "dir": "fruits" }, { "cmd": "CREATE", "dir": "vegetables" }, { "cmd": "CREATE", "dir": "grains" }, { "cmd": "CREATE", "dir": "apples", "pos": "fruits" }, { "cmd": "CREATE", "dir": "fuji", "pos": "fruits/apples" }, { "cmd": "LIST" }, { "cmd": "CREATE", "dir": "squash", "pos": "grains" }, { "cmd": "MOVE", "dir": "grains/squash", "pos": "vegetables" }, { "cmd": "CREATE", "dir": "foods" }, { "cmd": "MOVE", "dir": "grains", "pos": "foods" }, { "cmd": "MOVE", "dir": "fruits", "pos": "foods" }, { "cmd": "MOVE", "dir": "vegetables", "pos": "foods" }, { "cmd": "LIST" }, { "cmd": "DELETE", "dir": "fruits/apples" }, { "cmd": "DELETE", "dir": "foods/fruits/apples" }, { "cmd": "LIST" }];
  expect(received).toEqual(expected);
 });

 test("reject file with invalid command", async () => {

  const inputFile = process.env.COMMAND_INVALID_01;
  commandFile = new CommandFile(inputFile);

  expect.assertions(1);

  try {
   await commandFile.getCommands(inputFile)
  } catch (e) {
   expect(e.msg).toBe(process.env.ERR_USER_INPUT_HAS_INVALID_COMMAND);
  }

 });

 test("reject file with wrong number of arguments for command", async () => {

  const inputFile = process.env.COMMAND_INVALID_02;
  commandFile = new CommandFile(inputFile);

  expect.assertions(1);

  try {
   await commandFile.getCommands(inputFile)
  } catch (e) {
   expect(e.msg).toBe(process.env.ERR_COMMAND_WITH_INVALID_NUM_ARGS);
  }

 });

});