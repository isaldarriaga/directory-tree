"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pino_1 = __importDefault(require("pino"));
class LoggingService {
    static fatal(data) {
        this.logger.fatal(data);
    }
    static error(data) {
        this.logger.error(data);
    }
    static warn(data) {
        this.logger.warn(data);
    }
    static info(data) {
        this.logger.info(data);
    }
    static debug(data) {
        this.logger.debug(data);
    }
    static trace(data) {
        this.logger.trace(data);
    }
}
exports.default = LoggingService;
LoggingService.logger = (0, pino_1.default)({ level: process.env.DEBUG_LEVEL ? process.env.DEBUG_LEVEL : "info" });
