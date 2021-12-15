export default class MemoryReaderController {

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
   , current = this.IStorage.storage
   , i;

  for (i = 0; i < items.length; ++i) {
   if (current[items[i]] == undefined) {
    return undefined;
   } else {
    current = current[items[i]];
   }
  }
  return current;
 }

}