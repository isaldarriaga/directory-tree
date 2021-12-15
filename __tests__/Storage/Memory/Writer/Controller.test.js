import MemoryWriterController from "../../../../src/Storage/Memory/Writer/Controller";
import MemoryService from "../../../../src/Storage/Memory/Service";

describe('The MemoryWriterController class', () => {

 let memoryWriter;

 beforeEach(() => {
  memoryWriter = new MemoryWriterController(new MemoryService({ a: { b: { c: { d: {} }, e: { f: {} } } } }));
 });

 test("add a node to the in-memory tree and assigns a value", async () => {

  const result = {
   status: await memoryWriter.add("a/b/e/f/g", "my-value"),
   storage: memoryWriter.storage
  }

  const expected = {
   status: true,
   storage: { a: { b: { c: { d: {} }, e: { f: { g: "my-value" } } } } }
  };

  expect(result).toEqual(expected);

 });

});
