export default class DirectoryController {

 directoryService;

 constructor(directoryService) {
  this.directoryService = directoryService;
 }

 async runCommands(commands) {
  // measure time start
  hrStart = process.hrtime();

  var msg = "", tree = {};

  for (const command of commands) {

   options.logger.debug({
    filename: __filename,
    function: arguments.callee.name,
    msg: 'command received',
    command: command
   });

   msg += await directoryService[command.cmd.toLowercase()](command.dir, command.pos);

  }

  options.logger.debug({
   filename: __filename,
   function: arguments.callee.name,
   msg: 'output received',
   output: msg
  });

  // measure time end
  hrEnd = process.hrtime(hrStart);

  options.logger.trace({
   filename: __filename,
   function: arguments.callee.name,
   msg: 'commands executed',
   timelapse: hrEnd[0].toFixed(1) + 's ' + (hrEnd[1] / 1000000).toFixed(1) + 'ms'
  });

  return {
   msg: msg,
   tree, tree
  }
 }

}