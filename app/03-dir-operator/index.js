const createDir = require('./dir-create')
const listDir = require('./dir-list')
const moveDir = require('./dir-move')
const deleteDir = require('./dir-delete')

async function runCommands(commands, options) {

  // measure time start
  hrStart = process.hrtime();

  var output = "", tree = {};

  for (const command of commands) {

    switch (command.cmd) {
      case "CREATE":
        output += await createDir.execute(command.dir, command.pos, tree, options);
        break;
      case "DELETE":
        output += await deleteDir.execute(command.dir, tree, options);
        break;
      case "LIST":
        output += await listDir.execute(tree, options);
        break;
      case "MOVE":
        output += await moveDir.execute(command.dir, command.pos, tree, options);
        break;
    }
  }

  // measure time end
  hrEnd = process.hrtime(hrStart);

  options.logger.trace({
    filename: __filename,
    function: arguments.callee.name,
    msg: 'commands executed',
    timelapse: hrEnd[0].toFixed(1) + 's ' + (hrEnd[1] / 1000000).toFixed(1) + 'ms'
  });

  return output;

}

module.exports = {
  runCommands: runCommands
}