const { program } = require('commander');
const fs = require('fs');

function getArguments(options) {

 program.version('0.0.1');

 // CLI options definition
 program
  .option('-f, --input-file <path>',
   'path to the file with commands. Overwrites the VALID_INPUT_FILE environment variable.',
   process.env.VALID_INPUT_FILE);

 // parse the CLI options into arguments
 program.parse(process.argv);
 const args = program.opts();

 if (!fs.existsSync(args.inputFile)) {
  const err = { msg: process.env.ERR_INPUT_FILE_DOES_NOT_EXIST, inputFile: args.inputFile };
  options.logger.error(err)
  throw err;
 }

 return args;
}

module.exports = {
 getArguments: getArguments
}