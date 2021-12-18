"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const String_1 = __importDefault(require("./String"));
const fs_1 = __importDefault(require("fs"));
class CommandFile extends String_1.default {
    constructor(inputFile) {
        super(fs_1.default.readFileSync(inputFile, 'utf8'));
    }
}
exports.default = CommandFile;
