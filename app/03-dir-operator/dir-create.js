const utils = require('./utils');

const cmd = "CREATE";

async function execute(dir, pos, tree, options) {

  const info = await utils.getDirInfo(dir, tree);
  var output = '';

  if (info.parent.exists) {
    // TODO: add it to tree

    output = (pos ? cmd + ' ' + pos + '/' + dir : cmd + ' ' + dir);
  } else {
    output = 'Cannot ' + cmd.toLowerCase() + ' ' + dir + ' - ' + info.parent.path + ' does not exist';
  }

  return output + '\n';
}

module.exports = {
  execute: execute
}