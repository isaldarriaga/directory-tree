const { Console } = require('console');
const fs = require('fs');

// the program under test
require('dotenv').config();
const options = {
 logger: require('pino')({ level: process.env.DEBUG_LEVEL ? process.env.DEBUG_LEVEL : "info" })
}

describe('The tree-utils module', () => {

 test("adds a directory (node) to an tree (js object)", async () => {

  const { treeAdd } = require('.');
  var received = {};
  await treeAdd.addDirToTree("level1/level2", received, options);

  const expected = { level1: { level2: {} } };

  expect(JSON.stringify(received)).toBe(JSON.stringify(expected));

 });

 test("copy a directory (node) to a different position in a tree (js object)", async () => {

  const { treeAdd, treeCopy } = require('.');
  var received = {};
  await treeAdd.addDirToTree("a/aa", received, options);
  await treeAdd.addDirToTree("b/bb", received, options);
  await treeCopy.copyDirToPositionInTree("a", "b/bb", received, options);

  const expected = {
   a: {
    aa: {}
   },
   b: {
    bb: {
     a: {
      aa: {}
     }
    }
   }
  };

  expect(JSON.stringify(received)).toBe(JSON.stringify(expected));

 });

 test("delete a directory (node) from position in a tree (js object)", async () => {

  const { treeAdd, treeDelete } = require('.');
  var received = {};
  await treeAdd.addDirToTree("a/aa/aaa/aaaa", received, options);
  await treeDelete.delDirFromPositionInTree("aaa", "a/aa", received, options);

  const expected = {
   a: {
    aa: {}
   }
  };

  expect(JSON.stringify(received)).toBe(JSON.stringify(expected));

 });


 test("finds a directory (node) in a position of a tree (js object)", async () => {

  const { treeAdd, treeFind } = require('.');
  var tree = {};
  await treeAdd.addDirToTree("a/aa/aaa/aaaa", tree, options);
  const received = await treeFind.dirExistsInPositionOfTree("aaa", "a/aa", tree, options);

  const expected = true;

  expect(received).toBe(expected);

 });

 test("formats a tree (js object) into an string representation", async () => {

  const { treeAdd, treeFormat } = require('.');
  var tree = {};
  await treeAdd.addDirToTree("a/aa/aaa/aaaa", tree, options);
  const received = await treeFormat.getTreeAsString(tree);

  const expected = `a
  aa
    aaa
      aaaa
`;

  expect(received).toBe(expected);

 });

 test("returns the info of a node in the tree", async () => {

  const { treeAdd, treeInfo } = require('.');
  var tree = {};
  await treeAdd.addDirToTree("a/aa/aaa/aaaa", tree, options);
  await treeAdd.addDirToTree("a/aa/aaa/bbbb", tree, options);
  const received = await treeInfo.getDirInfo("a/aa/aaa", tree, options);

  const expected = {
   parent: {
    exists: true,
    path: 'a/aa'
   },
   me: {
    exists: true,
    path: 'a/aa/aaa'
   },
   children: ['aaaa', 'bbbb']
  };

  expect(JSON.stringify(received)).toBe(JSON.stringify(expected));

 });

 test("move a directory (node) to a different position in a tree (js object)", async () => {

  const { treeAdd, treeMove } = require('.');
  var received = {};
  await treeAdd.addDirToTree("a/aa", received, options);
  await treeAdd.addDirToTree("b/bb", received, options);
  await treeMove.moveDirToPositionInTree("a", "b/bb", received, options);

  const expected = {
   b: {
    bb: {
     a: {
      aa: {}
     }
    }
   }
  };

  expect(JSON.stringify(received)).toBe(JSON.stringify(expected));

 });

 test("returns the nested object of a directory (path) in a tree (js object)", async () => {

  const { treeNesting } = require('.');
  var tree = {
   a: {
    aa: {
     b: { bb: {} }
    }
   }

  };
  const received = await treeNesting.getNestedObject("a", tree, options);

  const expected = {
   aa: {
    b: { bb: {} }
   }
  };

  expect(JSON.stringify(received)).toBe(JSON.stringify(expected));

 });

});
