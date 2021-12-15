import MemoryService from "../../src/Storage/Memory/Service";
import TreeService from "../../src/Tree/Service";

describe('The TreeService class', () => {

 let tree;

 beforeEach(() => {

  tree = new TreeService(new MemoryService(
   {
    a: {
     b: {
      c: {
       d: {}
      },
      e: {
       f: {}
      }
     }
    }
   }));

 });

 test("finds a node in the tree", async () => {

  const result = await tree.findNode("a/b");

  const expected = { c: { d: {} }, e: { f: {} } };

  expect(result).toEqual(expected);

 });

 test("formats a tree into an string representation", async () => {

  const received = await tree.toString();

  const expected = `a
  b
    c
      d
    e
      f
`;

  expect(received).toBe(expected);

 });

 test("returns the information of a node in the tree", async () => {

  const received = await tree.getNodeInfo("a/b");

  const expected = {
   parent: {
    exists: true,
    path: 'a'
   },
   me: {
    exists: true,
    path: 'a/b'
   },
   children: ['c', 'e']
  };

  expect(JSON.stringify(received)).toBe(JSON.stringify(expected));

 });

 test("adds a node to the tree", async () => {

  await tree.addNode("a/g");
  const received = tree.storage;

  const expected = {
   a: {
    b: { c: { d: {} }, e: { f: {} } },
    g: {}
   }
  };

  expect(received).toEqual(expected);

 });

 test("copy a node to a different position in the tree", async () => {

  await tree.copyNodeToPosition("a/b/c", "a/b/e/f");
  const received = tree.storage;

  const expected = {
   a: {
    b: {
     c: {
      d: {}
     },
     e: {
      f: {
       c: {
        d: {}
       },
      }
     }
    }
   }
  };

  expect(received).toEqual(expected);

 });

 test("delete a node from position in the tree", async () => {

  await tree.delNodeFromPosition("c", "a/b");
  const received = tree.storage;

  const expected = {
   a: {
    b: {
     e: {
      f: {}
     }
    }
   }
  };

  expect(received).toEqual(expected);

 });

 test("move a node to a different position in the tree", async () => {

  tree = new TreeService(new MemoryService({}));

  await tree.addNode("a/aa");
  await tree.addNode("b/bb");
  await tree.moveNodeToPosition("a", "b/bb");

  const received = tree.storage;

  const expected = {
   b: {
    bb: {
     a: {
      aa: {}
     }
    }
   }
  };

  expect(received).toEqual(expected);

 });

});