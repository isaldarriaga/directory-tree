import FileSystemReader from "./FileSystemReader";
import FileUtils from "./Utils";

export default class FileSystemWriter extends FileSystemReader {

 utils;

 constructor(obj) {
  super(obj);
  this.utils = new FileUtils();
 }

 addProperty(property, value) {
  var modified = false;
  if (property) {
   if (typeof this.obj === 'object' && Array.isArray(this.obj) && this.obj.length > 0) {
    this.obj = this.obj[0];
   }
   if (property.indexOf('/') === -1) {
    this.obj[property] = this.utils.getValueSafely(value);
    modified = true;
   } else {
    // build nested nodes in model
    var propNames = property.split('/');
    var propNode = this.utils.getValueOf(propNames[0], this.obj);
    for (var i = 1; i < propNames.length; i++) {
     if (i === propNames.length - 1) {
      propNode[propNames[i]] = this.utils.getValueSafely(value);
      modified = true;
     } else {
      propNode = this.utils.getValueOf(propNames[i], propNode);
     }
    }
   }
  }
  return modified;
 }

 delProperty(property) {
  var modified = false;
  if (property) {
   if (typeof this.obj === 'object' && Array.isArray(this.obj) && this.obj.length > 0) {
    this.obj = this.obj[0];
   }
   if (property.indexOf('/') === -1) {
    delete this.obj[property];
    modified = true;
   } else {
    // build nested nodes in model
    var propNames = property.split('/');
    var propNode = this.utils.getValueOf(propNames[0], this.obj);
    for (var i = 1; i < propNames.length; i++) {
     if (i === propNames.length - 1) {
      delete propNode[propNames[i]];
      modified = true;
     } else {
      propNode = this.utils.getValueOf(propNames[i], propNode);
     }
    }
   }
  }
  return modified;
 }

}