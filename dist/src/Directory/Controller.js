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
class DirectoryController {
    constructor(directoryService) {
        this.directoryService = directoryService;
    }
    runCommands(commands) {
        return __awaiter(this, void 0, void 0, function* () {
            // measure time start
            const hrStart = process.hrtime();
            var msg = "", tree = {};
            for (const command of commands) {
                Service_1.default.debug({
                    class: this.constructor.name,
                    function: this.runCommands.name,
                    msg: 'command received',
                    command: command
                });
                msg += yield this.directoryService[command.cmd.toLowerCase()](command.dir, command.pos);
            }
            Service_1.default.debug({
                class: this.constructor.name,
                function: this.runCommands.name,
                msg: 'output received',
                output: msg
            });
            // measure time end
            const hrEnd = process.hrtime(hrStart);
            const timelapse = {
                duration: hrEnd[0].toFixed(1) + 's ' + (hrEnd[1] / 1000000).toFixed(1) + 'ms',
                seconds: (hrEnd[0] + hrEnd[1] / Math.pow(10, 9))
            };
            Service_1.default.trace({
                class: this.constructor.name,
                function: this.runCommands.name,
                msg: 'commands executed',
                timelapse: timelapse
            });
            return {
                msg: msg,
                tree: tree,
                timelapse: timelapse
            };
        });
    }
}
exports.default = DirectoryController;
