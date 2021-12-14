import TreeModifierDelete from "./TreeModifierDelete";

export default class TreeModifierMove extends TreeModifierDelete {

 // note: inheriting from TreeModifierDelete brings all methods
 // from TreeModifierAdd and TreeModifierCopy too

 constructor(tree) {
  super(tree);
 }

 async moveDirToPosition(dir, pos) {

  var info = await this.getDirInfo(dir);

  const dirName = dir.substring(dir.lastIndexOf('/') + 1);

  if (info.children.length > 0) {
   // copy the object recursively
   info = await this.copyDirToPosition(dir, pos);
  } else {
   // just create it
   info = await this.addDirToPosition(dirName, pos);
  }

  if (info.me.exists) {
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
