const createDir = require('./dir-create')
const listDir = require('./dir-list')
const moveDir = require('./dir-move')
const deleteDir = require('./dir-delete')

async function runCommands(commands, options) {

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

  switch (command.cmd) {
   case "CREATE":
    msg += await createDir.execute(command.dir, command.pos, tree, options);
    break;
   case "DELETE":
    msg += await deleteDir.execute(command.dir, tree, options);
    break;
   case "LIST":
    msg += await listDir.execute(tree, options);
    break;
   case "MOVE":
    msg += await moveDir.execute(command.dir, command.pos, tree, options);
    break;
  }
 }

 // msg = msg.endsWith('\n') ? msg.substring(0, msg.length - 1) : msg;

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

module.exports = {
 runCommands: runCommands
}