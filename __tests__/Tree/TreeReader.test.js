import TreeReader from "../../src/Tree/TreeReader";

describe('The TreeReader class', () => {

 test("finds a dir in the tree", async () => {

  const treeReader = new TreeReader(
   {
    a: {
     b: {
      c: { d: {} },
      e: { f: {} }
     }
    }
   });

  const result = await treeReader.findDir("a/b");

  const expected = {
   c: { d: {} },
   e: { f: {} }
  };

  expect(result).toEqual(expected);

 });

});
