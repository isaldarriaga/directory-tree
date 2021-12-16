import IStorage from "../IStorage.js";
import MemoryReaderService from "./Reader/Service.js";
import MemoryWriterService from "./Writer/Service.js";
import MemoryUtils from "./Utils.js";

export default class MemoryService extends IStorage {

 constructor(storage) {
  super(storage, new MemoryUtils());
 }

 async find(item) {
  const memoryReader = new MemoryReaderService(this);
  return await memoryReader.find(item);
 }

 async add(item, value) {
  const memoryWriter = new MemoryWriterService(this)
  return await memoryWriter.add(item, value);
 }

 async del(item) {
  const memoryWriter = new MemoryWriterService(this)
  return await memoryWriter.del(item);
 }
}