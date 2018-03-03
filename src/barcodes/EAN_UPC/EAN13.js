// Encoding documentation:
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Binary_encoding_of_data_digits_into_EAN-13_barcode

import { SIDE_BIN, MIDDLE_BIN, EAN13_STRUCTURE } from './constants';
import encode from './encoder';
import Barcode from '../Barcode';

// Calculate the checksum digit
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit
const checksum = (number) => {
	const res = number
		.substr(0, 12)
		.split('')
		.map((n) => +n)
		.reduce((sum, a, idx) => {
			return idx % 2
				? sum + a * 3
				: sum + a;
		}, 0);

	return (10 - (res % 10)) % 10;
};

class EAN13 extends Barcode {

	constructor(data, options) {
		// Add checksum if it does not exist
		if (data.search(/^[0-9]{12}$/) !== -1) {
			data += checksum(data);
		}

		super(data, options);

		// Make sure the font is not bigger than the space between the guard bars
		this.fontSize = !options.flat && options.fontSize > options.width * 10
			? options.width * 10
			: options.fontSize;

		// Make the guard bars go down half the way of the text
		this.guardHeight = options.height + this.fontSize / 2 + options.textMargin;

		// Adds a last character to the end of the barcode
		this.lastChar = options.lastChar;
	}

	valid() {
		return (
			this.data.search(/^[0-9]{13}$/) !== -1 &&
			+this.data[12] === checksum(this.data)
		);
	}

	encode() {
		return this.options.flat
			? this.encodeFlat()
			: this.encodeGuarded();
	}

	get leftData() {
		return this.data.substr(1, 6);
	}

	get rightData() {
		return this.data.substr(7, 6);
	}

	// The "standard" way of printing EAN13 barcodes with guard bars
	encodeGuarded() {
		const textOptions = { fontSize: this.fontSize };
		const guardOptions = { height: this.guardHeight };

		const data = [
			{
				data: SIDE_BIN,
				options: guardOptions
			},
			{
				data: encode(this.leftData, EAN13_STRUCTURE[this.data[0]]),
				text: this.text.substr(1, 6),
				options: textOptions
			},
			{
				data: MIDDLE_BIN,
				options: guardOptions
			},
			{
				data: encode(this.rightData, 'RRRRRR'),
				text: this.text.substr(7, 6),
				options: textOptions
			},
			{
				data: SIDE_BIN,
				options: guardOptions
			},
		];

		if (this.options.displayValue) {
			data.unshift({
				data: '000000000000',
				text: this.text.substr(0, 1),
				options: { textAlign: 'left', ...textOptions }
			});

			if (this.options.lastChar) {
				data.push({
					data: '00'
				});
				data.push({
					data: '00000',
					text: this.options.lastChar,
					options: textOptions
				});
			}
		}

		return data;
	}

	encodeFlat() {
		const left = encode(this.leftData, EAN13_STRUCTURE[this.data[0]]);
		const right = encode(this.rightData, 'RRRRRR');

		return {
			data: [SIDE_BIN, left, MIDDLE_BIN, right, SIDE_BIN].join(''),
			text: this.text
		};
	}

}

export default EAN13;
