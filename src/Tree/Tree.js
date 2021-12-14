import TreeModifierAdd from "./TreeModifierAdd";
import TreeModifierMove from "./TreeModifierMove";

export default class Tree {

 #IStorage;

 constructor(IStorage) {
  this.#IStorage = IStorage;
 }

 get tree() {
  // ensure read-only
  return JSON.parse(JSON.stringify(this.#IStorage.storage));
 }

 async addDirToPosition(dir, pos) {
  return new TreeModifierAdd(this.#IStorage.storage).addDirToPosition(dir, pos);
 }

 async addDir(dir) {
  return new TreeModifierAdd(this.#IStorage.storage).addDir(dir);
 }

 async copyDirToPosition(dir, pos) {
  return new TreeModifierCopy(this.#IStorage.storage).copyDirToPosition(dir, pos);
 }

 async delDirFromPosition(dir, pos) {
  return new TreeModifierDelete(this.#IStorage.storage).delDirFromPosition(dir, pos);
 }

 async delDir(dir) {
  return new TreeModifierDelete(this.#IStorage.storage).delDir(dir);
 }

 async moveDirToPosition(dir, pos) {
  return new TreeModifierMove(this.#IStorage.storage).moveDirToPosition(dir, pos);
 }

}
