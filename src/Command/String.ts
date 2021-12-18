import LoggingService from "../Logging/Service";
import { Command } from "./Types";

export default class CommandString {
 userInput: string
 constructor(userInput: string) {
  this.userInput = userInput
 }

 getCommands(): Array<Command> {
  return this.userInput
   .split('\n')
   .filter((line) => line.length > 0)
   .map((line) => line.split(' '))
   .map((tokens) => {
    LoggingService.debug({
     class: this.constructor.name,
     function: this.getCommands.name,
     msg: 'reading commands',
     tokens: tokens
    });
    const errNumArgs = { msg: process.env.ERR_COMMAND_WITH_INVALID_NUM_ARGS, command: tokens };
    switch (tokens[0]) {
     case "LIST":
      if (tokens.length !== 1) {
       LoggingService.error(errNumArgs);
       throw errNumArgs;
      }
      return {
       cmd: tokens[0]
      }
     case "CREATE":
      if (tokens.length !== 2) {
       LoggingService.error(errNumArgs);
       throw errNumArgs;
      }
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
      if (tokens.length !== 2) {
       LoggingService.error(errNumArgs);
       throw errNumArgs;
      }
      return {
       cmd: tokens[0],
       dir: tokens[1]
      }
     case "MOVE":
      if (tokens.length !== 3) {
       LoggingService.error(errNumArgs);
       throw errNumArgs;
      }
      return {
       cmd: tokens[0],
       dir: tokens[1],
       pos: tokens[2]
      }
     default: {
      const err = { msg: process.env.ERR_USER_INPUT_HAS_INVALID_COMMAND, userInput: this.userInput, command: tokens[0] };
      LoggingService.error(err)
      throw err;
     }
    }
   });
 }
}