const { treeInfo, treeAdd } = require('../04-tree-utils');

const cmd = "CREATE";

async function execute(dir, pos, tree, options) {

 var info = await treeInfo.getDirInfo(pos ? pos + '/' + dir : dir, tree);
 var output = '';

 if (info.parent.exists) {
  if (!pos) {
   info = await treeAdd.addDirToTree(dir, tree, options)
  } else {
   info = await treeAdd.addDirToPositionInTree(dir, pos, tree, options);
  }
  output = cmd + ' ' + info.me.path;
 } else {
  output = cmd + ' ' + pos + '/' + dir + '\n';
  output += 'Cannot ' + cmd.toLowerCase() + ' ' + pos + '/' + dir + ' - ' + info.parent.path + ' does not exist';
 }

 return output + '\n';
}

module.exports = {
 execute: execute
}