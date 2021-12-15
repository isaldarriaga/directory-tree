export default class FSWriterController {

 IStorage;

 constructor(IStorage) {
  this.IStorage = IStorage;
 }

 get storage() {
  // ensure read-only from outside
  return JSON.parse(JSON.stringify(this.IStorage.storage));
 }

 add(item, value) {
  throw new Error('Not implemented');
 }

 del(item) {
  throw new Error('Not implemented');
 }

}