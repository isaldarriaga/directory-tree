import TreeReader from "./TreeReader";

export default class TreeModifierAdd extends TreeReader {

 constructor(tree) {
  super(tree);
 }

 async addDirToPosition(dir, pos) {
  return addDir(pos + '/' + dir);
 }

 async addDir(dir) {
  this.tree.addProperty(dir, {});
  return this.getDirInfo(dir);
 }

}
