import pino from 'pino';

export default class LoggingService {

 // this instruction load .env file into process.env
 static config = require('dotenv').config();
 static logger = pino({ level: process.env.DEBUG_LEVEL ? process.env.DEBUG_LEVEL : "info" });

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