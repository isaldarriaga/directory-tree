import IStorage from "../IStorage";
import MemoryReader from "./Reader";
import MemoryWriter from "./Writer";
import MemoryUtils from "../Utils";

export default class MemoryStorage extends IStorage {

 #protected; // hold references to private members in parent

 constructor(storage) {
  super(storage);
  this.#protected.storage = storage;
 }

 // overwrites
 find(item) {
  new MemoryReader(this.#protected.storage).find(item);
 }

 // overwrites
 add(item) {
  new MemoryWriter(this.#protected.storage).add(item);
 }

 // overwrites
 del(item) {
  new MemoryWriter(this.#protected.storage).del(item);
 }
}