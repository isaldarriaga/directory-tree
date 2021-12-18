import IStorage from "../../Storage/IStorage";
import { NodeInfo } from "../Types";

export default class TreeReaderService {

 IStorage;

 constructor(IStorage: IStorage) {
  this.IStorage = IStorage;
 }

 get storage() {
  // enforce read-only from outside
  return JSON.parse(JSON.stringify(this.IStorage.storage));
 }

 async findNode(node: string) {
  return await this.IStorage.find(node);
 }

 async nodeExists(node: string) {
  const result = await this.findNode(node);
  if (result) {
   return true;
  }
  return false;
 }

 async nodeExistsInPosition(node: string, pos: string) {
  return await this.nodeExists(pos + '/' + node);
 }

 async getNodeInfo(node: string): Promise<NodeInfo> {

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
  return {
   parent: {
    exists: false,
    path: ''
   },
   me: {
    exists: false,
    path: ''
   },
   children: []
  }
 }

 // call it without arguments to print from root!
 async toString(tree?: any, level?: number) {

  tree = tree ? tree : this.storage; // a clone! (prevent mutation)
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
