import ObjectModifier from "../../src/Object/ObjectModifier";

describe('The ObjectModifier class', () => {

 let objectModifier;

 beforeEach(() => {
  objectModifier = new ObjectModifier(
   {
    a: {
     b: {
      c: { d: {} },
      e: { f: {} }
     }
    }
   });
 });

 test("finds a node in the tree object using a path and returns it (INHERITANCE)", async () => {

  const result = await objectModifier.findProperty("a/b");

  const expected = {
   c: { d: {} },
   e: { f: {} }
  };

  expect(result).toEqual(expected);

 });

 test("add a node to a tree object and assigns a value", async () => {

  const result = {
   status: await objectModifier.addProperty("a/b/e/f/g", "my-value"),
   tree: objectModifier.obj
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
