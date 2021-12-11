var __extractValue = function (value) {
  if (typeof value === 'object' && Array.isArray(value)) {
    return value[0];
  } else {
    return value;
  }
};

var __getNestedObject = function (obj, node) {
  if (!obj[node]) {
    var caretPos = node.indexOf('[');
    if (caretPos !== -1) {
      return obj[node.substring(0, caretPos - 1)] = [];
    } else {
      return obj[node] = {};
    }
  } else {
    return obj[node];
  }
};

var _addField = function (model, field, value) {
  var modified = false;
  if (field) {
    if (typeof model === 'object' && Array.isArray(model) && model.length > 0) {
      model = model[0];
    }
    if (field.indexOf('.') === -1) {
      model[field] = __extractValue(value);
      modified = true;
    } else {
      // build nested nodes in model
      var tree = field.split('.');
      var obj = __getNestedObject(model, tree[0]);
      for (var i = 1; i < tree.length; i++) {
        if (i === tree.length - 1) {
          obj[tree[i]] = __extractValue(value);
          modified = true;
        } else {
          obj = __getNestedObject(obj, tree[i]);
        }
      }
    }
  }
  return modified;
};

function _deepFind(obj, path) {
  var paths = path.split('/')
    , current = obj
    , i;

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
}

// async function dirExistsInPositionOfTree(dir, pos, tree, options) {

//   return _deepFind(tree, pos + '/' + dir) ? true : false;
// }

async function dirExistsInTree(dir, tree, options) {

  return _deepFind(tree, dir) ? true : false;
}

// async function addDirToPositionInTree(dir, pos, tree, options) {

//   if (dirExistsInTree(dir, pos, tree, options)) {
//     _addField(tree, pos + '/' + dir, {});
//     return true;
//   } else {
//     return false;
//   }
// }

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
        exists: await dirExistsInTree(dir, tree),
        path: dir
      }
    }
  }
  const dirNames = dir.split('/');
  var curPath = "", exists, output;

  for (const dirName of dirNames) {
    curPath += (dirName + '/');
    exists = await dirExistsInTree(curPath, tree);

    if (exists) {
      if (curPath !== parent) {
        continue;
      } else {
        output = {
          parent: {
            exists: true,
            path: parent
          },
          me: {
            exists: await dirExistsInTree(dir, tree),
            path: dir
          }
        }
      }
    } else {
      output = {
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
  return output;
}

module.exports = {

  dirExistsInTree: dirExistsInTree,
  // dirExistsInPositionOfTree: dirExistsInPositionOfTree,

  getDirInfo: getDirInfo,
  // parentsExistsInPositionOfTree: parentsExistsInPositionOfTree,

  // addDirToPositionInTree: addDirToPositionInTree
}