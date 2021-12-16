import App from '../../src/UI/App.js';

describe('The App object', () => {

 let app, output, expected;

 beforeEach(() => {
  app = new App();
  expected = `CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
fruits
  apples
    fuji
grains
vegetables
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
foods
  fruits
    apples
      fuji
  grains
  vegetables
    squash
DELETE fruits/apples
Cannot delete fruits/apples - fruits does not exist
DELETE foods/fruits/apples
LIST
foods
  fruits
  grains
  vegetables
    squash
`;
 });

 test("runs all application components and return results", async () => {

  output = await app.run();
  expect(output.msg).toBe(expected);

 });

 test("finishes in less than 2 seconds", async () => {

  output = await app.run();

  expect(output.timelapse.seconds).toBeLessThan(2);
 });

});
