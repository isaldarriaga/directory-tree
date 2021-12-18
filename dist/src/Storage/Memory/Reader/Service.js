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
class MemoryReaderService {
    constructor(IStorage) {
        this.IStorage = IStorage;
    }
    get storage() {
        // enforce read-only from outside
        return JSON.parse(JSON.stringify(this.IStorage.storage));
    }
    find(item) {
        return __awaiter(this, void 0, void 0, function* () {
            var items = item.split('/'), nodePointer = this.IStorage.storage, i;
            for (i = 0; i < items.length; ++i) {
                if (nodePointer[items[i]] == undefined) {
                    return undefined;
                }
                else {
                    nodePointer = nodePointer[items[i]];
                }
            }
            return nodePointer;
        });
    }
}
exports.default = MemoryReaderService;
