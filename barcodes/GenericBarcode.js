function GenericBarcode(string){
	this.string = string;
}

//Return the text the way it is encoded
GenericBarcode.prototype.getText = function(){
	return this.string;
};

//Return the corresponding binary numbers for the data provided
GenericBarcode.prototype.encoded = function(){
	return "10101010101010101010101010101010101010101";
};

//Resturn true/false if the string provided is valid for this encoder
GenericBarcode.prototype.valid = function(){
	return true;
};

//Required to register for both browser and nodejs
var register = function(core){
	core.register(GenericBarcode, /^GEN(ERIC(BARCODE)?)?$/i, 0);
}
try{register(JsBarcode)} catch(e){}
try{module.exports.register = register} catch(e){}
