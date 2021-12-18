import IStorage from "../../IStorage";

export default class MemoryReaderService {

 IStorage;
 constructor(IStorage: IStorage) {
  this.IStorage = IStorage;
 }

 get storage() {
  // enforce read-only from outside
  return JSON.parse(JSON.stringify(this.IStorage.storage));
 }

 async find(item: string): Promise<any> {
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