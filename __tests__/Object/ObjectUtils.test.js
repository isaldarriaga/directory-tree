import ObjectUtils from "../../src/Object/ObjectUtils";

describe('The ObjectUtils class', () => {
 let objectUtils;

 beforeEach(() => {
  objectUtils = new ObjectUtils();
 });

 test("tells if an object is empty", () => {

  const result = objectUtils.isEmpty({});

  const expected = true;

  expect(result).toBe(expected);

 });

 test("can safely get the value of an object (array or object)", () => {

  const expected = { a: { b: {} } };

  var result = objectUtils.getValueSafely([expected]);
  expect(result).toEqual(expected);

  result = objectUtils.getValueSafely(expected);
  expect(result).toEqual(expected);

 });

 test("can get the value of a property by its name", () => {

  const input = {
   prop: 'a',
   obj: { a: { b: { c: {} } } }
  };

  const result = objectUtils.getValueOf(input.prop, input.obj);

  const expected = { b: { c: {} } };

  expect(result).toEqual(expected);

 });

});
