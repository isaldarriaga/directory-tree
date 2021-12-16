import MemoryWriterService from "../../../../src/Storage/Memory/Writer/Service.js";
import MemoryService from "../../../../src/Storage/Memory/Service.js";

describe('The MemoryWriterService object', () => {

 let memoryService;

 beforeEach(() => {
  memoryService = new MemoryWriterService(new MemoryService({ a: { b: { c: { d: {} }, e: { f: {} } } } }));
 });

 test("add a node to the in-memory tree and assigns a value", async () => {

  const result = {
   status: await memoryService.add("a/b/e/f/g", "my-value"),
   storage: memoryService.storage
  }

  const expected = {
   status: true,
   storage: { a: { b: { c: { d: {} }, e: { f: { g: "my-value" } } } } }
  };

  expect(result).toEqual(expected);

 });

});
