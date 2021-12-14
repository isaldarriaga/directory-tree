export default class MemoryReader {

 #obj;
 constructor(obj) {
  this.#obj = obj;
 }

 async find(item) {
  var items = item.split('/')
   , current = this.#obj
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