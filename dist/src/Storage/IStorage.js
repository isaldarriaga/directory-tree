"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IStorage {
    constructor(storage, utils) {
        this.storage = storage;
        this.utils = utils;
    }
    get() {
        // enforce read-only from outside
        return JSON.parse(JSON.stringify(this.storage));
    }
    find(item) {
        throw new Error('Must implement');
    }
    add(item, value) {
        throw new Error('Must implement');
    }
    del(item) {
        throw new Error('Must implement');
    }
}
exports.default = IStorage;
