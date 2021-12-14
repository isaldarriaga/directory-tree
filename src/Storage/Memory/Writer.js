import MemoryUtils from "./Utils";

export default class MemoryWriter {

 utils;
 #obj;

 constructor(obj) {
  this.#obj = obj;
  this.utils = new MemoryUtils();
 }

 get obj() {
  // ensure read-only from outside
  return JSON.parse(JSON.stringify(this.#obj));
 }

 add(item, value) {
  var modified = false;
  if (item) {
   if (typeof this.#obj === 'object' && Array.isArray(this.#obj) && this.#obj.length > 0) {
    this.#obj = this.#obj[0];
   }
   if (item.indexOf('/') === -1) {
    this.#obj[item] = this.utils.getValueSafely(value);
    modified = true;
   } else {
    // build nested nodes in model
    var itemNames = item.split('/');
    var itemNode = this.utils.getValueOf(itemNames[0], this.#obj);
    for (var i = 1; i < itemNames.length; i++) {
     if (i === itemNames.length - 1) {
      itemNode[itemNames[i]] = this.utils.getValueSafely(value);
      modified = true;
     } else {
      itemNode = this.utils.getValueOf(itemNames[i], itemNode);
     }
    }
   }
  }
  return modified;
 }

 del(item) {
  var modified = false;
  if (item) {
   if (typeof this.#obj === 'object' && Array.isArray(this.#obj) && this.#obj.length > 0) {
    this.#obj = this.#obj[0];
   }
   if (item.indexOf('/') === -1) {
    delete this.#obj[item];
    modified = true;
   } else {
    // build nested nodes in model
    var itemNames = item.split('/');
    var itemNode = this.utils.getValueOf(itemNames[0], this.#obj);
    for (var i = 1; i < itemNames.length; i++) {
     if (i === itemNames.length - 1) {
      delete itemNode[itemNames[i]];
      modified = true;
     } else {
      itemNode = this.utils.getValueOf(itemNames[i], itemNode);
     }
    }
   }
  }
  return modified;
 }

}