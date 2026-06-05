import { Options, Encoding } from '@jsbarcode/core';

function encode(_: string, options: Options): Encoding {
	return {
		data: '10101010101010101010101010101010101010101',
		text: options.text,
	};
}

function valid(): boolean {
	return true;
}

export default () => ({
	encode,
	valid,
});
export { encode, valid };
