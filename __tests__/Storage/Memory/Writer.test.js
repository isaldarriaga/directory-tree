import MemoryWriter from "../../../src/Storage/Memory/Writer";

describe('The ObjectModifier class', () => {

 let memoryWriter;

 beforeEach(() => {
  memoryWriter = new MemoryWriter(
   {
    a: {
     b: {
      c: { d: {} },
      e: { f: {} }
     }
    }
   });
 });

 test("add a node to a tree object and assigns a value", async () => {

  const result = {
   status: await memoryWriter.add("a/b/e/f/g", "my-value"),
   tree: memoryWriter.obj
  }

  const expected = {
   status: true,
   tree: {
    a: {
     b: {
      c: { d: {} },
      e: { f: { g: "my-value" } }
     }
    }
   }
  };

  expect(result).toEqual(expected);

 });

});
