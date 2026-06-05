// Encoding documentation
// https://en.wikipedia.org/wiki/MSI_Barcode#Character_set_and_binary_lookup

import { Options, Encoding } from '@jsbarcode/core';

function encode(data: string, options: Options): Encoding {
	// Start bits
	var ret = '110';

	for (var i = 0; i < data.length; i++) {
		// Convert the character to binary (always 4 binary digits)
		var digit = parseInt(data[i], 10);
		var bin = digit.toString(2);
		bin = addZeroes(bin, 4 - bin.length);

		// Add 100 for every zero and 110 for every 1
		for (var b = 0; b < bin.length; b++) {
			ret += bin[b] == '0' ? '100' : '110';
		}
	}

	// End bits
	ret += '1001';

	return {
		data: ret,
		text: options.text || data,
	};
}

function valid(data: string): boolean {
	return data.search(/^[0-9]+$/) !== -1;
}

function addZeroes(number: string, n: number): string {
	for (var i = 0; i < n; i++) {
		number = '0' + number;
	}
	return number;
}

export default () => ({
	encode,
	valid,
});
export { encode, valid };
