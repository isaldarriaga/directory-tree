import IStorage from "../IStorage";
import FSReader from "./Reader";
import FSUtils from "./Utils";
import FSWriter from "./Writer";

export default class FSStorage extends IStorage {

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