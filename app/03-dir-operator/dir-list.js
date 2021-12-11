const { treeFormat } = require('./tree-utils');

const cmd = "LIST";

async function execute(tree, options) {
 const cmdOutput = cmd + "\n";
 const treeOutput = await treeFormat.getTreeAsString(tree);
 return cmdOutput + treeOutput;
}

module.exports = {
 execute: execute
}