module.exports.toBin = mergeToBin;
module.exports.stripZero = stripZero;
module.exports.fixText = mergeToText;
module.exports.merge = merge;
module.exports.clone = clone;

module.exports.fixBin = function(a){
  return stripZero(mergeToBin(a));
}

function mergeToText(encodeData){
  if(Array.isArray(encodeData)){
    var ret = "";
    for(var i = 0; i < encodeData.length; i++){
      ret += mergeToText(encodeData[i]);
    }
    return ret;
  }
  else{
    return encodeData.text || "";
  }
}

function mergeToBin(encodeData){
  if(Array.isArray(encodeData)){
    var ret = "";
    for(var i = 0; i < encodeData.length; i++){
      ret += toBin(encodeData[i].data);
    }
    return ret;
  }
  else{
    return toBin(encodeData);
  }
}

function toBin(res){
  var ret = "";
  for(var i=0;i<res.length;i++){
    if(res[i] > 0){
      ret += "1";
    }
    else{
      ret += "0";
    }
  }
  return ret;
}

function stripZero(string){
  return string.match(/^0*(.+?)0*$/)[1];
}

function merge(old, replaceObj) {
	var newMerge = {};
	var k;
	for (k in old) {
		if (old.hasOwnProperty(k)) {
			newMerge[k] = old[k];
		}
	}
	for (k in replaceObj) {
		if(replaceObj.hasOwnProperty(k) && typeof replaceObj[k] !== "undefined"){
			newMerge[k] = replaceObj[k];
		}
	}
	return newMerge;
}

function clone(obj){
  return merge({}, obj)
}
