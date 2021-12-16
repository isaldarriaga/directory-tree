import MemoryService from "../../../src/Storage/Memory/Service.js";
import TreeReaderService from "../../../src/Tree/Reader/Service.js";

describe('The TreeReaderService object', () => {

 let treeService;

 beforeEach(() => {
  treeService = new TreeReaderService(new MemoryService({ a: { b: { c: { d: {} }, e: { f: {} } } } }));
 });

 test("finds a node in the tree", async () => {

  const result = await treeService.findNode("a/b");

  const expected = { c: { d: {} }, e: { f: {} } };

  expect(result).toEqual(expected);

 });

 test("formats a tree into an string representation", async () => {

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

 test("returns the info of a node in the tree", async () => {

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

});
