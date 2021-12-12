const treeInfo = require('./tree-info');
const treeFind = require('./tree-find');

async function copyDirToPositionInTree(dir, pos, tree, options) {
 const sourceNode = await treeFind.getNodeFromTree(dir, tree);
 const destinationNode = await treeFind.getNodeFromTree(pos, tree);
 const dirName = dir.substring(dir.lastIndexOf('/') + 1);
 destinationNode[dirName] = JSON.parse(JSON.stringify(sourceNode));
 return treeInfo.getDirInfo(pos + '/' + dir, tree, options);
}

module.exports = {
 copyDirToPositionInTree: copyDirToPositionInTree
}