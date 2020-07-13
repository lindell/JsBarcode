// Encoding documentation:
// https://en.wikipedia.org/wiki/EAN_2#Encoding

import { EAN2_STRUCTURE } from './constants';
import encodeEAN from './encoder';

function encode(data, options) {
	// Choose the structure based on the number mod 4
	const structure = EAN2_STRUCTURE[parseInt(data) % 4];
	return {
		// Start bits + Encode the two digits with 01 in between
		data: '1011' + encodeEAN(data, structure, '01'),
		text: options.text || data,
	};
}

function valid(data) {
	return data.search(/^[0-9]{2}$/) !== -1;
}

export default {
	encode,
	valid,
};
