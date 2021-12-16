import pino from 'pino';

export default class LoggingService {

 static logger = pino({ level: process.env.DEBUG_LEVEL ? process.env.DEBUG_LEVEL : "info" });

 static debug(info) {
  this.logger.debug(info);
 }

 static error(info) {
  this.logger.error(info);
 }

}