// Encoding documentation:
// http://www.barcodeisland.com/ean8.phtml

import { SIDE_BIN, MIDDLE_BIN } from './constants';
import encode from './encoder';
import Barcode from "../Barcode";

// Calculate the checksum digit
const checksum = (number) => {
	const res = number
		.substr(0, 7)
		.split('')
		.map((n) => +n)
		.reduce((sum, a, idx) => (
			idx % 2 ? sum + a : sum + a * 3
		), 0);

	return (10 - (res % 10)) % 10;
};

class EAN8 extends Barcode {

	constructor(data, options) {
		// Add checksum if it does not exist
		if(data.search(/^[0-9]{7}$/) !== -1){
			data += checksum(data);
		}

		super(data, options);
	}

	valid() {
		return (
			this.data.search(/^[0-9]{8}$/) !== -1 &&
			+this.data[7] === checksum(this.data)
		);
	}

	get leftData() {
		return this.data.substr(0, 4);
	}

	get rightData() {
		return this.data.substr(4, 4);
	}

	encode() {
		const data = [
			SIDE_BIN,
			encode(this.leftData, 'LLLL'),
			MIDDLE_BIN,
			encode(this.rightData, 'RRRR'),
			SIDE_BIN,
		];

		return {
			data: data.join(''),
			text: this.text
		};
	}

}

export default EAN8;
