const cliManager = require('./01-cli-manager')
const fileParser = require('./02-file-parser')
const dirOperator = require('./03-dir-operator')

async function run(options) {

 // measure time start
 hrStart = process.hrtime();

 const args = cliManager.getArguments(options);

 options.logger.debug({
  filename: __filename,
  function: arguments.callee.name,
  msg: 'arguments received',
  inputFile: args.inputFile
 });

 const commands = await fileParser.getCommands(args.inputFile, options);

 options.logger.debug({
  filename: __filename,
  function: arguments.callee.name,
  msg: 'commands parsed',
  commands: commands
 });

 const output = await dirOperator.runCommands(commands, options);

 options.logger.debug({
  filename: __filename,
  function: arguments.callee.name,
  msg: 'output received',
  output: output
 });

 // measure time end
 hrEnd = process.hrtime(hrStart);

 options.logger.trace({
  filename: __filename,
  function: arguments.callee.name,
  msg: 'app executed',
  timelapse: hrEnd[0].toFixed(1) + 's ' + (hrEnd[1] / 1000000).toFixed(1) + 'ms'
 });

 return output;

}

module.exports = {
 run: run
}