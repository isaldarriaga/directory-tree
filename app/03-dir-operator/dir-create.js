const treeUtils = require('./tree-utils');

const cmd = "CREATE";

async function execute(dir, pos, tree, options) {

  var info = await treeUtils.info.getDirInfo(pos ? pos + '/' + dir : dir, tree);
  var output = '';

  if (info.parent.exists) {
    if (!pos) {
      info = await treeUtils.add.addDirToTree(dir, tree, options)
    } else {
      info = await treeUtils.add.addDirToPositionInTree(dir, pos, tree, options);
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