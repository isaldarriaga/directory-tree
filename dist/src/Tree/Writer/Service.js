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
const Service_1 = __importDefault(require("../Reader/Service"));
class TreeWriterService extends Service_1.default {
    constructor(IStorage) {
        super(IStorage);
    }
    addNodeToPosition(node, pos) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.addNode(pos + '/' + node);
        });
    }
    addNode(node) {
        return __awaiter(this, void 0, void 0, function* () {
            this.IStorage.add(node, {});
            return this.getNodeInfo(node);
        });
    }
    copyNodeToPosition(node, pos) {
        return __awaiter(this, void 0, void 0, function* () {
            const destinationInfo = yield this.getNodeInfo(pos);
            let valueToCopy, destinationNode;
            if (destinationInfo.parent.path === '') {
                valueToCopy = yield this.findNode(node);
                destinationNode = this.IStorage.storage;
            }
            else {
                [valueToCopy, destinationNode] = yield Promise.all([
                    yield this.findNode(node),
                    yield this.findNode(destinationInfo.parent.path === '' ? pos : destinationInfo.parent.path)
                ]);
            }
            const sourceDirName = node.substring(node.lastIndexOf('/') + 1);
            const destinationDirName = pos.substring(pos.lastIndexOf('/') + 1);
            destinationNode[destinationDirName][sourceDirName] = JSON.parse(JSON.stringify(valueToCopy));
            return this.getNodeInfo(pos + '/' + sourceDirName);
        });
    }
    delNodeFromPosition(node, pos) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delNode(pos + '/' + node);
        });
    }
    delNode(node) {
        return __awaiter(this, void 0, void 0, function* () {
            this.IStorage.del(node);
            return this.getNodeInfo(node);
        });
    }
    moveNodeToPosition(node, pos) {
        return __awaiter(this, void 0, void 0, function* () {
            var infoSourceBeforeMove = yield this.getNodeInfo(node);
            const nodeName = node.substring(node.lastIndexOf('/') + 1);
            var infoDestinationAfterCopy;
            if (infoSourceBeforeMove.children.length > 0) {
                // copy the object recursively
                infoDestinationAfterCopy = yield this.copyNodeToPosition(node, pos);
            }
            else {
                // just create it
                infoDestinationAfterCopy = yield this.addNodeToPosition(nodeName, pos);
            }
            if (infoDestinationAfterCopy.me.exists) {
                this.delNode(node);
            }
            let [infoSource, infoDestination] = yield Promise.all([
                yield this.getNodeInfo(node),
                yield this.getNodeInfo(pos + '/' + nodeName),
            ]);
            return {
                source: infoSource.me,
                destination: infoDestination.me
            };
        });
    }
}
exports.default = TreeWriterService;
