import commander from 'commander';
import fs from 'fs';
import LoggingService from '../Logging/Service';

export default class CLInterface {

 getArguments() {

  commander.version('0.0.1');

  // Command Line Interface arguments
  commander
   .option('-f, --input-file <path>',
    'path to the file with commands. Overwrites the COMMAND_VALID_01 environment variable.',
    process.env.COMMAND_VALID_01);

  commander.parse(process.argv);
  const args = commander.opts();

  if (!fs.existsSync(args.inputFile)) {
   const err = { msg: process.env.ERR_INPUT_FILE_DOES_NOT_EXIST, inputFile: args.inputFile };
   LoggingService.error(err)
   throw err;
  }

  return args;
 }
}