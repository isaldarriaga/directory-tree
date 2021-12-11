const fs = require('fs')

require('dotenv').config();
const options = {
 logger: require('pino')({ level: "info" })
}

describe('INTEGRATION: The directories app', () => {

 const app = require('./app')
 var output, hrStart, hrEnd;

 test("gives a valid output when a valid input file is provided via env variable", async () => {

  output = await app.run(options);

  const expected = fs.readFileSync(process.env.EXPECTED_OUTPUT_FILE, 'utf8')

  expect(output).toBe(expected);

 });


 test("finishes in less than 5 seconds", async () => {

  // measure start time
  hrStart = process.hrtime();

  await app.run(options);

  // measure end time
  hrEnd = process.hrtime(hrStart);

  expect(hrEnd[0]).toBeLessThan(500);
 });

});

