
function _isEmptyObject(obj) {
 return obj // 👈 null and undefined check
  && Object.keys(obj).length === 0
  && Object.getPrototypeOf(obj) === Object.prototype;
}

function getTreeAsString(tree, level) {

 level = level ? level : 0;
 var output = new Array(2 * level + 1).join(' ');

 // sort children
 const children = Object.keys(tree).sort((a, b) => a.localeCompare(b));

 for (const dir of children) {
  if (_isEmptyObject(tree[dir])) {
   output += dir + '\n';
  } else {
   output += dir + '\n' + getTreeAsString(tree[dir], ++level);
  }
 }
 return output;
}

module.exports = {
 getTreeAsString: getTreeAsString
}