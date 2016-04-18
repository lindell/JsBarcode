// Encoding documentation:
// https://en.wikipedia.org/wiki/EAN_5#Encoding

import EANencoder from './ean_encoder.js';

class EAN5{
	constructor(string){
		this.string = string;

		// Define the EAN-13 structure
		this.structure = [
			"GGLLL",
			"GLGLL",
			"GLLGL",
			"GLLLG",
			"LGGLL",
			"LLGGL",
			"LLLGG",
			"LGLGL",
			"LGLLG",
			"LLGLG"
		];
	}

	valid(){
		return this.string.search(/^[0-9]{5}$/) !== -1;
	}

	encode(){
		var encoder = new EANencoder();
		var checksum = this.checksum();

		// Start bits
		var result = "1011";

		// Use normal ean encoding with 01 in between all digits
		result += encoder.encode(this.string, this.structure[checksum], "01");

		return {
			data: result,
			text: this.string
		};
	}
	
	checksum(){
		var result = 0;

		result += parseInt(this.string[0]) * 3;
		result += parseInt(this.string[1]) * 9;
		result += parseInt(this.string[2]) * 3;
		result += parseInt(this.string[3]) * 9;
		result += parseInt(this.string[4]) * 3;

		return result % 10;
	}
}

export default EAN5;
