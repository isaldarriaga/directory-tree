import MemoryStorage from "../../src/Storage/Memory/Storage";
import TreeWriter from "../../src/Tree/Writer";

describe('The TreeWriter class', () => {

 let treeWriter;

 beforeEach(() => {

  treeWriter = new TreeWriter(new MemoryStorage({ a: { b: { c: { d: {} }, e: { f: {} } } } }));

 });

 test("adds a directory to the in-memory tree", async () => {

  await treeWriter.addDir("a/g");
  const received = treeWriter.storage;

  const expected = { a: { b: { c: { d: {} }, e: { f: {} } }, g: {} } };

  expect(received).toEqual(expected);

 });

 test("copy a directory to a different position in the in-memory tree", async () => {

  await treeWriter.copyDirToPosition("a/b/c", "a/b/e/f");
  const received = treeWriter.storage;

  const expected = { a: { b: { c: { d: {} }, e: { f: { c: { d: {} }, } } } } };

  expect(received).toEqual(expected);

 });

 test("delete a directory from position in the in-memory tree", async () => {

  await treeWriter.delDirFromPosition("c", "a/b");
  const received = treeWriter.storage;

  const expected = { a: { b: { e: { f: {} } } } };

  expect(received).toEqual(expected);

 });

 test("move a directory to a different position in the in-memory tree", async () => {

  treeWriter = new TreeWriter(new MemoryStorage({}));

  await treeWriter.addDir("a/aa");
  await treeWriter.addDir("b/bb");
  await treeWriter.moveDirToPosition("a", "b/bb");

  const received = treeWriter.storage;

  const expected = { b: { bb: { a: { aa: {} } } } };

  expect(received).toEqual(expected);

 });

});
