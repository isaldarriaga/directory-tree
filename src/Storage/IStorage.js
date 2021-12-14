export default class IStorage {
 #storage;
 constructor(storage) {
  this.#storage = storage;
 }

 get storage() {
  // ensure read-only from outside
  return JSON.parse(JSON.stringify(this.#storage));
 }

 get utils() {
  return this.#storage.utils;
 }

 find(item) {
  throw new Error('Not implemented');
 }

 add(item) {
  throw new Error('Not implemented');
 }

 del(item) {
  throw new Error('Not implemented');
 }
}