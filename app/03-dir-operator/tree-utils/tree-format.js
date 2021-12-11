
function getTreeAsString(tree) {

  var output = "";

  for (const dir in tree) {
    if (tree[dir] === {}) {
      output += dir + '\n';
    } else {
      output += dir + '\n  ' + getTreeAsString(tree[dir]);
    }
  }
  return output;
}

module.exports = {
  getTreeAsString: getTreeAsString
}