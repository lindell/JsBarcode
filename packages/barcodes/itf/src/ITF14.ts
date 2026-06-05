import ifc from './ITF';
import { Options, Encoding } from '@jsbarcode/core';

// Calculate the checksum digit
function checksum(data: string): number {
	const res = data
		.substr(0, 13)
		.split('')
		.map(num => parseInt(num, 10))
		.reduce((sum, n, idx) => sum + n * (3 - (idx % 2) * 2), 0);

	return Math.ceil(res / 10) * 10 - res;
}

function encode(data: string, options: Options): Encoding {
	// Add checksum if it does not exist
	if (data.search(/^[0-9]{13}$/) !== -1) {
		data += checksum(data);
	}
	return ifc().encode(data, options);
}

function valid(data: string): boolean {
	return data.search(/^[0-9]{14}$/) !== -1 && +data[13] === checksum(data);
}

export default () => ({
	encode,
	valid,
});
export { encode, valid };
