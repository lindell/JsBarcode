import { START_BIN, END_BIN, BINARIES } from './constants';

function valid(text) {
	return text.search(/^([0-9]{2})+$/) !== -1;
}

function encode(data, options) {
	// Calculate all the digit pairs
	const encoded = data
		.match(/.{2}/g)
		.map(pair => encodePair(pair))
		.join('');

	return {
		data: START_BIN + encoded + END_BIN,
		text: options.text || data,
	};
}

// Calculate the data of a number pair
function encodePair(pair) {
	const second = BINARIES[pair[1]];

	return BINARIES[pair[0]]
		.split('')
		.map((first, idx) => (first === '1' ? '111' : '1') + (second[idx] === '1' ? '000' : '0'))
		.join('');
}

export default {
	encode,
	valid,
};
