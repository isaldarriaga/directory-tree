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
const Service_1 = __importDefault(require("../../src/Directory/Service"));
describe('The DirectoryService object', () => {
    let directoryService;
    beforeEach(() => {
        directoryService = new Service_1.default();
    });
    test("creates a directory in the root's directory tree", () => __awaiter(void 0, void 0, void 0, function* () {
        yield directoryService.create("a");
        const received = directoryService.tree;
        const expected = { a: {} };
        expect(received).toEqual(expected);
    }));
    test("creates a directory in the tree's second level", () => __awaiter(void 0, void 0, void 0, function* () {
        yield directoryService.create("a");
        yield directoryService.create("a/b");
        const received = directoryService.tree;
        const expected = { a: { b: {} } };
        expect(received).toEqual(expected);
    }));
    test("formats a tree into its string representation", () => __awaiter(void 0, void 0, void 0, function* () {
        yield directoryService.create("a");
        yield directoryService.create("a/b");
        yield directoryService.create("a/b/c");
        yield directoryService.create("a/b/c/d");
        yield directoryService.create("a/b/e");
        yield directoryService.create("a/b/e/f");
        const received = yield directoryService.list();
        const expected = `LIST
a
  b
    c
      d
    e
      f
`;
        expect(received).toBe(expected);
    }));
    test("delete a node from a position in the tree", () => __awaiter(void 0, void 0, void 0, function* () {
        yield directoryService.create("a");
        yield directoryService.create("a/b");
        yield directoryService.create("a/b/c");
        yield directoryService.create("a/b/c/d");
        yield directoryService.create("a/b/e");
        yield directoryService.create("a/b/e/f");
        yield directoryService.delete("a/b/c");
        const received = directoryService.tree;
        const expected = {
            a: {
                b: {
                    e: {
                        f: {}
                    }
                }
            }
        };
        expect(received).toEqual(expected);
    }));
    test("move a node to a different position in the tree", () => __awaiter(void 0, void 0, void 0, function* () {
        yield directoryService.create("a");
        yield directoryService.create("a/b");
        yield directoryService.create("a/b/c");
        yield directoryService.create("a/b/c/d");
        yield directoryService.create("a/b/e");
        yield directoryService.create("a/b/e/f");
        yield directoryService.move("a/b/e", "a/b/c/d");
        const received = directoryService.tree;
        const expected = {
            a: {
                b: {
                    c: {
                        d: {
                            e: { f: {} }
                        }
                    }
                }
            }
        };
        expect(JSON.stringify(received)).toEqual(JSON.stringify(expected));
    }));
});
