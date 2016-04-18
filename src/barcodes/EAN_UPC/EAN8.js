// Encoding documentation:
// http://www.barcodeisland.com/ean8.phtml

import EANencoder from './ean_encoder.js';

class EAN8{
	constructor(string){
		// Add checksum if it does not exist
		if(string.search(/^[0-9]{7}$/) !== -1){
			this.string = string + this.checksum(string);
		}
		else{
			this.string = string;
		}
	}

	valid(){
		return this.string.search(/^[0-9]{8}$/) !== -1 &&
			this.string[7] == this.checksum(this.string);
	}

	encode(){
		var encoder = new EANencoder();

		// Create the return variable
		var result = "";

		// Get the number to be encoded on the left side of the EAN code
		var leftSide = this.string.substr(0, 4);

		// Get the number to be encoded on the right side of the EAN code
		var rightSide = this.string.substr(4, 4);

		// Add the start bits
		result += encoder.startBin;

		// Add the left side
		result += encoder.encode(leftSide, "LLLL");

		// Add the middle bits
		result += encoder.middleBin;

		// Add the right side
		result += encoder.encode(rightSide, "RRRR");

		// Add the end bits
		result += encoder.endBin;

		return {
			data: result,
			text: this.string
		};
	}

	// Calulate the checksum digit
	checksum(number){
		var result = 0;

		var i;
		for(i = 0; i < 7; i += 2){
			result += parseInt(number[i]) * 3;
		}

		for(i = 1; i < 7; i += 2){
			result += parseInt(number[i]);
		}

		return (10 - (result % 10)) % 10;
	}
}

export default EAN8;
