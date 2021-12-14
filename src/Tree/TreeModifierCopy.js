import TreeReader from "./TreeReader";

export default class TreeModifierCopy extends TreeModifierAdd {

 constructor(tree) {
  super(tree);
 }

 async copyDirToPosition(dir, pos) {
  const sourceNode = await this.findDir(dir);
  const destinationNode = await this.findDir(pos);
  const dirName = dir.substring(dir.lastIndexOf('/') + 1);
  destinationNode[dirName] = JSON.parse(JSON.stringify(sourceNode));
  return this.getDirInfo(pos + '/' + dir);
 }

}
