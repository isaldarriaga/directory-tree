
async function _deepFind(dir, tree, options) {
 var dirs = dir.split('/')
  , current = tree
  , i;

 for (i = 0; i < dirs.length; ++i) {
  if (current[dirs[i]] == undefined) {
   return undefined;
  } else {
   current = current[dirs[i]];
  }
 }
 return current;
}

async function dirExistsInPositionOfTree(dir, pos, tree, options) {

 return await dirExistsInTree(pos + '/' + dir, tree, options);
}

async function dirExistsInTree(dir, tree, options) {
 const node = await getNodeFromTree(dir, tree, options);
 if (node) {
  return true;
 }
 return false;
}

async function getNodeFromTree(dir, tree, options) {

 return await _deepFind(dir, tree, options);
}

module.exports = {
 dirExistsInTree: dirExistsInTree,
 dirExistsInPositionOfTree: dirExistsInPositionOfTree,
 getNodeFromTree: getNodeFromTree
}