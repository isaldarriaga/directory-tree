import MemoryUtils from "../../../src/Storage/Memory/Utils";

describe('The MemoryUtils class', () => {
 let memoryUtils;

 beforeEach(() => {
  memoryUtils = new MemoryUtils();
 });

 test("tells if an object is empty", () => {

  const result = memoryUtils.isEmpty({});

  const expected = true;

  expect(result).toBe(expected);

 });

 test("can safely get the value of an object (array or object)", () => {

  const expected = { a: { b: {} } };

  var result = memoryUtils.getValueSafely([expected]);
  expect(result).toEqual(expected);

  result = memoryUtils.getValueSafely(expected);
  expect(result).toEqual(expected);

 });

 test("can get the value of a property by its name", () => {

  const input = {
   prop: 'a',
   obj: { a: { b: { c: {} } } }
  };

  const result = memoryUtils.getValueOf(input.prop, input.obj);

  const expected = { b: { c: {} } };

  expect(result).toEqual(expected);

 });

});
