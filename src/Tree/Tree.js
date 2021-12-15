import TreeReader from "./Reader";
import TreeWriter from "./Writer";

export default class Tree {

 IStorage;

 constructor(IStorage) {
  this.IStorage = IStorage;
 }

 get storage() {
  // ensure read-only
  return JSON.parse(JSON.stringify(this.IStorage.storage));
 }

 async findDir(dir) {
  const treeReader = new TreeReader(this.IStorage);
  return await treeReader.findDir(dir);
 }

 async dirExists(dir) {
  const treeReader = new TreeReader(this.IStorage);
  return await treeReader.dirExists(dir);
 }

 async dirExistsInPosition(dir, pos) {
  const treeReader = new TreeReader(this.IStorage);
  return await treeReader.dirExistsInPosition(dir, pos);
 }

 async getDirInfo(dir) {
  const treeReader = new TreeReader(this.IStorage);
  return await treeReader.getDirInfo(dir);
 }

 async toString() {
  const treeReader = new TreeReader(this.IStorage);
  return await treeReader.toString();
 }

 async addDirToPosition(dir, pos) {
  const treeWriter = new TreeWriter(this.IStorage);
  return await treeWriter.addDirToPosition(dir, pos);
 }

 async addDir(dir) {
  const treeWriter = new TreeWriter(this.IStorage);
  return await treeWriter.addDir(dir);
 }

 async copyDirToPosition(dir, pos) {
  const treeWriter = new TreeWriter(this.IStorage);
  return await treeWriter.copyDirToPosition(dir, pos);
 }

 async delDirFromPosition(dir, pos) {
  const treeWriter = new TreeWriter(this.IStorage);
  return await treeWriter.delDirFromPosition(dir, pos);
 }

 async delDir(dir) {
  const treeWriter = new TreeWriter(this.IStorage);
  return await treeWriter.delDir(dir);
 }

 async moveDirToPosition(dir, pos) {
  const treeWriter = new TreeWriter(this.IStorage);
  return await treeWriter.moveDirToPosition(dir, pos);
 }

}
