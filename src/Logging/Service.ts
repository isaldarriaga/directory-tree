import 'dotenv/config';
import pino from 'pino';

export default class LoggingService {

 static logger = pino({ level: process.env.DEBUG_LEVEL ? process.env.DEBUG_LEVEL : "info" });

 static fatal(data: object) {
  this.logger.fatal(data);
 }

 static error(data: object) {
  this.logger.error(data);
 }

 static warn(data: object) {
  this.logger.warn(data);
 }

 static info(data: object) {
  this.logger.info(data);
 }

 static debug(data: object) {
  this.logger.debug(data);
 }

 static trace(data: object) {
  this.logger.trace(data);
 }

}