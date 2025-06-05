// Encoding documentation:
// https://en.wikipedia.org/wiki/Code_93#Detailed_outline

import { SYMBOLS, BINARIES, MULTI_SYMBOLS } from './constants';
import Barcode from "../Barcode.js";

class CODE93 extends Barcode {
	constructor(data, options){
		super(data, options);
	}

	valid(){
		return /^[0-9A-Z\-. $/+%]+$/.test(this.data);
	}

	encode(){
		const symbols = this.data
			.split('')
			.flatMap(c => MULTI_SYMBOLS[c] || c);
		const encoded = symbols
			.map(s => CODE93.getEncoding(s))
			.join('');

		// Compute checksum symbols
		const csumC = CODE93.checksum(symbols, 20);
		const csumK = CODE93.checksum(symbols.concat(csumC), 15);

		return {
			text: this.text,
			data:
				// Add the start bits
				CODE93.getEncoding('\xff') +
				// Add the encoded bits
				encoded +
				// Add the checksum
				CODE93.getEncoding(csumC) + CODE93.getEncoding(csumK) +
				// Add the stop bits
				CODE93.getEncoding('\xff') +
				// Add the termination bit
				'1'
		};
	}

	// Get the binary encoding of a symbol
	static getEncoding(symbol) {
		return BINARIES[CODE93.symbolValue(symbol)];
	}

	// Get the symbol for a symbol value
	static getSymbol(symbolValue) {
		return SYMBOLS[symbolValue];
	}

	// Get the symbol value of a symbol
	static symbolValue(symbol) {
		return SYMBOLS.indexOf(symbol);
	}

	// Calculate a checksum symbol
	static checksum(symbols, maxWeight) {
		const csum = symbols
			.slice()
			.reverse()
			.reduce((sum, symbol, idx) => {
				const weight = (idx % maxWeight) + 1;
				return sum + (CODE93.symbolValue(symbol) * weight);
			}, 0);

		return CODE93.getSymbol(csum % 47);
	}
}

export default CODE93;
