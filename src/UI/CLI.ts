import { Command } from 'commander';
import fs from 'fs';
import LoggingService from '../Logging/Service';

// UICli: User Interface - Command Line Interface
export default class CLI {

 static getArguments() {

  const program = new Command();
  program.version('0.0.1');

  // Command Line Interface arguments
  program
   .option('-f, --input-file <path>',
    'path to the file with commands. Overwrites the COMMAND_VALID_01 environment variable.',
    process.env.COMMAND_VALID_01)
   .option('-s, --setupFiles <jest>',
    "allow jest to load dotenv/config file. You don't need to edit this argument.");

  program.parse(process.argv);
  const args = program.opts();

  if (!fs.existsSync(args.inputFile)) {
   const err = { msg: process.env.ERR_INPUT_FILE_DOES_NOT_EXIST, inputFile: args.inputFile };
   LoggingService.error(err)
   throw err;
  }

  return args;
 }
}