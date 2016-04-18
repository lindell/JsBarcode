// Encoding documentation:
// https://en.wikipedia.org/wiki/EAN_2#Encoding

import EANencoder from './ean_encoder.js';

class EAN2{
	constructor(string){
		this.string = string;

		this.structure = ["LL", "LG", "GL", "GG"];
	}

	valid(){
		return this.string.search(/^[0-9]{2}$/) !== -1;
	}

	encode(){
		var encoder = new EANencoder();

		// Choose the structure based on the number mod 4
		var structure = this.structure[parseInt(this.string) % 4];

		// Start bits
		var result = "1011";

		// Encode the two digits with 01 in between
		result += encoder.encode(this.string, structure, "01");

		return {
			data: result,
			text: this.string
		};
	}
}

export default EAN2;
