const treeUtils = require('./tree-utils');

const cmd = "DELETE";

async function execute(dir, tree, options) {

 const info = await treeUtils.info.getDirInfo(dir, tree);
 var output = '';

 if (info.parent.exists) {
  output = cmd + ' ' + dir;
 } else {
  output = 'Cannot ' + cmd.toLowerCase() + ' ' + dir + ' - ' + info.parent.path + ' does not exist';
 }

 return output + '\n'
}

module.exports = {
 execute: execute
}