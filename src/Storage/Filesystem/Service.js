import IStorage from "../IStorage";
import FSUtils from "./Utils";

export default class FSService extends IStorage {

 constructor(storage) {
  super(storage, new FSUtils());
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