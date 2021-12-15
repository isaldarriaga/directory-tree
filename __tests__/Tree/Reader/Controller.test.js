import MemoryService from "../../../src/Storage/Memory/Service";
import TreeReaderController from "../../../src/Tree/Reader/Controller";

describe('The TreeReaderController class', () => {

 let treeReader;

 beforeEach(() => {
  treeReader = new TreeReaderController(new MemoryService({ a: { b: { c: { d: {} }, e: { f: {} } } } }));
 });

 test("finds a node in the tree", async () => {

  const result = await treeReader.findNode("a/b");

  const expected = { c: { d: {} }, e: { f: {} } };

  expect(result).toEqual(expected);

 });

 test("formats a tree into an string representation", async () => {

  const received = await treeReader.toString();

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

  const received = await treeReader.getNodeInfo("a/b");

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
