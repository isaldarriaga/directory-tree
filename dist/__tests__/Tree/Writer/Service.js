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
const Service_1 = __importDefault(require("../../../src/Storage/Memory/Service"));
const Service_2 = __importDefault(require("../../../src/Tree/Writer/Service"));
describe('The TreeWriterService object', () => {
    let treeService;
    beforeEach(() => {
        treeService = new Service_2.default(new Service_1.default({ a: { b: { c: { d: {} }, e: { f: {} } } } }));
    });
    test("adds a node to the tree", () => __awaiter(void 0, void 0, void 0, function* () {
        yield treeService.addNode("a/g");
        const received = treeService.storage;
        const expected = { a: { b: { c: { d: {} }, e: { f: {} } }, g: {} } };
        expect(received).toEqual(expected);
    }));
    test("copy a node to a different position in the tree", () => __awaiter(void 0, void 0, void 0, function* () {
        yield treeService.copyNodeToPosition("a/b/c", "a/b/e/f");
        const received = treeService.storage;
        const expected = { a: { b: { c: { d: {} }, e: { f: { c: { d: {} }, } } } } };
        expect(received).toEqual(expected);
    }));
    test("delete a node from position in the tree", () => __awaiter(void 0, void 0, void 0, function* () {
        yield treeService.delNodeFromPosition("c", "a/b");
        const received = treeService.storage;
        const expected = { a: { b: { e: { f: {} } } } };
        expect(received).toEqual(expected);
    }));
    test("move a node to a different position in the tree", () => __awaiter(void 0, void 0, void 0, function* () {
        treeService = new Service_2.default(new Service_1.default({}));
        yield treeService.addNode("a/aa");
        yield treeService.addNode("b/bb");
        yield treeService.moveNodeToPosition("a", "b/bb");
        const received = treeService.storage;
        const expected = { b: { bb: { a: { aa: {} } } } };
        expect(received).toEqual(expected);
    }));
});
