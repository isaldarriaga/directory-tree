export default class TreeReader {

 IStorage;

 constructor(IStorage) {
  this.IStorage = IStorage;
 }

 get storage() {
  // ensure read-only from outside
  return JSON.parse(JSON.stringify(this.IStorage.storage));
 }

 async findDir(dir) {
  return await this.IStorage.find(dir);
 }

 async dirExists(dir) {
  const node = await this.findDir(dir);
  if (node) {
   return true;
  }
  return false;
 }

 async dirExistsInPosition(dir, pos) {
  return await this.dirExists(pos + '/' + dir);
 }

 async getDirInfo(dir) {

  const parent = dir.substring(0, dir.lastIndexOf('/'));
  const me = await this.findDir(dir);
  const children = me ? Object.keys(me).sort((a, b) => a.localeCompare(b)) : [];

  if (parent.length === 0) {
   // we're on root
   return {
    parent: {
     exists: true,
     path: ''
    },
    me: {
     exists: await this.dirExists(dir),
     path: dir
    },
    children: children
   }
  }
  const dirNames = dir.split('/');
  var curDir = "", exists;

  for (const dirName of dirNames) {
   curDir += dirName;
   exists = await this.dirExists(curDir);

   if (exists) {
    if (curDir !== parent) {
     curDir += '/';
     continue;
    } else {
     return {
      parent: {
       exists: true,
       path: parent
      },
      me: {
       exists: await this.dirExists(dir),
       path: dir
      },
      children: children
     }
    }
   } else {
    return {
     parent: {
      exists: false,
      path: parent
     },
     me: {
      exists: false,
      path: dir
     },
     children: children
    }
   }
  }
 }

 // call it without arguments to print from root!
 async toString(tree, level) {

  tree = tree ? tree : this.IStorage.storage;
  level = level ? level : 0;

  const spaces = new Array(2 * level + 1).join(' ');
  var output = '';

  // sort names alphabetically
  const siblings = Object.keys(tree).sort((a, b) => a.localeCompare(b));

  for (const dir of siblings) {
   if (this.IStorage.utils.isEmpty(tree[dir])) {
    output += spaces + dir + '\n';
   } else {
    output += spaces + dir + '\n' + await this.toString(tree[dir], level + 1);
   }
  }
  return output;
 }

}
