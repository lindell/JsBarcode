import { SHIFT, SET_A, SET_B, MODULO, STOP, FNC1, SET_BY_CODE, SWAP, BARS } from './constants';
import { Options, Encoding } from '@jsbarcode/core';

// This is the master class,
// it does require the start code to be included in the string
function encode(data: string, options: Options): Encoding {
	// Get array of ascii codes from data
	const bytes = data.split('').map(char => char.charCodeAt(0));

	// Remove the start code from the bytes and set its index
	const firstByte = bytes.shift();
	const startIndex = firstByte ? firstByte - 105 : 0;
	// Get start set by index
	const startSet = SET_BY_CODE[startIndex];

	if (startSet === undefined) {
		throw new RangeError('The encoding does not start with a start character.');
	}

	if (options.ean128) {
		bytes.unshift(FNC1);
	}

	// Start encode with the right type
	const encodingResult = next(bytes, 1, startSet);

	return {
		text: options.text ? options.text : data.replace(/[^\x20-\x7E]/g, ''),
		data:
			// Add the start bits
			getBar(startIndex) +
			// Add the encoded bits
			encodingResult.result +
			// Add the checksum
			getBar((encodingResult.checksum + startIndex) % MODULO) +
			// Add the end bits
			getBar(STOP)
	};
}

function valid(data: string): boolean {
	// ASCII value ranges 0-127, 200-211
	return /^[\x00-\x7F\xC8-\xD3]+$/.test(data);
}

// Get a bar symbol by index
function getBar(index: number): string {
	return BARS[index] ? BARS[index].toString() : '';
}

// Correct an index by a set and shift it from the bytes array
function correctIndex(bytes: number[], set: number): number {
	const charCode = bytes.shift();
	if (charCode === undefined) return 0;

	if (set === SET_A) {
		return charCode < 32 ? charCode + 64 : charCode - 32;
	} else if (set === SET_B) {
		return charCode - 32;
	} else {
		const secondCharCode = bytes.shift();
		if (secondCharCode === undefined) return 0;
		return (charCode - 48) * 10 + secondCharCode - 48;
	}
}

function next(bytes: number[], pos: number, set: number): { result: string; checksum: number } {
	if (!bytes.length) {
		return { result: '', checksum: 0 };
	}

	let nextCode: { result: string; checksum: number }, index: number;

	// Special characters
	if (bytes[0] >= 200) {
		const shifted = bytes.shift();
		index = shifted ? shifted - 105 : 0;
		const nextSet = SWAP[index];

		// Swap to other set
		if (nextSet !== undefined) {
			nextCode = next(bytes, pos + 1, nextSet);
		}
		// Continue on current set but encode a special character
		else {
			// Shift
			if ((set === SET_A || set === SET_B) && index === SHIFT) {
				// Convert the next character so that is encoded correctly
				bytes[0] = set === SET_A ? (bytes[0] > 95 ? bytes[0] - 96 : bytes[0]) : bytes[0] < 32 ? bytes[0] + 96 : bytes[0];
			}
			nextCode = next(bytes, pos + 1, set);
		}
	}
	// Continue encoding
	else {
		index = correctIndex(bytes, set);
		nextCode = next(bytes, pos + 1, set);
	}

	// Get the correct binary encoding and calculate the weight
	const enc = getBar(index);
	const weight = index * pos;

	return {
		result: enc + nextCode.result,
		checksum: weight + nextCode.checksum
	};
}

export default {
	encode, valid,
};
export { encode, valid };
