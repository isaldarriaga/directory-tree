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
const Service_1 = __importDefault(require("../../../../src/Storage/Memory/Writer/Service"));
const Service_2 = __importDefault(require("../../../../src/Storage/Memory/Service"));
describe('The MemoryWriterService object', () => {
    let memoryService;
    beforeEach(() => {
        memoryService = new Service_1.default(new Service_2.default({ a: { b: { c: { d: {} }, e: { f: {} } } } }));
    });
    test("add a node to the in-memory tree and assigns a value", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = {
            status: yield memoryService.add("a/b/e/f/g", "my-value"),
            storage: memoryService.storage
        };
        const expected = {
            status: true,
            storage: { a: { b: { c: { d: {} }, e: { f: { g: "my-value" } } } } }
        };
        expect(result).toEqual(expected);
    }));
});
