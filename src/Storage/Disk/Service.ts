import { Disk, Folder } from './Types';
import IStorage from "../IStorage";
import DiskUtils from "./Utils";

export default class DiskService extends IStorage {

 constructor(storage: Disk) {
  super(storage, new DiskUtils());
 }

 async find(item: string) {
  throw new Error('Not implemented');
 }

 async add(item: string, value: Folder) {
  throw new Error('Not implemented');
 }

 async del(item: string) {
  throw new Error('Not implemented');
 }
}