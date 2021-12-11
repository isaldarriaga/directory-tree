const treeUtils = require('./tree-utils');

const cmd = "LIST";

async function execute(tree, options) {
  const cmdOutput = cmd + "\n";
  const treeOutput = treeUtils.format.getTreeAsString(tree);
  return cmdOutput + treeOutput;
}

module.exports = {
  execute: execute
}