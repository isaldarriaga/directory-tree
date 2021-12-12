const { treeInfo, treeDelete } = require('../04-tree-utils');

const cmd = "DELETE";

async function execute(dir, tree, options) {

 var info = await treeInfo.getDirInfo(dir, tree);
 var output = '';

 if (info.parent.exists) {
  info = await treeDelete.delDirFromTree(dir, tree, options)
  output = cmd + ' ' + info.me.path;
 } else {
  output = cmd + ' ' + dir + '\n';
  output += 'Cannot ' + cmd.toLowerCase() + ' ' + dir + ' - ' + info.parent.path + ' does not exist';
 }

 return output + '\n'
}

module.exports = {
 execute: execute
}