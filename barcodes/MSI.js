function MSI(string){
	this.string = ""+string;

  this.string += checksum(this.string, false);
}

MSI.prototype.getText = function(){
	return this.string;
};

MSI.prototype.encoded = function(){
	var ret = "110";

  for(var i=0;i<this.string.length;i++){
    var digit = parseInt(this.string[i]);
    var bin = digit.toString(2);
    bin = addZeroes(bin, 4-bin.length);
    for(var b=0;b<bin.length;b++){
      ret += bin[b]==0 ? "100" : "110";
    }
  }

  ret += "1001";
  return ret;
};

MSI.prototype.valid = function(){
  return this.string.search(/^[0-9]+$/) != -1;
};

function checksum(number, skipLast){
  var sum = 0;
  var loops = skipLast ? number.length - 1 : number.length;
  for(var i=0;i<loops;i++){
    var n = parseInt(number[i]);
    if((i + loops) % 2 == 0){
      sum += n;
    }
    else{
      sum += (n*2)%10 + Math.floor((n*2)/10)
    }
  }
  return (10-(sum%10))%10;
}

function addZeroes(number, n){
  for(var i=0;i<n;i++){
    number = "0"+number;
  }
  return number;
}

//Required to register for both browser and nodejs
var register = function(core){
	core.register(["MSI","msi"], MSI);
}
try{register(JsBarcode)} catch(e){}
try{module.exports.register = register} catch(e){}
