import TreeReader from "./TreeReader";

export default class TreeModifierDelete extends TreeReader {

 constructor(tree) {
  super(tree);
 }

 async delDirFromPosition(dir, pos) {
  return this.delDir(pos + '/' + dir);
 }

 async delDir(dir) {
  this.tree.delProperty(dir);
  return this.getDirInfo(dir);
 }

}
