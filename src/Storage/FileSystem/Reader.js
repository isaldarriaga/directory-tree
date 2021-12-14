export default class FileSystemReader {

 obj;

 constructor(obj) {
  this.obj = obj;
 }

 async find(pathToProperty) {
  var props = pathToProperty.split('/')
   , current = this.obj
   , i;

  for (i = 0; i < props.length; ++i) {
   if (current[props[i]] == undefined) {
    return undefined;
   } else {
    current = current[props[i]];
   }
  }
  return current;
 }

}