import LoggingService from "../Logging/Service.js";
export default class DirectoryController {

 directoryService;

 constructor(directoryService) {
  this.directoryService = directoryService;
 }

 async runCommands(commands) {
  // measure time start
  const hrStart = process.hrtime();

  var msg = "", tree = {};

  for (const command of commands) {

   LoggingService.debug({
    class: this.constructor.name,
    function: this.runCommands.name,
    msg: 'command received',
    command: command
   });

   msg += await this.directoryService[command.cmd.toLowerCase()](command.dir, command.pos);

  }

  LoggingService.debug({
   class: this.constructor.name,
   function: this.runCommands.name,
   msg: 'output received',
   output: msg
  });

  // measure time end
  const hrEnd = process.hrtime(hrStart);
  const timelapse = {
   duration: hrEnd[0].toFixed(1) + 's ' + (hrEnd[1] / 1000000).toFixed(1) + 'ms',
   seconds: (hrEnd[0] + hrEnd[1] / Math.pow(10, 9))
  };

  LoggingService.trace({
   class: this.constructor.name,
   function: this.runCommands.name,
   msg: 'commands executed',
   timelapse: timelapse
  });

  return {
   msg: msg,
   tree, tree,
   timelapse: timelapse
  }
 }

}