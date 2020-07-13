// Encoding documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding

import encodeEAN from './encoder';

// Calulate the checksum digit
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit
export function checksum(number) {
	var result = 0;

	var i;
	for (i = 1; i < 11; i += 2) {
		result += parseInt(number[i]);
	}
	for (i = 0; i < 11; i += 2) {
		result += parseInt(number[i]) * 3;
	}

	return (10 - (result % 10)) % 10;
}

function valid(data) {
	return data.search(/^[0-9]{12}$/) !== -1 && data[11] == checksum(data);
}

function encode(data, options) {
	// Make sure the font is not bigger than the space between the guard bars
	const fontSize = !options.flat && options.fontSize > options.width * 10 ? options.width * 10 : options.fontSize;

	// Make the guard bars go down half the way of the text
	const guardHeight = options.height + fontSize / 2 + options.textMargin;

	const encodeOptions = {
		fontSize,
		guardHeight,
	};

	return options.flat ? flatEncoding(data, options, encodeOptions) : guardedEncoding(data, options, encodeOptions);
}

function flatEncoding(data, options) {
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

function guardedEncoding(data, options, encodeOptions) {
	var result = [];
	const text = options.text || data;

	// Add the first digit
	if (options.displayValue) {
		result.push({
			data: '00000000',
			text: text.substr(0, 1),
			options: { textAlign: 'left', fontSize: encodeOptions.fontSize }
		});
	}

	// Add the guard bars
	result.push({
		data: '101' + encodeEAN(data[0], 'L'),
		options: { height: encodeOptions.guardHeight }
	});

	// Add the left side
	result.push({
		data: encodeEAN(data.substr(1, 5), 'LLLLL'),
		text: text.substr(1, 5),
		options: { fontSize: encodeOptions.fontSize }
	});

	// Add the middle bits
	result.push({
		data: '01010',
		options: { height: encodeOptions.guardHeight }
	});

	// Add the right side
	result.push({
		data: encodeEAN(data.substr(6, 5), 'RRRRR'),
		text: text.substr(6, 5),
		options: { fontSize: encodeOptions.fontSize }
	});

	// Add the end bits
	result.push({
		data: encodeEAN(data[11], 'R') + '101',
		options: { height: encodeOptions.guardHeight }
	});

	// Add the last digit
	if (options.displayValue) {
		result.push({
			data: '00000000',
			text: text.substr(11, 1),
			options: { textAlign: 'right', fontSize: encodeOptions.fontSize }
		});
	}

	return result;
}

export default {
	encode,
	valid,
};
