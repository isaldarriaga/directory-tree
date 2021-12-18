import MemoryReaderService from "../../../../src/Storage/Memory/Reader/Service";
import MemoryService from "../../../../src/Storage/Memory/Service";

describe('The MemoryReaderService object', () => {

 let memoryService: MemoryReaderService;

 beforeEach(() => {
  memoryService = new MemoryReaderService(new MemoryService({ a: { b: { c: { d: {} }, e: { f: {} } } } }));
 });

 test("find and return a node in the in-memory tree using a path", async () => {

  const result = await memoryService.find("a/b");

  const expected = { c: { d: {} }, e: { f: {} } };

  expect(result).toEqual(expected);

 });

});
