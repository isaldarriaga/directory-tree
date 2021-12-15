import MemoryReaderController from "../../../../src/Storage/Memory/Reader/Controller";
import MemoryService from "../../../../src/Storage/Memory/Service";

describe('The MemoryReaderController class', () => {

 let memoryReader;

 beforeEach(() => {
  memoryReader = new MemoryReaderController(new MemoryService({ a: { b: { c: { d: {} }, e: { f: {} } } } }));
 });

 test("find and return a node in the in-memory tree using a path", async () => {

  const result = await memoryReader.find("a/b");

  const expected = { c: { d: {} }, e: { f: {} } };

  expect(result).toEqual(expected);

 });

});
