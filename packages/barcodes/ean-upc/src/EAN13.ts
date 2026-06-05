// Encoding documentation:
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Binary_encoding_of_data_digits_into_EAN-13_barcode

import { EAN13_STRUCTURE } from './constants';
import encodeEAN from './encoder';
import { SIDE_BIN, MIDDLE_BIN } from './constants';
import { Options, Encoding } from '@jsbarcode/core';

// Calculate the checksum digit
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit
const checksum = (number: string): number => {
	const res = number
		.substr(0, 12)
		.split('')
		.map(n => +n)
		.reduce((sum, a, idx) => (idx % 2 ? sum + a * 3 : sum + a), 0);

	return (10 - (res % 10)) % 10;
};

const firstData = (data: string): string => data[0];
const leftSide = (data: string): string => data.substr(1, 6);
const rightSide = (data: string): string => data.substr(7, 6);

function encode(data: string, options: Options, flat: boolean): Encoding | Encoding[] {
	const leftData = leftSide(data);
	const leftStructureIndex = parseInt(firstData(data), 10);
	const leftStructure = EAN13_STRUCTURE[leftStructureIndex];
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

function valid(data: string): boolean {
	return data.search(/^[0-9]{13}$/) !== -1 && +data[12] === checksum(data);
}

interface EncodingData {
	fontSize: number;
	guardHeight: number;
	leftEncoded: string;
	rightEncoded: string;
}

// The "standard" way of printing EAN13 barcodes with guard bars
function encodeGuarded({ fontSize, guardHeight, leftEncoded, rightEncoded }: EncodingData, data: string, options: Options): Encoding[] {
	const lastChar = options.lastChar;
	const displayValue = options.displayValue;
	const text = options.text;

	const textOptions = { fontSize };
	const guardOptions = { height: guardHeight };
	const displayText = text || data;

	const encoded: Encoding[] = [
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

interface FlatEncodingData {
	leftEncoded: string;
	rightEncoded: string;
}

function encodeFlat({ leftEncoded, rightEncoded }: FlatEncodingData, data: string, options: Options): Encoding {
	return {
		data: [SIDE_BIN, leftEncoded, MIDDLE_BIN, rightEncoded, SIDE_BIN].join(''),
		text: options.text || data,
	};
}

export default (eanOptions: { flat: boolean } = { flat: false }) => ({
	encode: (data: string, options: Options) => encode(data, options, eanOptions.flat),
	valid,
});
export { encode, valid };
