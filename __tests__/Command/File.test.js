import CommandFile from "../../src/Command/File.js";

require('dotenv').config();

describe('The CommandFile object', () => {

 let commandFile;

 beforeEach(() => {
  const inputFile = process.env.COMMAND_VALID_01;
  commandFile = new CommandFile(inputFile);
 });

 test("returns the array of commands from a command file", async () => {
  const received = await commandFile.getCommands();
  const expected = [{ "cmd": "CREATE", "dir": "fruits" }, { "cmd": "CREATE", "dir": "vegetables" }, { "cmd": "CREATE", "dir": "grains" }, { "cmd": "CREATE", "dir": "apples", "pos": "fruits" }, { "cmd": "CREATE", "dir": "fuji", "pos": "fruits/apples" }, { "cmd": "LIST" }, { "cmd": "CREATE", "dir": "squash", "pos": "grains" }, { "cmd": "MOVE", "dir": "grains/squash", "pos": "vegetables" }, { "cmd": "CREATE", "dir": "foods" }, { "cmd": "MOVE", "dir": "grains", "pos": "foods" }, { "cmd": "MOVE", "dir": "fruits", "pos": "foods" }, { "cmd": "MOVE", "dir": "vegetables", "pos": "foods" }, { "cmd": "LIST" }, { "cmd": "DELETE", "dir": "fruits/apples" }, { "cmd": "DELETE", "dir": "foods/fruits/apples" }, { "cmd": "LIST" }];
  expect(received).toEqual(expected);
 });

});