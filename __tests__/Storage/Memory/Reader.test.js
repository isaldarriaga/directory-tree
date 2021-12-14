import MemoryReader from "../../../src/Storage/Memory/Reader";

describe('The ObjectReader class', () => {

 test("finds a node in the tree object using a path and returns it", async () => {

  const memoryReader = new MemoryReader(
   {
    a: {
     b: {
      c: { d: {} },
      e: { f: {} }
     }
    }
   });

  const result = await memoryReader.find("a/b");

  const expected = {
   c: { d: {} },
   e: { f: {} }
  };

  expect(result).toEqual(expected);

 });

});
