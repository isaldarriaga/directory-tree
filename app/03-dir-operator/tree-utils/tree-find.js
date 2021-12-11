
function _deepFind(tree, dir) {
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

  return dirExistsInTree(pos + '/' + dir, tree);
}

async function dirExistsInTree(dir, tree, options) {

  const value = _deepFind(tree, dir);
  if (value) {
    return true;
  }
  return false;
}

module.exports = {
  dirExistsInTree: dirExistsInTree,
  dirExistsInPositionOfTree: dirExistsInPositionOfTree
}