import IStorage from "../IStorage";
import MemoryReader from "./Reader";
import MemoryUtils from "./Utils";
import MemoryWriter from "./Writer";

export default class MemoryStorage extends IStorage {

 constructor(storage) {
  super(storage, new MemoryUtils());
 }

 async find(item) {
  const memoryReader = new MemoryReader(this);
  return await memoryReader.find(item);
 }

 async add(item, value) {
  const memoryWriter = new MemoryWriter(this)
  return await memoryWriter.add(item, value);
 }

 async del(item) {
  const memoryWriter = new MemoryWriter(this)
  return await memoryWriter.del(item);
 }
}