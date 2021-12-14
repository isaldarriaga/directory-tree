import TreeModifierMove from "./TreeModifierMove";

export default class Tree extends TreeModifierMove {

 constructor(tree) {
  super(tree);
 }

 async addDirToPosition(dir, pos) {
  return super.addDirToPosition(dir, pos);
 }

 async addDir(dir) {
  return super.addDir(dir);
 }

 async copyDirToPosition(dir, pos) {
  return super.copyDirToPosition(dir, pos);
 }

 async delDirFromPosition(dir, pos) {
  return super.delDirFromPosition(dir, pos);
 }

 async delDir(dir) {
  return super.delDir(dir);
 }

 async moveDirToPosition(dir, pos) {
  return super.moveDirToPosition(dir, pos);
 }

}
