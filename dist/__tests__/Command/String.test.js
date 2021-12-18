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
const String_1 = __importDefault(require("../../src/Command/String"));
describe('The CommandString object', () => {
    let commandString;
    beforeEach(() => {
        const userInput = `CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
DELETE fruits/apples
DELETE foods/fruits/apples
LIST
`;
        commandString = new String_1.default(userInput);
    });
    test("returns the array of commands from a command string sequence", () => __awaiter(void 0, void 0, void 0, function* () {
        const received = commandString.getCommands();
        const expected = [{ "cmd": "CREATE", "dir": "fruits" }, { "cmd": "CREATE", "dir": "vegetables" }, { "cmd": "CREATE", "dir": "grains" }, { "cmd": "CREATE", "dir": "apples", "pos": "fruits" }, { "cmd": "CREATE", "dir": "fuji", "pos": "fruits/apples" }, { "cmd": "LIST" }, { "cmd": "CREATE", "dir": "squash", "pos": "grains" }, { "cmd": "MOVE", "dir": "grains/squash", "pos": "vegetables" }, { "cmd": "CREATE", "dir": "foods" }, { "cmd": "MOVE", "dir": "grains", "pos": "foods" }, { "cmd": "MOVE", "dir": "fruits", "pos": "foods" }, { "cmd": "MOVE", "dir": "vegetables", "pos": "foods" }, { "cmd": "LIST" }, { "cmd": "DELETE", "dir": "fruits/apples" }, { "cmd": "DELETE", "dir": "foods/fruits/apples" }, { "cmd": "LIST" }];
        expect(received).toEqual(expected);
    }));
});
