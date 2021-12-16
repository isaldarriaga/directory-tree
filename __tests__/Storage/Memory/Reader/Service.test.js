import MemoryReaderService from "../../../../src/Storage/Memory/Reader/Service.js";
import MemoryService from "../../../../src/Storage/Memory/Service.js";

describe('The MemoryReaderService object', () => {

 let memoryService;

 beforeEach(() => {
  memoryService = new MemoryReaderService(new MemoryService({ a: { b: { c: { d: {} }, e: { f: {} } } } }));
 });

 test("find and return a node in the in-memory tree using a path", async () => {

  const result = await memoryService.find("a/b");

  const expected = { c: { d: {} }, e: { f: {} } };

  expect(result).toEqual(expected);

 });

});
