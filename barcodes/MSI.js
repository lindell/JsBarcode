var prototype = {};

prototype.getText = function(){
	return this.string;
};

prototype.encoded = function(){
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

prototype.valid = function(){
  return this.string.search(/^[0-9]+$/) != -1;
};

function MSI(string){
	this.string = ""+string;
}

MSI.prototype = Object.create(prototype);

function MSI10(string){
	this.string = ""+string;
  this.string += mod10(this.string);
}
MSI10.prototype = Object.create(prototype);

function MSI11(string){
	this.string = ""+string;
  this.string += mod11(this.string);
}
MSI11.prototype = Object.create(prototype);

function MSI1010(string){
	this.string = ""+string;
  this.string += mod10(this.string);
  this.string += mod10(this.string);
}
MSI1010.prototype = Object.create(prototype);

function MSI1110(string){
	this.string = ""+string;
  this.string += mod11(this.string);
  this.string += mod10(this.string);
}
MSI1110.prototype = Object.create(prototype);

function mod10(number){
  var sum = 0;
  for(var i=0;i<number.length;i++){
    var n = parseInt(number[i]);
    if((i + number.length) % 2 == 0){
      sum += n;
    }
    else{
      sum += (n*2)%10 + Math.floor((n*2)/10)
    }
  }
  return (10-(sum%10))%10;
}

function mod11(number){
  var sum = 0;
  var weights = [2,3,4,5,6,7];
  for(var i=0;i<number.length;i++){
    var n = parseInt(number[number.length-1-i]);
    sum += weights[i % weights.length] * n;
  }
  return (11-(sum%11))%11;
}

function addZeroes(number, n){
  for(var i=0;i<n;i++){
    number = "0"+number;
  }
  return number;
}

//Required to register for both browser and nodejs
var register = function(core){
	core.register(MSI, /^MSI$/i, 4);
	core.register(MSI10, /^MSI.?10$/i);
  core.register(MSI11, /^MSI.?11$/i);
  core.register(MSI1010, /^MSI.?1010$/i);
  core.register(MSI1110, /^MSI.?1110$/i);
}
try{register(JsBarcode)} catch(e){}
try{module.exports.register = register} catch(e){}
