const treeInfo = require('./tree-info');
const treeAdd = require('./tree-add');
const treeCopy = require('./tree-copy');
const treeDelete = require('./tree-delete');

async function moveDirToPositionInTree(dir, pos, tree, options) {

 var info = await treeInfo.getDirInfo(dir, tree, options);

 const dirName = dir.substring(dir.lastIndexOf('/') + 1);

 if (info.children.length > 0) {
  // copy the object recursively
  info = await treeCopy.copyDirToPositionInTree(dir, pos, tree, options);
 } else {
  // just create it
  info = await treeAdd.addDirToPositionInTree(dirName, pos, tree, options);
 }

 if (info.me.exists) {
  treeDelete.delDirFromTree(dir, tree, options);
 }

 let [infoSource, infoDestination] = await Promise.all([
  await treeInfo.getDirInfo(dir, tree, options),
  await treeInfo.getDirInfo(pos + '/' + dirName, tree, options),
 ]);

 return {
  source: infoSource.me,
  destination: infoDestination.me
 };
}

async function moveDirInTree(dir, tree, options) {

}

module.exports = {
 moveDirToPositionInTree: moveDirToPositionInTree
}