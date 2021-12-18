import IStorage from "../../IStorage";

export default class DiskReaderService {

 IStorage;
 constructor(IStorage: IStorage) {
  this.IStorage = IStorage;
 }

 get storage() {
  // enforce read-only from outside
  return JSON.parse(JSON.stringify(this.IStorage.storage));
 }

 async find(item: string) {
  throw new Error('Not implemented');
 }

}