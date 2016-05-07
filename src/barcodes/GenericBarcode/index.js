class GenericBarcode{
	constructor(string){
		this.string = string;
	}

	// Return the corresponding binary numbers for the data provided
	encode(){
		return {
			data: "10101010101010101010101010101010101010101",
			text: this.string
		};
	}

	// Resturn true/false if the string provided is valid for this encoder
	valid(){
		return true;
	}
}

export {GenericBarcode};
