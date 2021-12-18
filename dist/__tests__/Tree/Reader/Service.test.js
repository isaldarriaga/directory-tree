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
const Service_2 = __importDefault(require("../../../src/Tree/Reader/Service"));
describe('The TreeReaderService object', () => {
    let treeService;
    beforeEach(() => {
        treeService = new Service_2.default(new Service_1.default({ a: { b: { c: { d: {} }, e: { f: {} } } } }));
    });
    test("finds a node in the tree", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield treeService.findNode("a/b");
        const expected = { c: { d: {} }, e: { f: {} } };
        expect(result).toEqual(expected);
    }));
    test("formats a tree into an string representation", () => __awaiter(void 0, void 0, void 0, function* () {
        const received = yield treeService.toString();
        const expected = `a
  b
    c
      d
    e
      f
`;
        expect(received).toBe(expected);
    }));
    test("returns the info of a node in the tree", () => __awaiter(void 0, void 0, void 0, function* () {
        const received = yield treeService.getNodeInfo("a/b");
        const expected = {
            parent: {
                exists: true,
                path: 'a'
            },
            me: {
                exists: true,
                path: 'a/b'
            },
            children: ['c', 'e']
        };
        expect(JSON.stringify(received)).toBe(JSON.stringify(expected));
    }));
});
