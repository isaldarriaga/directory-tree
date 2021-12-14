import IStorage from "../IStorage";
import FileSystemReader from "./Reader";
import FileSystemWriter from "./Writer";

export default class FileSystemStorage extends IStorage {

 #protected; // hold references to private members in parent

 constructor(storage) {
  super(storage);
  this.#protected.storage = storage;
 }

 // overwrites
 find(item) {
  new FileSystemReader(this.#protected.storage).find(item);
 }

 // overwrites
 add(item) {
  new FileSystemWriter(this.#protected.storage).add(item);
 }

 // overwrites
 del(item) {
  new FileSystemWriter(this.#protected.storage).del(item);
 }
}