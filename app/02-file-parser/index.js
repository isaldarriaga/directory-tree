async function getCommands(inputFile, options) {

  return await require('fs')
    .readFileSync(inputFile, 'utf8')
    .split('\n')
    .filter((line) => line.length > 0)
    .map((line) => line.split(' '))
    .map((tokens) => {

      options.logger.debug({
        filename: __filename,
        function: arguments.callee.name,
        msg: 'reading commands',
        tokens: tokens
      });

      // checks num of arguments
      var invalidNumArgs = false;
      switch (tokens[0]) {
        case "CREATE":
        case "DELETE":
          if (tokens.length !== 2) {
            invalidNumArgs = true;
          }
          break;
        case "LIST":
          if (tokens.length !== 1) {
            invalidNumArgs = true;
          }
          break;
        case "MOVE":
          if (tokens.length !== 3) {
            invalidNumArgs = true;
          }
          break;
        default: {
          const err = { msg: process.env.ERR_INPUT_FILE_HAS_INVALID_COMMAND, inputFile: inputFile, command: tokens[0] };
          options.logger.error(err)
          throw err;
        }
      }

      if (invalidNumArgs) {
        const err = { msg: process.env.ERR_COMMAND_WITH_INVALID_NUM_ARGS, inputFile: inputFile, tokens: tokens };
        options.logger.error(err)
        throw err;
      }

      // build the command object
      switch (tokens[0]) {
        case "CREATE":

          const slashPos = tokens[1].lastIndexOf('/');

          if (slashPos > 0) {
            return {
              cmd: tokens[0],
              dir: tokens[1].substring(slashPos + 1),
              pos: tokens[1].substring(0, slashPos)
            }
          } else {
            return {
              cmd: tokens[0],
              dir: tokens[1]
            }
          }

        case "DELETE":
          return {
            cmd: tokens[0],
            dir: tokens[1]
          }
        case "LIST":
          return {
            cmd: tokens[0]
          }
        case "MOVE":
          return {
            cmd: tokens[0],
            dir: tokens[1],
            pos: tokens[2]
          }
      }
    });

}

module.exports = {
  getCommands: getCommands
}