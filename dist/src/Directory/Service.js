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
const Service_1 = __importDefault(require("../Tree/Service"));
const Service_2 = __importDefault(require("../Storage/Memory/Service"));
const Service_3 = __importDefault(require("../Logging/Service"));
class DirectoryService {
    constructor() {
        // Inject any IStorage implementation based on the backend under use!
        // e.g: MemoryService, DiskService, RemoteService, etc.
        this.treeService = new Service_1.default(new Service_2.default({}));
    }
    get tree() {
        return this.treeService.storage;
    }
    create(dir, pos) {
        return __awaiter(this, void 0, void 0, function* () {
            const cmd = "CREATE";
            var info = yield this.treeService.getNodeInfo(pos ? pos + '/' + dir : dir);
            var output = '';
            if (info.parent.exists) {
                var infoCreation;
                if (!pos) {
                    infoCreation = yield this.treeService.addNode(dir);
                }
                else {
                    infoCreation = yield this.treeService.addNodeToPosition(dir, pos);
                }
                if (!infoCreation.me.exists) {
                    const msg = "Couldn't " + cmd.toLowerCase() + ' ' + dir + '. Info available: ' + JSON.stringify(infoCreation);
                    Service_3.default.fatal({
                        class: this.constructor.name,
                        function: this.create.name,
                        msg: msg,
                        infoCreation: infoCreation
                    });
                    throw new Error(msg);
                }
                output = cmd + ' ' + infoCreation.me.path;
            }
            else {
                output = cmd + ' ' + pos + '/' + dir + '\n';
                output += 'Cannot ' + cmd.toLowerCase() + ' ' + pos + '/' + dir + ' - ' + info.parent.path + ' does not exist';
            }
            return output + '\n';
        });
    }
    delete(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const cmd = "DELETE";
            var info = yield this.treeService.getNodeInfo(dir);
            var output = '';
            if (info.parent.exists) {
                const infoDeletion = yield this.treeService.delNode(dir);
                if (infoDeletion.me.exists) {
                    const msg = "Couldn't " + cmd.toLowerCase() + ' ' + dir + '. Info available: ' + JSON.stringify(infoDeletion);
                    Service_3.default.fatal({
                        class: this.constructor.name,
                        function: this.delete.name,
                        msg: msg,
                        infoDeletion: infoDeletion
                    });
                    throw new Error(msg);
                }
                output = cmd + ' ' + infoDeletion.me.path;
            }
            else {
                output = cmd + ' ' + dir + '\n';
                output += 'Cannot ' + cmd.toLowerCase() + ' ' + dir + ' - ' + info.parent.path + ' does not exist';
            }
            return output + '\n';
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const cmdOutput = "LIST" + "\n";
            const treeOutput = yield this.treeService.toString();
            return cmdOutput + treeOutput;
        });
    }
    move(dir, pos) {
        return __awaiter(this, void 0, void 0, function* () {
            const cmd = "MOVE";
            var output = '';
            // get both dir (source) and pos (destination) concurrently
            // useful for slow I/O (DiskService, RemoteService, etc.)
            let [infoDir, infoPos] = yield Promise.all([
                yield this.treeService.getNodeInfo(dir),
                yield this.treeService.getNodeInfo(pos),
            ]);
            if (infoDir.me.exists && infoPos.me.exists) {
                const infoMovement = yield this.treeService.moveNodeToPosition(dir, pos);
                if (infoMovement.source.exists || !infoMovement.destination.exists) {
                    const msg = "Couldn't " + cmd.toLowerCase() + ' ' + dir + ' to ' + pos + '. Info available: ' + JSON.stringify(infoMovement);
                    Service_3.default.fatal({
                        class: this.constructor.name,
                        function: this.move.name,
                        msg: msg,
                        infoMovement: infoMovement
                    });
                    throw new Error(msg);
                }
                output = cmd + ' ' + infoMovement.source.path + ' ' + pos;
            }
            else {
                output = cmd + ' ' + dir + ' ' + pos + '\n';
                output += 'Cannot ' + cmd.toLowerCase() + ' ' + dir + ' - ' + (!infoDir.me.exists ? infoDir.me.path : infoDir.parent.path) + ' does not exist';
            }
            return output + '\n';
        });
    }
}
exports.default = DirectoryService;
