import { Folder } from './../Types';
import IStorage from "../../IStorage";

export default class DiskWriterService {

 IStorage;

 constructor(IStorage: IStorage) {
  this.IStorage = IStorage;
 }

 get storage() {
  // enforce read-only from outside
  return JSON.parse(JSON.stringify(this.IStorage.storage));
 }

 add(item: string, value: Folder) {
  throw new Error('Not implemented');
 }

 del(item: string) {
  throw new Error('Not implemented');
 }

}