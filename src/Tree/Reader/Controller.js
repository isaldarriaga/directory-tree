export default class TreeReaderController {

 IStorage;

 constructor(IStorage) {
  this.IStorage = IStorage;
 }

 get storage() {
  // ensure read-only from outside
  return JSON.parse(JSON.stringify(this.IStorage.storage));
 }

 async findNode(node) {
  return await this.IStorage.find(node);
 }

 async nodeExists(node) {
  const result = await this.findNode(node);
  if (result) {
   return true;
  }
  return false;
 }

 async nodeExistsInPosition(node, pos) {
  return await this.nodeExists(pos + '/' + node);
 }

 async getNodeInfo(node) {

  const parent = node.substring(0, node.lastIndexOf('/'));
  const me = await this.findNode(node);
  const children = me ? Object.keys(me).sort((a, b) => a.localeCompare(b)) : [];

  if (parent.length === 0) {
   // we're on root
   return {
    parent: {
     exists: true,
     path: ''
    },
    me: {
     exists: await this.nodeExists(node),
     path: node
    },
    children: children
   }
  }
  const dirNames = node.split('/');
  var curDir = "", exists;

  for (const dirName of dirNames) {
   curDir += dirName;
   exists = await this.nodeExists(curDir);

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
       exists: await this.nodeExists(node),
       path: node
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
      path: node
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

  for (const node of siblings) {
   if (this.IStorage.utils.isEmpty(tree[node])) {
    output += spaces + node + '\n';
   } else {
    output += spaces + node + '\n' + await this.toString(tree[node], level + 1);
   }
  }
  return output;
 }

}
