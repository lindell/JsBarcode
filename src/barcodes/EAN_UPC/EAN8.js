// Encoding documentation:
// http://www.barcodeisland.com/ean8.phtml

import encodeEAN from './encoder';
import { SIDE_BIN, MIDDLE_BIN } from './constants';

// Calculate the checksum digit
const checksum = number => {
	const res = number
		.substr(0, 7)
		.split('')
		.map(n => +n)
		.reduce((sum, a, idx) => (idx % 2 ? sum + a : sum + a * 3), 0);

	return (10 - (res % 10)) % 10;
};

function valid(data) {
	return data.search(/^[0-9]{8}$/) !== -1 && +data[7] === checksum(data);
}

const leftSide = data => data.substr(0, 4);
const rightSide = data => data.substr(4, 4);

function encode(data, options) {
	const leftData = leftSide(data);
	const leftEncoded = encodeEAN(leftData, 'LLLL');

	const rightData = rightSide(data);
	const rightEncoded = encodeEAN(rightData, 'RRRR');

	// Make sure the font is not bigger than the space between the guard bars
	const fontSize = !options.flat && options.fontSize > options.width * 10 ? options.width * 10 : options.fontSize;
	// Make the guard bars go down half the way of the text
	const guardHeight = options.height + fontSize / 2 + options.textMargin;	

	const encodingData = {
		fontSize,
		guardHeight,

		leftEncoded,
		rightEncoded,
	};

	return options.flat ? encodeFlat(encodingData, data, options) : encodeGuarded(encodingData, data, options);
}

function encodeGuarded({
	fontSize,
	guardHeight,
	leftEncoded,
	rightEncoded,
}, data, options) {
	const textOptions = { fontSize };
	const guardOptions = { height: guardHeight };
	const text = options.text || data;

	const encoded = [
		{ data: SIDE_BIN, options: guardOptions },
		{ data: leftEncoded, text: leftSide(text), options: textOptions },
		{ data: MIDDLE_BIN, options: guardOptions },
		{
			data: rightEncoded,
			text: rightSide(text),
			options: textOptions
		},
		{ data: SIDE_BIN, options: guardOptions }
	];

	return encoded;
}

function encodeFlat({
	leftEncoded,
	rightEncoded,
}, data, options) {
	return {
		data: [SIDE_BIN, leftEncoded, MIDDLE_BIN, rightEncoded, SIDE_BIN].join(''),
		text: options.text || data,
	};
}

export default {
	encode,
	valid,
};
