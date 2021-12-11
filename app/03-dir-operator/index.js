const createDir = require('./dir-create')
const listDir = require('./dir-list')
const moveDir = require('./dir-move')
const deleteDir = require('./dir-delete')


async function runCommands(commands, options) {

 // measure time start
 hrStart = process.hrtime();

 var output = `CREATE fruits
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

 // measure time end
 hrEnd = process.hrtime(hrStart);

 options.logger.trace({
  filename: __filename,
  function: arguments.callee.name,
  msg: 'commands executed',
  timelapse: hrEnd[0].toFixed(1) + 's ' + (hrEnd[1] / 1000000).toFixed(1) + 'ms'
 });

 return output;

}

module.exports = {
 runCommands: runCommands
}