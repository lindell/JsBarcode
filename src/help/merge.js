export default merge;

function merge(old, replaceObj) {
  var newMerge = {};
  for (var k in old) {
    newMerge[k] = old[k];
  }
  for (var k in replaceObj) {
    if(typeof replaceObj[k] !== "undefined"){
      newMerge[k] = replaceObj[k];
    }
  }
  return newMerge;
};
