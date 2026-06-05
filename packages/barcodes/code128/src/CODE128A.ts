import { Options, Encoding } from '@jsbarcode/core';
import code128 from './CODE128';
import { A_START_CHAR, A_CHARS } from './constants';

function encode(data: string, options: Options): Encoding {
	return code128.encode(A_START_CHAR + data, options);
}

function valid(data: string): boolean {
	return new RegExp(`^${A_CHARS}+$`).test(data);
}

export default () => ({ encode, valid });
export { encode, valid };
