import MemoryReader from "../../../src/Storage/Memory/Reader";
import MemoryStorage from "../../../src/Storage/Memory/Storage";

describe('The MemoryReader class', () => {

 let memoryReader;

 beforeEach(() => {
  memoryReader = new MemoryReader(new MemoryStorage({ a: { b: { c: { d: {} }, e: { f: {} } } } }));
 });

 test("finds a node in the tree object using a path and returns it", async () => {

  const result = await memoryReader.find("a/b");

  const expected = { c: { d: {} }, e: { f: {} } };

  expect(result).toEqual(expected);

 });

});
