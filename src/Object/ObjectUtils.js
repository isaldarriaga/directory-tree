export default class ObjectUtils {

 isEmpty(obj) {
  return obj
   && Object.keys(obj).length === 0
   && Object.getPrototypeOf(obj) === Object.prototype;
 }

 getValueSafely(value) {
  if (typeof value === 'object' && Array.isArray(value)) {
   return value[0];
  } else {
   return value;
  }
 }

 // do it safe for array and objects
 getValueOf(property, obj) {
  if (!obj[property]) {
   var caretPos = property.indexOf('[');
   if (caretPos !== -1) {
    return obj[property.substring(0, caretPos - 1)] = [];
   } else {
    return obj[property] = {};
   }
  } else {
   return obj[property];
  }
 }

}
