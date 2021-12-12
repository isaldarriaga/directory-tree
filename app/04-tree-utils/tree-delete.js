const treeInfo = require('./tree-info');
const treeNesting = require('./tree-nesting');

var _delField = function (dir, tree, options) {
 var modified = false;
 if (dir) {
  if (typeof tree === 'object' && Array.isArray(tree) && tree.length > 0) {
   tree = tree[0];
  }
  if (dir.indexOf('/') === -1) {
   delete tree[dir];
   modified = true;
  } else {
   // build nested nodes in model
   var dirNames = dir.split('/');
   var dirObject = treeNesting.getNestedObject(dirNames[0], tree);
   for (var i = 1; i < dirNames.length; i++) {
    if (i === dirNames.length - 1) {
     delete dirObject[dirNames[i]];
     modified = true;
    } else {
     dirObject = treeNesting.getNestedObject(dirNames[i], dirObject);
    }
   }
  }
 }
 return modified;
};


async function delDirFromPositionInTree(dir, pos, tree, options) {
 return delDirFromTree(pos + '/' + dir, tree, options);
}

async function delDirFromTree(dir, tree, options) {
 _delField(dir, tree, options);
 return treeInfo.getDirInfo(dir, tree, options);
}

module.exports = {
 delDirFromPositionInTree: delDirFromPositionInTree,
 delDirFromTree: delDirFromTree
}