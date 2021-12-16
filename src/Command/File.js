import CommandString from './String.js'
export default class CommandFile extends CommandString {

 constructor(inputFile) {
  super(require('fs').readFileSync(inputFile, 'utf8'))
 }

}