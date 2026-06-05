import { START_BIN, END_BIN, BINARIES } from './constants';
import { Options, Encoding } from '@jsbarcode/core';

function valid(text: string): boolean {
	return text.search(/^([0-9]{2})+$/) !== -1;
}

function encode(data: string, options: Options): Encoding {
	// Calculate all the digit pairs
	const matches = data.match(/.{2}/g);
	const encoded = matches
		? matches.map(pair => encodePair(pair)).join('')
		: '';

	return {
		data: START_BIN + encoded + END_BIN,
		text: options.text || data,
	};
}

// Calculate the data of a number pair
function encodePair(pair: string): string {
	const firstIndex = parseInt(pair[0], 10);
	const secondIndex = parseInt(pair[1], 10);
	const second = BINARIES[secondIndex];

	return BINARIES[firstIndex]
		.split('')
		.map((first, idx) => (first === '1' ? '111' : '1') + (second[idx] === '1' ? '000' : '0'))
		.join('');
}

export default () => ({
	encode,
	valid,
});
export { encode, valid };
