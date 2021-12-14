import ObjectReader from "../../src/Object/ObjectReader";

describe('The ObjectReader class', () => {

 test("finds a node in the tree object using a path and returns it", async () => {

  const objectReader = new ObjectReader(
   {
    a: {
     b: {
      c: { d: {} },
      e: { f: {} }
     }
    }
   });

  const result = await objectReader.findProperty("a/b");

  const expected = {
   c: { d: {} },
   e: { f: {} }
  };

  expect(result).toEqual(expected);

 });

});
