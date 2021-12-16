export default class MemoryWriterService {

 IStorage;

 constructor(IStorage) {
  this.IStorage = IStorage;
 }

 get storage() {
  // ensure read-only from outside
  return JSON.parse(JSON.stringify(this.IStorage.storage));
 }

 add(item, value) {
  var modified = false;
  if (item) {
   if (typeof this.IStorage.storage === 'object' && Array.isArray(this.IStorage.storage) && this.IStorage.storage.length > 0) {
    this.IStorage.storage = this.IStorage.storage[0];
   }
   if (item.indexOf('/') === -1) {
    this.IStorage.storage[item] = this.IStorage.utils.getValueSafely(value);
    modified = true;
   } else {
    // build nested nodes in model
    var itemNames = item.split('/');
    var itemNode = this.IStorage.utils.getValueOf(itemNames[0], this.IStorage.storage);
    for (var i = 1; i < itemNames.length; i++) {
     if (i === itemNames.length - 1) {
      itemNode[itemNames[i]] = this.IStorage.utils.getValueSafely(value);
      modified = true;
     } else {
      itemNode = this.IStorage.utils.getValueOf(itemNames[i], itemNode);
     }
    }
   }
  }
  return modified;
 }

 del(item) {
  var modified = false;
  if (item) {
   if (typeof this.IStorage.storage === 'object' && Array.isArray(this.IStorage.storage) && this.IStorage.storage.length > 0) {
    this.IStorage.storage = this.IStorage.storage[0];
   }
   if (item.indexOf('/') === -1) {
    delete this.IStorage.storage[item];
    modified = true;
   } else {
    // build nested nodes in model
    var itemNames = item.split('/');
    var itemNode = this.IStorage.utils.getValueOf(itemNames[0], this.IStorage.storage);
    for (var i = 1; i < itemNames.length; i++) {
     if (i === itemNames.length - 1) {
      delete itemNode[itemNames[i]];
      modified = true;
     } else {
      itemNode = this.IStorage.utils.getValueOf(itemNames[i], itemNode);
     }
    }
   }
  }
  return modified;
 }

}