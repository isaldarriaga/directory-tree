import CommandString from './String'
import fs from 'fs';
export default class CommandFile extends CommandString {

 constructor(inputFile: string) {
  super(fs.readFileSync(inputFile, 'utf8'))
 }

}