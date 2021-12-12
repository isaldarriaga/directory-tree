
function _isEmptyObject(obj) {
 return obj // 👈 null and undefined check
  && Object.keys(obj).length === 0
  && Object.getPrototypeOf(obj) === Object.prototype;
}

function getTreeAsString(tree, level) {

 level = level ? level : 0;
 const spaces = new Array(2 * level + 1).join(' ');
 var output = '';

 // sort names alphabetically
 const siblings = Object.keys(tree).sort((a, b) => a.localeCompare(b));

 for (const dir of siblings) {
  if (_isEmptyObject(tree[dir])) {
   output += spaces + dir + '\n';
  } else {
   output += spaces + dir + '\n' + getTreeAsString(tree[dir], level + 1);
  }
 }
 return output;
}

module.exports = {
 getTreeAsString: getTreeAsString
}