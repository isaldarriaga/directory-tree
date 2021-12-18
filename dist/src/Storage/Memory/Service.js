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
const IStorage_1 = __importDefault(require("../IStorage"));
const Service_1 = __importDefault(require("./Reader/Service"));
const Service_2 = __importDefault(require("./Writer/Service"));
const Utils_1 = __importDefault(require("./Utils"));
class MemoryService extends IStorage_1.default {
    constructor(storage) {
        super(storage, new Utils_1.default());
    }
    find(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const memoryReader = new Service_1.default(this);
            return yield memoryReader.find(item);
        });
    }
    add(item, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const memoryWriter = new Service_2.default(this);
            return yield memoryWriter.add(item, value);
        });
    }
    del(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const memoryWriter = new Service_2.default(this);
            return yield memoryWriter.del(item);
        });
    }
}
exports.default = MemoryService;
