function GenericBarcode(string){
  //Return the text the way it is encoded
	this.getText = function(){
    //return parseInt(string);
    //return string.toUpperCase();
		return string;
	};

  //Return the corresponding binary numbers for the data provided
	this.encoded = function(){
    return "10101010101010101010101010101010101010101";
	}

	//Resturn true/false if the string provided is valid for this encoder
	this.valid = function(){
    //return false
		return true;
	}
}

JsBarcode.bind(["GenericBarcode","generic_barcode","GenBarcode"], GenericBarcode);
