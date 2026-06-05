// Encoding documentation:
// https://en.wikipedia.org/wiki/EAN_5#Encoding

import { EAN5_STRUCTURE } from './constants';
import encodeEAN from './encoder';
import { Options, Encoding } from '@jsbarcode/core';

const checksum = (data: string): number => {
	const result = data
		.split('')
		.map(n => +n)
		.reduce((sum, a, idx) => {
			return idx % 2 ? sum + a * 9 : sum + a * 3;
		}, 0);
	return result % 10;
};

function valid(data: string): boolean {
	return data.search(/^[0-9]{5}$/) !== -1;
}

function encode(data: string, options: Options): Encoding {
	const structure = EAN5_STRUCTURE[checksum(data)];
	return {
		data: '1011' + encodeEAN(data, structure, '01'),
		text: options.text || data,
	};
}

export default () => ({
	encode,
	valid,
});
export { encode, valid };
