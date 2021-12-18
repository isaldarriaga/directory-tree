"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("../Logging/Service"));
const CLI_1 = __importDefault(require("./CLI"));
const File_1 = __importDefault(require("../Command/File"));
const Controller_1 = __importDefault(require("../Directory/Controller"));
const Service_2 = __importDefault(require("../Directory/Service"));
class App {
    constructor() { }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const args = CLI_1.default.getArguments();
            Service_1.default.debug({
                class: this.constructor.name,
                function: this.run.name,
                msg: 'arguments received',
                inputFile: args.inputFile
            });
            const commandFile = new File_1.default(args.inputFile);
            const commands = commandFile.getCommands();
            Service_1.default.debug({
                class: this.constructor.name,
                function: this.run.name,
                msg: 'commands parsed',
                commands: commands
            });
            const directoryController = new Controller_1.default(new Service_2.default());
            const output = yield directoryController.runCommands(commands);
            Service_1.default.debug({
                class: this.constructor.name,
                function: this.run.name,
                msg: 'output received',
                output: output
            });
            return output;
        });
    }
}
exports.default = App;
