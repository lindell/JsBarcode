// Encoding documentation:
// https://en.wikipedia.org/wiki/Code_93#Detailed_outline

import { SYMBOLS, BINARIES } from './constants';
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
		const symbols = this.data.split('');
		const encoded = symbols
			.map(s => getEncoding(s))
			.join('');

		// Compute checksum symbols
		const csumC = checksum(symbols, 20);
		const csumK = checksum(symbols.concat(csumC), 15);

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

// Get the binary encoding of a symbol
const getEncoding = (symbol) => {
	return BINARIES[symbolValue(symbol)];
};

// Get the symbol for a symbol value
const getSymbol = (symbolValue) => {
	return SYMBOLS[symbolValue];
};

// Get the symbol value of a symbol
const symbolValue = (symbol) => {
	return SYMBOLS.indexOf(symbol);
};

// Calculate a checksum symbol
const checksum = (symbols, maxWeight) => {
	const csum = symbols
		.slice()
		.reverse()
		.reduce((sum, symbol, idx) => {
			const weight = (idx % maxWeight) + 1;
			return sum + (symbolValue(symbol) * weight);
		}, 0);

	return getSymbol(csum % 47);
};

export {CODE93};
