// Encoding documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding
//
// UPC-E documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#UPC-E

import encodeEAN from './encoder';
import { checksum } from './UPC.js';

const EXPANSIONS = [
	'XX00000XXX',
	'XX10000XXX',
	'XX20000XXX',
	'XXX00000XX',
	'XXXX00000X',
	'XXXXX00005',
	'XXXXX00006',
	'XXXXX00007',
	'XXXXX00008',
	'XXXXX00009',
];

const PARITIES = [
	['EEEOOO', 'OOOEEE'],
	['EEOEOO', 'OOEOEE'],
	['EEOOEO', 'OOEEOE'],
	['EEOOOE', 'OOEEEO'],
	['EOEEOO', 'OEOOEE'],
	['EOOEEO', 'OEEOOE'],
	['EOOOEE', 'OEEEOO'],
	['EOEOEO', 'OEOEOE'],
	['EOEOOE', 'OEOEEO'],
	['EOOEOE', 'OEEOEO'],
];

function valid(data) {
	if (data.search(/^[0-9]{6}$/) !== -1) {
		return true;
	} else if (data.search(/^[01][0-9]{7}$/) !== -1) {
		const middleDigits = data.substring(1, data.length - 1);
		const upcA = expandToUPCA(middleDigits, data[0]);

		return upcA[upcA.length - 1] === data[data.length - 1];
	} else {
		return false;
	}
}

function encode(data, options) {
	let middleDigits, upcA;

	if (data.search(/^[0-9]{6}$/) !== -1) {
		middleDigits = data;
		upcA = expandToUPCA(data, '0');
		options.text = options.text || `${upcA[0]}${data}${upcA[upcA.length - 1]}`;
	} else if (data.search(/^[01][0-9]{7}$/) !== -1) {
		middleDigits = data.substring(1, data.length - 1);
		upcA = expandToUPCA(middleDigits, data[0]);
		options.text = options.text || data;
	} else {
		throw new Error('invalid data to be UPCE encoded');
	}

	// Make sure the font is not bigger than the space between the guard bars
	if (options.fontSize > options.width * 10) {
		options.fontSize = options.width * 10;
	}

	// Make the guard bars go down half the way of the text
	if (options.guardHeight === undefined) {
		options.guardHeight = options.height + options.fontSize / 2 + options.textMargin;
	}

	if (options.flat) {
		return flatEncoding(options, upcA, middleDigits);
	} else {
		return guardedEncoding(options, upcA, middleDigits);
	}
}

function flatEncoding(options, upcA, middleDigits) {
	var result = '';

	result += '101';
	result += encodeMiddleDigits(upcA, middleDigits);
	result += '010101';

	return {
		data: result,
		text: options.text,
	};
}

function encodeMiddleDigits(upcA, middleDigits) {
	const numberSystem = upcA[0];
	const checkDigit = upcA[upcA.length - 1];
	const parity = PARITIES[parseInt(checkDigit)][parseInt(numberSystem)];
	return encodeEAN(middleDigits, parity);
}

function guardedEncoding(options, upcA, middleDigits) {
	var result = [];

	// Add the UPC-A number system digit beneath the quiet zone
	if (options.displayValue) {
		result.push({
			data: '00000000',
			text: options.text[0],
			options: { textAlign: 'left', fontSize: options.fontSize },
		});
	}

	// Add the guard bars
	result.push({
		data: '101',
		options: { height: options.guardHeight },
	});

	// Add the 6 UPC-E digits
	result.push({
		data: encodeMiddleDigits(upcA, middleDigits),
		text: options.text.substring(1, 7),
		options: { fontSize: options.fontSize },
	});

	// Add the end bits
	result.push({
		data: '010101',
		options: { height: options.guardHeight },
	});

	// Add the UPC-A check digit beneath the quiet zone
	if (options.displayValue) {
		result.push({
			data: '00000000',
			text: options.text[7],
			options: { textAlign: 'right', fontSize: options.fontSize },
		});
	}

	return result;
}

function expandToUPCA(middleDigits, numberSystem) {
	const lastUpcE = parseInt(middleDigits[middleDigits.length - 1]);
	const expansion = EXPANSIONS[lastUpcE];

	let result = '';
	let digitIndex = 0;
	for (let i = 0; i < expansion.length; i++) {
		let c = expansion[i];
		if (c === 'X') {
			result += middleDigits[digitIndex++];
		} else {
			result += c;
		}
	}

	result = `${numberSystem}${result}`;
	return `${result}${checksum(result)}`;
}

export default () => ({ valid, encode });
