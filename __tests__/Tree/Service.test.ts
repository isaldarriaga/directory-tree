import { Folder } from './../../src/Storage/Disk/Types';
import MemoryService from "../../src/Storage/Memory/Service";
import DiskService from "../../src/Storage/Disk/Service";
import TreeService from "../../src/Tree/Service";
import { Disk } from "../../src/Storage/Disk/Types";
import { Filesystem } from "../../src/Storage/Disk/Types";

describe('The TreeService object', () => {

 let treeService: TreeService;

 beforeEach(() => {

  treeService = new TreeService(new MemoryService(
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

  const result = await treeService.findNode("a/b");

  const expected = { c: { d: {} }, e: { f: {} } };

  expect(result).toEqual(expected);

 });

 test("formats a tree into its string representation", async () => {

  const received = await treeService.toString();

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

  const received = await treeService.getNodeInfo("a/b");

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

  await treeService.addNode("a/g");
  const received = treeService.storage;

  const expected = {
   a: {
    b: { c: { d: {} }, e: { f: {} } },
    g: {}
   }
  };

  expect(received).toEqual(expected);

 });

 test("copy a node to a different position in the tree", async () => {

  await treeService.copyNodeToPosition("a/b/c", "a/b/e/f");
  const received = treeService.storage;

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

  await treeService.delNodeFromPosition("c", "a/b");
  const received = treeService.storage;

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

  treeService = new TreeService(new MemoryService({}));

  await treeService.addNode("a/aa");
  await treeService.addNode("b/bb");
  await treeService.moveNodeToPosition("a", "b/bb");

  const received = treeService.storage;

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

 test("is polymorphic", async () => {

  treeService = new TreeService(new MemoryService({}));
  let abstractStorage = treeService.IStorage;
  let concreteStorage = treeService.storage;
  expect(abstractStorage).toBeInstanceOf(MemoryService);
  expect(concreteStorage).toBeInstanceOf(Object);

  let disk: Disk = {
   filesystem: Filesystem.xfs,
   mount: '/dev/sda',
   obj: {
    vendor: 'Samsung',
    serial: 'ABC123'
   }
  }
  treeService = new TreeService(new DiskService(disk));
  abstractStorage = treeService.IStorage;
  concreteStorage = treeService.storage;
  expect(abstractStorage).toBeInstanceOf(DiskService);
  expect(concreteStorage).toBeInstanceOf(Object);

 });

});