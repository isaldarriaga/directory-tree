
var getNestedObject = function (obj, field) {
 if (!obj[field]) {
  var caretPos = field.indexOf('[');
  if (caretPos !== -1) {
   return obj[field.substring(0, caretPos - 1)] = [];
  } else {
   return obj[field] = {};
  }
 } else {
  return obj[field];
 }
};

module.exports = {
 getNestedObject: getNestedObject
}