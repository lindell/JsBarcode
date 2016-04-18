"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;


function merge(old, replaceObj) {
  var newMerge = {};
  var k;
  for (k in old) {
    newMerge[k] = old[k];
  }
  for (k in replaceObj) {
    if (typeof replaceObj[k] !== "undefined") {
      newMerge[k] = replaceObj[k];
    }
  }
  return newMerge;
}