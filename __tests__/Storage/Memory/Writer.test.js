import MemoryWriter from "../../../src/Storage/Memory/Writer";
import MemoryStorage from "../../../src/Storage/Memory/Storage";

describe('The MemoryWriter class', () => {

 let memoryWriter;

 beforeEach(() => {
  memoryWriter = new MemoryWriter(new MemoryStorage({ a: { b: { c: { d: {} }, e: { f: {} } } } }));
 });

 test("add a node to an object and assigns a value", async () => {

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
