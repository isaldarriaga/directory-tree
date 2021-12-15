import MemoryStorage from "../../src/Storage/Memory/Storage";
import Tree from "../../src/Tree/Tree";

describe('The Tree class', () => {

 let tree;

 beforeEach(() => {

  tree = new Tree(new MemoryStorage(
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

 test("finds a dir in the tree", async () => {

  const result = await tree.findDir("a/b");

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

 test("returns the info of a node in the tree", async () => {

  const received = await tree.getDirInfo("a/b");

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

 test("adds a directory to the in-memory tree", async () => {

  await tree.addDir("a/g");
  const received = tree.storage;

  const expected = {
   a: {
    b: { c: { d: {} }, e: { f: {} } },
    g: {}
   }
  };

  expect(received).toEqual(expected);

 });

 test("copy a directory to a different position in the in-memory tree", async () => {

  await tree.copyDirToPosition("a/b/c", "a/b/e/f");
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

 test("delete a directory from position in the in-memory tree", async () => {

  await tree.delDirFromPosition("c", "a/b");
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

 test("move a directory to a different position in the in-memory tree", async () => {

  tree = new Tree(new MemoryStorage({}));

  await tree.addDir("a/aa");
  await tree.addDir("b/bb");
  await tree.moveDirToPosition("a", "b/bb");

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