import IStorage from "../IStorage";
import MemoryReaderController from "./Reader/Controller";
import MemoryWriterController from "./Writer/Controller";
import MemoryUtils from "./Utils";

export default class MemoryService extends IStorage {

 constructor(storage) {
  super(storage, new MemoryUtils());
 }

 async find(item) {
  const memoryReader = new MemoryReaderController(this);
  return await memoryReader.find(item);
 }

 async add(item, value) {
  const memoryWriter = new MemoryWriterController(this)
  return await memoryWriter.add(item, value);
 }

 async del(item) {
  const memoryWriter = new MemoryWriterController(this)
  return await memoryWriter.del(item);
 }
}