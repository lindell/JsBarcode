import { Options, Encoding } from '@jsbarcode/core';

function encode(data: string, options: Options): Encoding {
	let num = parseInt(data, 10);

	let result = '';
	while (!isNaN(num) && num !== 0) {
		if (num % 2 === 0) {
			result = '11100' + result;
			num = (num - 2) / 2;
		} else {
			result = '100' + result;
			num = (num - 1) / 2;
		}
	}

	// Remove the last space
	result = result.slice(0, -2);

	return {
		data: result,
		text: options.text || data,
	};
}

function valid(data: string): boolean {
	const num = parseInt(data, 10);
	return !isNaN(num) && num >= 3 && num <= 131070 && data.search(/^[0-9]+$/) !== -1;
}

export default () => ({
	encode,
	valid,
});
export { encode, valid };
