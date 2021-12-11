const { treeInfo, treeMove } = require('./tree-utils');

const cmd = "MOVE";

async function execute(dir, pos, tree, options) {

 var output = '';

 // get both dir (source) and pos (destination) concurrently
 // ready for extension with real I/O (remote / disk)
 let [infoDir, infoPos] = await Promise.all([
  await treeInfo.getDirInfo(dir, tree, options),
  await treeInfo.getDirInfo(pos, tree, options),
 ]);

 if (infoDir.me.exists && infoPos.me.exists) {
  const infoMovement = await treeMove.moveDirToPositionInTree(dir, pos, tree, options);
  if (!infoMovement.source.exists && infoMovement.destination.exists) {
   output = cmd + ' ' + infoMovement.source.path + ' ' + pos;
  } else {
   output = cmd + ' ' + dir + ' ' + pos + '\n';
   output += "Cannot " + cmd.toLowerCase() + ' ' + dir + ' to ' + pos + '. Info available: ' + JSON.stringify(infoMovement);
  }
 } else {
  output = cmd + ' ' + dir + ' ' + pos + '\n';
  output += 'Cannot ' + cmd.toLowerCase() + ' ' + dir + ' - ' + (!infoDir.me.exists ? infoDir.me.path : infoDir.parent.path) + ' does not exist';
 }

 return output + '\n';
}

module.exports = {
 execute: execute
}