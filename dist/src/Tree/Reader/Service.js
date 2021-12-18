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
Object.defineProperty(exports, "__esModule", { value: true });
class TreeReaderService {
    constructor(IStorage) {
        this.IStorage = IStorage;
    }
    get storage() {
        // enforce read-only from outside
        return JSON.parse(JSON.stringify(this.IStorage.storage));
    }
    findNode(node) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.IStorage.find(node);
        });
    }
    nodeExists(node) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findNode(node);
            if (result) {
                return true;
            }
            return false;
        });
    }
    nodeExistsInPosition(node, pos) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nodeExists(pos + '/' + node);
        });
    }
    getNodeInfo(node) {
        return __awaiter(this, void 0, void 0, function* () {
            const parent = node.substring(0, node.lastIndexOf('/'));
            const me = yield this.findNode(node);
            const children = me ? Object.keys(me).sort((a, b) => a.localeCompare(b)) : [];
            if (parent.length === 0) {
                // we're on root
                return {
                    parent: {
                        exists: true,
                        path: ''
                    },
                    me: {
                        exists: yield this.nodeExists(node),
                        path: node
                    },
                    children: children
                };
            }
            const dirNames = node.split('/');
            var curDir = "", exists;
            for (const dirName of dirNames) {
                curDir += dirName;
                exists = yield this.nodeExists(curDir);
                if (exists) {
                    if (curDir !== parent) {
                        curDir += '/';
                        continue;
                    }
                    else {
                        return {
                            parent: {
                                exists: true,
                                path: parent
                            },
                            me: {
                                exists: yield this.nodeExists(node),
                                path: node
                            },
                            children: children
                        };
                    }
                }
                else {
                    return {
                        parent: {
                            exists: false,
                            path: parent
                        },
                        me: {
                            exists: false,
                            path: node
                        },
                        children: children
                    };
                }
            }
            return {
                parent: {
                    exists: false,
                    path: ''
                },
                me: {
                    exists: false,
                    path: ''
                },
                children: []
            };
        });
    }
    // call it without arguments to print from root!
    toString(tree, level) {
        return __awaiter(this, void 0, void 0, function* () {
            tree = tree ? tree : this.storage; // a clone! (prevent mutation)
            level = level ? level : 0;
            const spaces = new Array(2 * level + 1).join(' ');
            var output = '';
            // sort names alphabetically
            const siblings = Object.keys(tree).sort((a, b) => a.localeCompare(b));
            for (const node of siblings) {
                if (this.IStorage.utils.isEmpty(tree[node])) {
                    output += spaces + node + '\n';
                }
                else {
                    output += spaces + node + '\n' + (yield this.toString(tree[node], level + 1));
                }
            }
            return output;
        });
    }
}
exports.default = TreeReaderService;
