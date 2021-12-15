import TreeReader from "./Reader";

export default class TreeWriter extends TreeReader {

 constructor(IStorage) {
  super(IStorage);
 }

 async addDirToPosition(dir, pos) {
  return addDir(pos + '/' + dir);
 }

 async addDir(dir) {
  this.IStorage.add(dir, {});
  return this.getDirInfo(dir);
 }

 async copyDirToPosition(dir, pos) {
  const sourceNode = await this.findDir(dir);
  const destinationNode = await this.findDir(pos);
  const dirName = dir.substring(dir.lastIndexOf('/') + 1);
  destinationNode[dirName] = JSON.parse(JSON.stringify(sourceNode));
  return this.getDirInfo(pos + '/' + dir);
 }

 async delDirFromPosition(dir, pos) {
  return this.delDir(pos + '/' + dir);
 }

 async delDir(dir) {
  this.IStorage.del(dir);
  return this.getDirInfo(dir);
 }

 async moveDirToPosition(dir, pos) {

  var infoBefore = await this.getDirInfo(dir);

  const dirName = dir.substring(dir.lastIndexOf('/') + 1);

  var infoAfter;
  if (infoBefore.children.length > 0) {
   // copy the object recursively
   infoAfter = await this.copyDirToPosition(dir, pos);
  } else {
   // just create it
   infoAfter = await this.addDirToPosition(dirName, pos);
  }

  if (infoAfter.me.exists) {
   this.delDir(dir);
  }

  let [infoSource, infoDestination] = await Promise.all([
   await this.getDirInfo(dir),
   await this.getDirInfo(pos + '/' + dirName),
  ]);

  return {
   source: infoSource.me,
   destination: infoDestination.me
  };
 }

}
