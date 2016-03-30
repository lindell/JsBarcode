function GenericBarcode(string){
	//Return the text the way it is encoded
	this.getText = function(){
		return string;
	};

	//Return the corresponding binary numbers for the data provided
	this.encoded = function(){
		return "10101010101010101010101010101010101010101";
	};

	//Resturn true/false if the string provided is valid for this encoder
	this.valid = function(){
		return true;
	};
}

//Required to register for both browser and nodejs
var register = function(core){
	core.register(GenericBarcode, /^GEN(ERIC(BARCODE)?)?$/i, 0);
}
try{register(JsBarcode)} catch(e){}
try{module.exports.register = register} catch(e){}
