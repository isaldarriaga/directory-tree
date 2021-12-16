import IStorage from "../IStorage.js";
import DiskUtils from "./Utils.js";

export default class DiskService extends IStorage {

 constructor(storage) {
  super(storage, new DiskUtils());
 }

 async find(item) {
  throw new Error('Not implemented');
 }

 async add(item, value) {
  throw new Error('Not implemented');
 }

 async del(item) {
  throw new Error('Not implemented');
 }
}