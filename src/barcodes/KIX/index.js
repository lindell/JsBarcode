// Encoding documentation:
// https://nl.wikipedia.org/wiki/KIX-code

import Barcode from "../Barcode.js";

class KIX extends Barcode {
	constructor(data, options){
		data = data.toUpperCase();

		super(data, options);
	}

	encode(){
		let bars = [];

		// Take every character and add the binary representation to the bars
		for(let i = 0; i < this.data.length; i++){
			bars = bars.concat(getEncoding(this.data[i]));
		}

		// Add spacers
		const result = addSpacing(bars);

		return {
			data: result,
			text: this.text
		};
	}

	valid(){
		return this.data.search(/^[0-9A-Z]+$/) !== -1;
	}
}






// All characters. The position in the array is the (checksum) value
const characters = [
	"0", "1", "2", "3",
	"4", "5", "6", "7",
	"8", "9", "A", "B",
	"C", "D", "E", "F",
	"G", "H", "I", "J",
	"K", "L", "M", "N",
	"O", "P", "Q", "R",
	"S", "T", "U", "V",
	"W", "X", "Y", "Z"
];

// The decimal representation of the characters, is converted to the
// corresponding binary with the getEncoding function
const encodings = [
	"00001111", "00011011", "00011110", "01001011",
	"01001110", "01011010", "00100111", "00110011",
	"00110110", "01100011", "01100110", "01110010",
	"00101101", "00111001", "00111100", "01101001",
	"01101100", "01111000", "10000111", "10010011",
	"10010110", "11000011", "11000110", "11010010",
	"10001101", "10011001", "10011100", "11001001",
	"11001100", "11011000", "10100101", "10110001",
	"10110100", "11100001", "11100100", "11110000"
];

// Get the binary representation of a character by converting the encodings
// from decimal to binary and then to a correct bar
function getEncoding(character){

	// Relative sizes of the sync bar in the middle and the extending bars
	const relativeSize = {
		sync: 0.26,
		bar: 0.37
	};

	const encoding = [];
	const bits = getBits(character);
	// Loop over bits in pairs of 2, since we need one for both the
	// upper and lower part of the bar
	for(let i = 0; i < bits.length; i += 2) {
		let start = 0;
		let height = relativeSize.sync;

		// Check upper bit
		if (bits[i] == 1) {
			height += relativeSize.bar;
		}
		else {
			start += relativeSize.bar;
		}

		// Check lower bit
		if (bits[i + 1] == 1) {
			height += relativeSize.bar;
		}

		encoding.push({
			start: start,
			end: start + height
		});
	}
	return encoding;
}

function characterValue(character){
	return characters.indexOf(character);
}

function getBits(character){
	return encodings[characterValue(character)];
}

// Add the white space between the bars
function addSpacing(bars) {
	const result = [];
	for(let i = 0; i < bars.length; i++){
		// Skip spacer for very first bar
		if (i > 0) {
			result.push(0);
		}
		result.push(bars[i]);
	}
	return result;
}

export {KIX};
