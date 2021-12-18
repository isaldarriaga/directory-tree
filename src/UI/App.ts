import { Output } from './Types';
import LoggingService from "../Logging/Service";
import CLI from "./CLI";
import CommandFile from "../Command/File";
import DirectoryController from "../Directory/Controller";
import DirectoryService from "../Directory/Service";

export default class App {
 constructor() { }
 async run(): Promise<Output> {

  const args = CLI.getArguments();

  LoggingService.debug({
   class: this.constructor.name,
   function: this.run.name,
   msg: 'arguments received',
   inputFile: args.inputFile
  });

  const commandFile = new CommandFile(args.inputFile);
  const commands = commandFile.getCommands();

  LoggingService.debug({
   class: this.constructor.name,
   function: this.run.name,
   msg: 'commands parsed',
   commands: commands
  });

  const directoryController = new DirectoryController(new DirectoryService());
  const output = await directoryController.runCommands(commands);

  LoggingService.debug({
   class: this.constructor.name,
   function: this.run.name,
   msg: 'output received',
   output: output
  });

  return output;

 }
}