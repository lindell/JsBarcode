function GenericBarcode(string){
	this.string = string;
	//this.string = parseInt(string);
	//this.string = string.toUpperCase();

  //Return the text the way it is encoded
	this.getText = function(){
		return this.string;
	};

  //Return the corresponding binary numbers for the data provided
	this.encoded = function(){
    return "10101010101010101010101010101010101010101";
	}

	//Resturn true/false if the string provided is valid for this encoder
	this.valid = function(){
		return true;
		//return false
	}
}

JsBarcode.register(["GenericBarcode","generic_barcode","GenBarcode"], GenericBarcode);
