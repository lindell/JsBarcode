// Encoding documentation:
// https://en.wikipedia.org/wiki/Code_93#Detailed_outline

import { CHARACTERS, BINARIES } from './constants';
import Barcode from "../Barcode.js";

class CODE93 extends Barcode {
	constructor(data, options){
		data = data.toUpperCase();

		super(data, options);
	}

	valid(){
		return /^[0-9A-Z\-. $/+%]+$/.test(this.data);
	}

	encode(){
		const chars = this.data.split('');
		const encoded = chars
			.map(c => getEncoding(c))
			.join('');

		// Compute checksum characters
		const csumC = checksum(chars, 20);
		const csumK = checksum(chars.concat(csumC), 15);

		return {
			text: this.text,
			data:
				// Add the start bits
				getEncoding('*') +
				// Add the encoded bits
				encoded +
				// Add the checksum
				getEncoding(csumC) + getEncoding(csumK) +
				// Add the stop bits
				getEncoding('*') +
				// Add the termination bit
				'1'
		};
	}
}

// Get the binary encoding of a character
const getEncoding = (character) => {
	return BINARIES[characterValue(character)];
};

// Get the character for a character value
const getCharacter = (characterValue) => {
	return CHARACTERS[characterValue];
};

// Get the character value of a character
const characterValue = (character) => {
	return CHARACTERS.indexOf(character);
};

// Calculate a checksum character
const checksum = (data, maxWeight) => {
	const csum = data
		.slice()
		.reverse()
		.reduce((sum, c, idx) => {
			let weight = (idx % maxWeight) + 1;
			return sum + (characterValue(c) * weight);
		}, 0);

	return getCharacter(csum % 47);
};

export {CODE93};
