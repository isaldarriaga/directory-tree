const treeInfo = require('./tree-info');
const treeNesting = require('./tree-nesting');

var __extractValue = function (value) {
 if (typeof value === 'object' && Array.isArray(value)) {
  return value[0];
 } else {
  return value;
 }
};

var _addField = function (tree, dir, value) {
 var modified = false;
 if (dir) {
  if (typeof tree === 'object' && Array.isArray(tree) && tree.length > 0) {
   tree = tree[0];
  }
  if (dir.indexOf('/') === -1) {
   tree[dir] = __extractValue(value);
   modified = true;
  } else {
   // build nested nodes in model
   var dirNames = dir.split('/');
   var dirObject = treeNesting.getNestedObject(tree, dirNames[0]);
   for (var i = 1; i < dirNames.length; i++) {
    if (i === dirNames.length - 1) {
     dirObject[dirNames[i]] = __extractValue(value);
     modified = true;
    } else {
     dirObject = treeNesting.getNestedObject(dirObject, dirNames[i]);
    }
   }
  }
 }
 return modified;
};


async function addDirToPositionInTree(dir, pos, tree, options) {

 return addDirToTree(pos + '/' + dir, tree, options);
}

async function addDirToTree(dir, tree, options) {

 _addField(tree, dir, {});
 return treeInfo.getDirInfo(dir, tree, options);
}

module.exports = {
 addDirToPositionInTree: addDirToPositionInTree,
 addDirToTree: addDirToTree
}