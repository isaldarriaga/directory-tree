export default class DiskReaderService {

 IStorage;
 constructor(IStorage) {
  this.IStorage = IStorage;
 }

 get storage() {
  // ensure read-only from outside
  return JSON.parse(JSON.stringify(this.IStorage.storage));
 }

 async find(item) {
  throw new Error('Not implemented');
 }

}