import MemoryService from "../../../src/Storage/Memory/Service.js";
import TreeWriterService from "../../../src/Tree/Writer/Service.js";

describe('The TreeWriterService object', () => {

 let treeService;

 beforeEach(() => {

  treeService = new TreeWriterService(new MemoryService({ a: { b: { c: { d: {} }, e: { f: {} } } } }));

 });

 test("adds a node to the tree", async () => {

  await treeService.addNode("a/g");
  const received = treeService.storage;

  const expected = { a: { b: { c: { d: {} }, e: { f: {} } }, g: {} } };

  expect(received).toEqual(expected);

 });

 test("copy a node to a different position in the tree", async () => {

  await treeService.copyNodeToPosition("a/b/c", "a/b/e/f");
  const received = treeService.storage;

  const expected = { a: { b: { c: { d: {} }, e: { f: { c: { d: {} }, } } } } };

  expect(received).toEqual(expected);

 });

 test("delete a node from position in the tree", async () => {

  await treeService.delNodeFromPosition("c", "a/b");
  const received = treeService.storage;

  const expected = { a: { b: { e: { f: {} } } } };

  expect(received).toEqual(expected);

 });

 test("move a node to a different position in the tree", async () => {

  treeService = new TreeWriterService(new MemoryService({}));

  await treeService.addNode("a/aa");
  await treeService.addNode("b/bb");
  await treeService.moveNodeToPosition("a", "b/bb");

  const received = treeService.storage;

  const expected = { b: { bb: { a: { aa: {} } } } };

  expect(received).toEqual(expected);

 });

});
