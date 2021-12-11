const utils = require('./utils');

const cmd = "CREATE";

async function execute(dir, pos, tree, options) {

  var info = await utils.getDirInfo(pos ? pos + '/' + dir : dir, tree);
  var output = '';

  if (info.parent.exists) {
    if (!pos) {
      info = await utils.addDirToTree(dir, tree, options)
    } else {
      info = await utils.addDirToPositionInTree(dir, pos, tree, options);
    }
    output = cmd + ' ' + info.me.path;
  } else {
    output = 'Cannot ' + cmd.toLowerCase() + ' ' + dir + ' - ' + info.parent.path + ' does not exist';
  }

  return output + '\n';
}

module.exports = {
  execute: execute
}