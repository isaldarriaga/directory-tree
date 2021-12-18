"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("../Logging/Service"));
class CommandString {
    constructor(userInput) {
        this.userInput = userInput;
    }
    getCommands() {
        return this.userInput
            .split('\n')
            .filter((line) => line.length > 0)
            .map((line) => line.split(' '))
            .map((tokens) => {
            Service_1.default.debug({
                class: this.constructor.name,
                function: this.getCommands.name,
                msg: 'reading commands',
                tokens: tokens
            });
            const errNumArgs = { msg: process.env.ERR_COMMAND_WITH_INVALID_NUM_ARGS, command: tokens };
            switch (tokens[0]) {
                case "LIST":
                    if (tokens.length !== 1) {
                        Service_1.default.error(errNumArgs);
                        throw errNumArgs;
                    }
                    return {
                        cmd: tokens[0]
                    };
                case "CREATE":
                    if (tokens.length !== 2) {
                        Service_1.default.error(errNumArgs);
                        throw errNumArgs;
                    }
                    const slashPos = tokens[1].lastIndexOf('/');
                    if (slashPos > 0) {
                        return {
                            cmd: tokens[0],
                            dir: tokens[1].substring(slashPos + 1),
                            pos: tokens[1].substring(0, slashPos)
                        };
                    }
                    else {
                        return {
                            cmd: tokens[0],
                            dir: tokens[1]
                        };
                    }
                case "DELETE":
                    if (tokens.length !== 2) {
                        Service_1.default.error(errNumArgs);
                        throw errNumArgs;
                    }
                    return {
                        cmd: tokens[0],
                        dir: tokens[1]
                    };
                case "MOVE":
                    if (tokens.length !== 3) {
                        Service_1.default.error(errNumArgs);
                        throw errNumArgs;
                    }
                    return {
                        cmd: tokens[0],
                        dir: tokens[1],
                        pos: tokens[2]
                    };
                default: {
                    const err = { msg: process.env.ERR_USER_INPUT_HAS_INVALID_COMMAND, userInput: this.userInput, command: tokens[0] };
                    Service_1.default.error(err);
                    throw err;
                }
            }
        });
    }
}
exports.default = CommandString;
