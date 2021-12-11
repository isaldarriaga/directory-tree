const cmd = "MOVE";

async function execute(dir, pos, tree, options) {
 return cmd + ' ' + dir + ' ' + pos + "\n";
}

module.exports = {
 execute: execute
}