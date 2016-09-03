module.exports.toBin = mergeToBin;
module.exports.stripZero = stripZero;
module.exports.fixText = mergeToText;

module.exports.fixBin = function(a){
  return stripZero(mergeToBin(a));
}

function mergeToText(encodeData){
  if(Array.isArray(encodeData)){
    var ret = "";
    for(var i = 0; i < encodeData.length; i++){
      ret += encodeData[i].text || "";
    }
    return ret;
  }
  else{
    return toBin(encodeData);
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
