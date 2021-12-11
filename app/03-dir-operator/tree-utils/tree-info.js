const treeFind = require('./tree-find')

async function getDirInfo(dir, tree, options) {

  const parent = dir.substring(0, dir.lastIndexOf('/'));
  if (parent.length === 0) {
    // we're on root
    return {
      parent: {
        exists: true,
        path: ''
      },
      me: {
        exists: await treeFind.dirExistsInTree(dir, tree),
        path: dir
      }
    }
  }
  const dirNames = dir.split('/');
  var curPath = "", exists, output;

  for (const dirName of dirNames) {
    curPath += dirName;
    exists = await treeFind.dirExistsInTree(curPath, tree);

    if (exists) {
      if (curPath !== parent) {
        curPath += '/';
        continue;
      } else {
        return {
          parent: {
            exists: true,
            path: parent
          },
          me: {
            exists: await treeFind.dirExistsInTree(dir, tree),
            path: dir
          }
        }
      }
    } else {
      return {
        parent: {
          exists: false,
          path: parent
        },
        me: {
          exists: false,
          path: dir
        }
      }
    }
  }
}

module.exports = {
  getDirInfo: getDirInfo
}