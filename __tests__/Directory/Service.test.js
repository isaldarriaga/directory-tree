import DirectoryService from "../../src/Directory/Service.js";

describe('The DirectoryService object', () => {

 let directoryService;

 beforeEach(() => {

  directoryService = new DirectoryService();

 });

 test("creates a directory in the root's directory tree", async () => {

  await directoryService.create("a");
  const received = directoryService.tree;

  const expected = { a: {} };

  expect(received).toEqual(expected);

 });

 test("creates a directory in the tree's second level", async () => {

  await directoryService.create("a");
  await directoryService.create("a/b");
  const received = directoryService.tree;

  const expected = { a: { b: {} } };

  expect(received).toEqual(expected);

 });

 test("formats a tree into its string representation", async () => {

  await directoryService.create("a");
  await directoryService.create("a/b");
  await directoryService.create("a/b/c");
  await directoryService.create("a/b/c/d");
  await directoryService.create("a/b/e");
  await directoryService.create("a/b/e/f");
  const received = await directoryService.list();

  const expected = `LIST
a
  b
    c
      d
    e
      f
`;

  expect(received).toBe(expected);

 });

 test("delete a node from a position in the tree", async () => {

  await directoryService.create("a");
  await directoryService.create("a/b");
  await directoryService.create("a/b/c");
  await directoryService.create("a/b/c/d");
  await directoryService.create("a/b/e");
  await directoryService.create("a/b/e/f");
  await directoryService.delete("a/b/c");
  const received = directoryService.tree;

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

  await directoryService.create("a");
  await directoryService.create("a/b");
  await directoryService.create("a/b/c");
  await directoryService.create("a/b/c/d");
  await directoryService.create("a/b/e");
  await directoryService.create("a/b/e/f");
  await directoryService.move("a/b/e", "a/b/c/d");

  const received = directoryService.tree;

  const expected = {
   a: {
    b: {
     c: {
      d: {
       e: { f: {} }
      }
     }
    }
   }
  };

  expect(JSON.stringify(received)).toEqual(JSON.stringify(expected));

 });

});