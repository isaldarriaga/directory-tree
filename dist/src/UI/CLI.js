"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs_1 = __importDefault(require("fs"));
const Service_1 = __importDefault(require("../Logging/Service"));
// UICli: User Interface - Command Line Interface
class CLI {
    static getArguments() {
        const program = new commander_1.Command();
        program.version('0.0.1');
        // Command Line Interface arguments
        program
            .option('-f, --input-file <path>', 'path to the file with commands. Overwrites the COMMAND_VALID_01 environment variable.', process.env.COMMAND_VALID_01)
            .option('-s, --setupFiles <jest>', 'allow jest to dotenv/config. You dont need to pass this argument');
        program.parse(process.argv);
        const args = program.opts();
        if (!fs_1.default.existsSync(args.inputFile)) {
            const err = { msg: process.env.ERR_INPUT_FILE_DOES_NOT_EXIST, inputFile: args.inputFile };
            Service_1.default.error(err);
            throw err;
        }
        return args;
    }
}
exports.default = CLI;
