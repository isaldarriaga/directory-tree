export default class IStorage {

 storage;
 utils;

 constructor(storage, utils) {
  this.storage = storage;
  this.utils = utils;
 }

 get storage() {
  // ensure read-only from outside
  return JSON.parse(JSON.stringify(this.storage));
 }

 find(item) {
  throw new Error('Not implemented');
 }

 add(item, value) {
  throw new Error('Not implemented');
 }

 del(item) {
  throw new Error('Not implemented');
 }
}