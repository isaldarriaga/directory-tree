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
const Service_1 = __importDefault(require("./Reader/Service"));
const Service_2 = __importDefault(require("./Writer/Service"));
class TreeService {
    constructor(IStorage) {
        this.IStorage = IStorage;
    }
    get storage() {
        // enforce read-only
        return JSON.parse(JSON.stringify(this.IStorage.storage));
    }
    // --- use reader ---
    findNode(node) {
        return __awaiter(this, void 0, void 0, function* () {
            const treeReader = new Service_1.default(this.IStorage);
            return yield treeReader.findNode(node);
        });
    }
    nodeExists(node) {
        return __awaiter(this, void 0, void 0, function* () {
            const treeReader = new Service_1.default(this.IStorage);
            return yield treeReader.nodeExists(node);
        });
    }
    nodeExistsInPosition(node, pos) {
        return __awaiter(this, void 0, void 0, function* () {
            const treeReader = new Service_1.default(this.IStorage);
            return yield treeReader.nodeExistsInPosition(node, pos);
        });
    }
    getNodeInfo(node) {
        return __awaiter(this, void 0, void 0, function* () {
            const treeReader = new Service_1.default(this.IStorage);
            return yield treeReader.getNodeInfo(node);
        });
    }
    toString() {
        return __awaiter(this, void 0, void 0, function* () {
            const treeReader = new Service_1.default(this.IStorage);
            return yield treeReader.toString();
        });
    }
    // --- use writer ---
    addNodeToPosition(node, pos) {
        return __awaiter(this, void 0, void 0, function* () {
            const treeWriter = new Service_2.default(this.IStorage);
            return yield treeWriter.addNodeToPosition(node, pos);
        });
    }
    addNode(node) {
        return __awaiter(this, void 0, void 0, function* () {
            const treeWriter = new Service_2.default(this.IStorage);
            return yield treeWriter.addNode(node);
        });
    }
    copyNodeToPosition(node, pos) {
        return __awaiter(this, void 0, void 0, function* () {
            const treeWriter = new Service_2.default(this.IStorage);
            return yield treeWriter.copyNodeToPosition(node, pos);
        });
    }
    delNodeFromPosition(node, pos) {
        return __awaiter(this, void 0, void 0, function* () {
            const treeWriter = new Service_2.default(this.IStorage);
            return yield treeWriter.delNodeFromPosition(node, pos);
        });
    }
    delNode(node) {
        return __awaiter(this, void 0, void 0, function* () {
            const treeWriter = new Service_2.default(this.IStorage);
            return yield treeWriter.delNode(node);
        });
    }
    moveNodeToPosition(node, pos) {
        return __awaiter(this, void 0, void 0, function* () {
            const treeWriter = new Service_2.default(this.IStorage);
            return yield treeWriter.moveNodeToPosition(node, pos);
        });
    }
}
exports.default = TreeService;
