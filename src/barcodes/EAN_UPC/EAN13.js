// Encoding documentation:
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Binary_encoding_of_data_digits_into_EAN-13_barcode

import { EAN13_STRUCTURE } from './constants';
import encodeEAN from './encoder';
import { SIDE_BIN, MIDDLE_BIN } from './constants';

// Calculate the checksum digit
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit
const checksum = number => {
	const res = number
		.substr(0, 12)
		.split('')
		.map(n => +n)
		.reduce((sum, a, idx) => (idx % 2 ? sum + a * 3 : sum + a), 0);

	return (10 - (res % 10)) % 10;
};

const firstData = data => data[0];
const leftSide = data => data.substr(1, 6);
const rightSide = data => data.substr(7, 6);

function encode(data, options, flat) {
	const leftData = leftSide(data);
	const leftStructure = EAN13_STRUCTURE[firstData(data)];
	const leftEncoded = encodeEAN(leftData, leftStructure);

	const rightData = rightSide(data);
	const rightEncoded = encodeEAN(rightData, 'RRRRRR');

	// Make sure the font is not bigger than the space between the guard bars
	const fontSize = !flat && options.fontSize > options.width * 10 ? options.width * 10 : options.fontSize;
	// Make the guard bars go down half the way of the text
	const guardHeight = options.height + fontSize / 2 + options.textMargin;

	const encodingData = {
		fontSize,
		guardHeight,

		leftEncoded,
		rightEncoded,
	};

	return flat ? encodeFlat(encodingData, data, options) : encodeGuarded(encodingData, data, options);
}

function valid(data) {
	return data.search(/^[0-9]{13}$/) !== -1 && +data[12] === checksum(data);
}

// The "standard" way of printing EAN13 barcodes with guard bars
function encodeGuarded({ fontSize, guardHeight, leftEncoded, rightEncoded }, data, { lastChar, displayValue, text }) {
	const textOptions = { fontSize };
	const guardOptions = { height: guardHeight };
	const displayText = text || data;

	const encoded = [
		{ data: SIDE_BIN, options: guardOptions },
		{ data: leftEncoded, text: leftSide(displayText), options: textOptions },
		{ data: MIDDLE_BIN, options: guardOptions },
		{
			data: rightEncoded,
			text: rightSide(displayText),
			options: textOptions,
		},
		{ data: SIDE_BIN, options: guardOptions },
	];

	// Extend data with left digit & last character
	if (displayValue) {
		encoded.unshift({
			data: '000000000000',
			text: firstData(displayText),
			options: { textAlign: 'left', fontSize },
		});

		if (lastChar) {
			encoded.push({
				data: '00',
			});
			encoded.push({
				data: '00000',
				text: lastChar,
				options: { fontSize },
			});
		}
	}

	return encoded;
}

function encodeFlat({ leftEncoded, rightEncoded }, data, options) {
	return {
		data: [SIDE_BIN, leftEncoded, MIDDLE_BIN, rightEncoded, SIDE_BIN].join(''),
		text: options.text || data,
	};
}

export default (eanOptions = { flat: false }) => ({
	encode: (data, options) => encode(data, options, eanOptions.flat),
	valid,
});
