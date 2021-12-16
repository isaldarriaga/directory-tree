import CommandString from "./src/Command/String.js";

export default class Directories {
 async main() {

  const userInput = `CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
DELETE fruits/apples
DELETE foods/fruits/apples
LIST
`;
  let commandString = new CommandString(userInput);

  const received = await commandString.getCommands();
  const expected = [{ "cmd": "CREATE", "dir": "fruits" }, { "cmd": "CREATE", "dir": "vegetables" }, { "cmd": "CREATE", "dir": "grains" }, { "cmd": "CREATE", "dir": "apples", "pos": "fruits" }, { "cmd": "CREATE", "dir": "fuji", "pos": "fruits/apples" }, { "cmd": "LIST" }, { "cmd": "CREATE", "dir": "squash", "pos": "grains" }, { "cmd": "MOVE", "dir": "grains/squash", "pos": "vegetables" }, { "cmd": "CREATE", "dir": "foods" }, { "cmd": "MOVE", "dir": "grains", "pos": "foods" }, { "cmd": "MOVE", "dir": "fruits", "pos": "foods" }, { "cmd": "MOVE", "dir": "vegetables", "pos": "foods" }, { "cmd": "LIST" }, { "cmd": "DELETE", "dir": "fruits/apples" }, { "cmd": "DELETE", "dir": "foods/fruits/apples" }, { "cmd": "LIST" }];

  console.log(received);
  console.log(expected);

  throw new Error('Not implemented yet => run "npm test"');

 }
}

new Directories().main().catch((err) => {
 console.error(err);
 process.exit(1);
})

