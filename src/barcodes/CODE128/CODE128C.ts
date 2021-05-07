import code128 from './CODE128';
import { C_START_CHAR, C_CHARS } from './constants';

function encode(data, options) {
	return code128.encode(C_START_CHAR + data, options);
}

function valid(data) {
	return new RegExp(`^${C_CHARS}+$`).test(data);
}

export default () => ({ encode, valid });
