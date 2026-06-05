// Encoding documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding

import encodeEAN from './encoder';
import { Options, Encoding } from '@jsbarcode/core';

// Calulate the checksum digit
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit
export function checksum(number: string): number {
	var result = 0;

	var i;
	for (i = 1; i < 11; i += 2) {
		result += parseInt(number[i], 10);
	}
	for (i = 0; i < 11; i += 2) {
		result += parseInt(number[i], 10) * 3;
	}

	return (10 - (result % 10)) % 10;
}

function valid(data: string): boolean {
	return data.search(/^[0-9]{12}$/) !== -1 && +data[11] == checksum(data);
}

function encode(data: string, options: Options, flat: boolean): Encoding | Encoding[] {
	// Make sure the font is not bigger than the space between the guard bars
	const fontSize = !flat && options.fontSize > options.width * 10 ? options.width * 10 : options.fontSize;

	// Make the guard bars go down half the way of the text
	const guardHeight = options.height + fontSize / 2 + options.textMargin;

	const encodeOptions = {
		fontSize,
		guardHeight,
	};

	return flat ? flatEncoding(data, options) : guardedEncoding(data, options, encodeOptions);
}

function flatEncoding(data: string, options: Options): Encoding {
	var result = '';

	result += '101';
	result += encodeEAN(data.substr(0, 6), 'LLLLLL');
	result += '01010';
	result += encodeEAN(data.substr(6, 6), 'RRRRRR');
	result += '101';

	return {
		data: result,
		text: options.text || data,
	};
}

interface GuardOptions {
	fontSize: number;
	guardHeight: number;
}

function guardedEncoding(data: string, options: Options, encodeOptions: GuardOptions): Encoding[] {
	var result: Encoding[] = [];
	const text = options.text || data;

	// Add the first digit
	if (options.displayValue) {
		result.push({
			data: '00000000',
			text: text.substr(0, 1),
			options: { textAlign: 'left', fontSize: encodeOptions.fontSize },
		});
	}

	// Add the guard bars
	result.push({
		data: '101' + encodeEAN(data[0], 'L'),
		options: { height: encodeOptions.guardHeight },
	});

	// Add the left side
	result.push({
		data: encodeEAN(data.substr(1, 5), 'LLLLL'),
		text: text.substr(1, 5),
		options: { fontSize: encodeOptions.fontSize },
	});

	// Add the middle bits
	result.push({
		data: '01010',
		options: { height: encodeOptions.guardHeight },
	});

	// Add the right side
	result.push({
		data: encodeEAN(data.substr(6, 5), 'RRRRR'),
		text: text.substr(6, 5),
		options: { fontSize: encodeOptions.fontSize },
	});

	// Add the end bits
	result.push({
		data: encodeEAN(data[11], 'R') + '101',
		options: { height: encodeOptions.guardHeight },
	});

	// Add the last digit
	if (options.displayValue) {
		result.push({
			data: '00000000',
			text: text.substr(11, 1),
			options: { textAlign: 'right', fontSize: encodeOptions.fontSize },
		});
	}

	return result;
}

export default (upcOptions: { flat: boolean } = { flat: false }) => ({
	encode: (data: string, options: Options) => encode(data, options, upcOptions.flat),
	valid,
});
export { encode, valid };
