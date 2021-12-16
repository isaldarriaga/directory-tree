export default class MemoryReaderService {

 IStorage;
 constructor(IStorage) {
  this.IStorage = IStorage;
 }

 get storage() {
  // ensure read-only from outside
  return JSON.parse(JSON.stringify(this.IStorage.storage));
 }

 async find(item) {
  var items = item.split('/')
   , nodePointer = this.IStorage.storage
   , i;

  for (i = 0; i < items.length; ++i) {
   if (nodePointer[items[i]] == undefined) {
    return undefined;
   } else {
    nodePointer = nodePointer[items[i]];
   }
  }
  return nodePointer;
 }

}