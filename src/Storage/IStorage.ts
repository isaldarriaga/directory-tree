export default abstract class IStorage {

 storage: any;
 utils: any;

 constructor(storage: any, utils: any) {
  this.storage = storage;
  this.utils = utils;
 }

 get() {
  // enforce read-only from outside
  return JSON.parse(JSON.stringify(this.storage));
 }

 find(item: any): Promise<any | void> {
  throw new Error('Must implement');
 }

 add(item: any, value: any): Promise<boolean | void> {
  throw new Error('Must implement');
 }

 del(item: any): Promise<boolean | void> {
  throw new Error('Must implement');
 }
}