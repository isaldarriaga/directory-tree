"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DiskWriterService {
    constructor(IStorage) {
        this.IStorage = IStorage;
    }
    get storage() {
        // enforce read-only from outside
        return JSON.parse(JSON.stringify(this.IStorage.storage));
    }
    add(item, value) {
        throw new Error('Not implemented');
    }
    del(item) {
        throw new Error('Not implemented');
    }
}
exports.default = DiskWriterService;
