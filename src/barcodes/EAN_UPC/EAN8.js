// Encoding documentation:
// http://www.barcodeisland.com/ean8.phtml

import EANencoder from './ean_encoder.js';
import Barcode from "../Barcode.js";

class EAN8 extends Barcode{
	constructor(data, options){
		// Add checksum if it does not exist
		if(data.search(/^[0-9]{7}$/) !== -1){
			data += checksum(data);
		}

		super(data, options);

		// Make sure the font is not bigger than the space between the guard bars
		if(!options.flat && options.fontSize > options.width * 10){
			this.fontSize = options.width * 10;
		}
		else{
			this.fontSize = options.fontSize;
		}

		// Make the guard bars go down half the way of the text
		this.guardHeight = options.height + this.fontSize / 2 + options.textMargin;

		// Adds a last character to the end of the barcode
		this.lastChar = options.lastChar;
	}

	valid(){
		return this.data.search(/^[0-9]{8}$/) !== -1 &&
			this.data[7] == checksum(this.data);
	}

	encode(){
		if(this.options.flat){
			return this.flatEncoding();
		}
		else{
			return this.guardedEncoding();
		}
	}

	guardedEncoding(){
		var encoder = new EANencoder();
		var result = [];

		var structure = 'LLLL';

		// Get the string to be encoded on the left side of the EAN code
		var leftSide = this.data.substr(0, 4);

		// Get the string to be encoded on the right side of the EAN code
		var rightSide = this.data.substr(4, 4);

		// First guard bars
		result.push({
			data: "101",
			options: {height: this.guardHeight}
		});

		// Add the left side
		result.push({
			data: encoder.encode(leftSide, structure),
			text: this.text.substr(0, 4),
			options: {fontSize: this.fontSize}
		});

		// Add the middle bits
		result.push({
			data: "01010",
			options: {height: this.guardHeight}
		});

		// Add the right side
		result.push({
			data: encoder.encode(rightSide, "RRRR"),
			text: this.text.substr(4, 4),
			options: {fontSize: this.fontSize}
		});

		// Add the end bits
		result.push({
			data: "101",
			options: {height: this.guardHeight}
		});

		return result;
	}

	flatEncoding(){
		var encoder = new EANencoder();
		var result = "";

		var structure = 'LLLL';

		result += "101";
		result += encoder.encode(this.data.substr(0, 4), structure);
		result += "01010";
		result += encoder.encode(this.data.substr(4, 4), "RRRR");
		result += "101";

		return {
			data: result,
			text: this.text
		};
	}
}

// Calulate the checksum digit
function checksum(number){
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

export default EAN8;
