// Encoding documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding

import EANencoder from './ean_encoder.js';

class UPC{
	constructor(string, options){
		// Add checksum if it does not exist
		if(string.search(/^[0-9]{11}$/) !== -1){
			this.string = string + this.checksum(string);
		}
		else{
			this.string = string;
		}

		this.displayValue = options.displayValue;

		// Make sure the font is not bigger than the space between the guard bars
		if(options.fontSize > options.width * 10){
			this.fontSize = options.width * 10;
		}
		else{
			this.fontSize = options.fontSize;
		}

		// Make the guard bars go down half the way of the text
		this.guardHeight = options.height + this.fontSize / 2 + options.textMargin;
	}

	valid(){
		return this.string.search(/^[0-9]{12}$/) !== -1 &&
			this.string[11] == this.checksum(this.string);
	}

	encode(){
		var encoder = new EANencoder();
		var result = [];

		// Add the first digigt
		if(this.displayValue){
			result.push({
				data: "00000000",
				text: this.string[0],
				options: {textAlign: "left", fontSize: this.fontSize}
			});
		}

		// Add the guard bars
		result.push({
			data: "101" + encoder.encode(this.string[0], "L"),
			options: {height: this.guardHeight}
		});

		// Add the left side
		result.push({
			data: encoder.encode(this.string.substr(1, 5), "LLLLL"),
			text: this.string.substr(1, 5),
			options: {fontSize: this.fontSize}
		});

		// Add the middle bits
		result.push({
			data: "01010",
			options: {height: this.guardHeight}
		});

		// Add the right side
		result.push({
			data: encoder.encode(this.string.substr(6, 5), "RRRRR"),
			text: this.string.substr(6, 5),
			options: {fontSize: this.fontSize}
		});

		// Add the end bits
		result.push({
			data: encoder.encode(this.string[11], "R") + "101",
			options: {height: this.guardHeight}
		});

		// Add the last digit
		if(this.displayValue){
			result.push({
				data: "00000000",
				text: this.string[11],
				options: {textAlign: "right", fontSize: this.fontSize}
			});
		}

		return result;
	}

	// Calulate the checksum digit
	// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit
	checksum(number){
		var result = 0;

		var i;
		for(i = 1; i < 11; i += 2){
			result += parseInt(number[i]);
		}
		for(i = 0; i < 11; i += 2){
			result += parseInt(number[i]) * 3;
		}

		return (10 - (result % 10)) % 10;
	}
}

export default UPC;
