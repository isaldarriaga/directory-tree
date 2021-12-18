import IStorage from "../IStorage";
import MemoryReaderService from "./Reader/Service";
import MemoryWriterService from "./Writer/Service";
import MemoryUtils from "./Utils";

export default class MemoryService extends IStorage {

 constructor(storage: object) {
  super(storage, new MemoryUtils());
 }

 async find(item: string) {
  const memoryReader: MemoryReaderService = new MemoryReaderService(this);
  return await memoryReader.find(item);
 }

 async add(item: string, value: any) {
  const memoryWriter: MemoryWriterService = new MemoryWriterService(this)
  return await memoryWriter.add(item, value);
 }

 async del(item: string) {
  const memoryWriter: MemoryWriterService = new MemoryWriterService(this)
  return await memoryWriter.del(item);
 }
}