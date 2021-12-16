import CommandString from './String.js'
import fs from 'fs';
export default class CommandFile extends CommandString {

 constructor(inputFile) {
  super(fs.readFileSync(inputFile, 'utf8'))
 }

}