import MemoryService from "../../../src/Storage/Memory/Service";
import TreeWriterController from "../../../src/Tree/Writer/Controller";

describe('The TreeWriterController class', () => {

 let treeWriter;

 beforeEach(() => {

  treeWriter = new TreeWriterController(new MemoryService({ a: { b: { c: { d: {} }, e: { f: {} } } } }));

 });

 test("adds a node to the in-memory tree", async () => {

  await treeWriter.addNode("a/g");
  const received = treeWriter.storage;

  const expected = { a: { b: { c: { d: {} }, e: { f: {} } }, g: {} } };

  expect(received).toEqual(expected);

 });

 test("copy a node to a different position in the in-memory tree", async () => {

  await treeWriter.copyNodeToPosition("a/b/c", "a/b/e/f");
  const received = treeWriter.storage;

  const expected = { a: { b: { c: { d: {} }, e: { f: { c: { d: {} }, } } } } };

  expect(received).toEqual(expected);

 });

 test("delete a node from position in the in-memory tree", async () => {

  await treeWriter.delNodeFromPosition("c", "a/b");
  const received = treeWriter.storage;

  const expected = { a: { b: { e: { f: {} } } } };

  expect(received).toEqual(expected);

 });

 test("move a node to a different position in the in-memory tree", async () => {

  treeWriter = new TreeWriterController(new MemoryService({}));

  await treeWriter.addNode("a/aa");
  await treeWriter.addNode("b/bb");
  await treeWriter.moveNodeToPosition("a", "b/bb");

  const received = treeWriter.storage;

  const expected = { b: { bb: { a: { aa: {} } } } };

  expect(received).toEqual(expected);

 });

});
