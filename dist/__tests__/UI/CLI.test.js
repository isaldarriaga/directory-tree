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
const fs_1 = __importDefault(require("fs"));
const CLI_1 = __importDefault(require("../../src/UI/CLI"));
describe('The CLI object', () => {
    test("accepts an input file that exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const validFile = process.env.COMMAND_VALID_01;
        const validFileCopy = validFile + ".copy";
        if (!fs_1.default.existsSync(validFileCopy)) {
            fs_1.default.copyFileSync(validFile ? validFile : '', validFileCopy);
        }
        process.argv.push('--input-file', validFileCopy);
        const args = CLI_1.default.getArguments();
        if (fs_1.default.existsSync(validFileCopy)) {
            fs_1.default.unlinkSync(validFileCopy);
        }
        expect(args.inputFile).toBe(validFileCopy);
    }));
    test("reject a file that doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const inputFile = process.env.CLI_MANAGER_VALID_01 + ".rnd-" + Math.ceil(Math.random() * 1000);
        process.argv.push('--input-file', inputFile);
        expect.assertions(1);
        try {
            CLI_1.default.getArguments();
        }
        catch (e) {
            expect(e.msg).toBe(process.env.ERR_INPUT_FILE_DOES_NOT_EXIST);
        }
    }));
});
