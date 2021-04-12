import code128 from './CODE128.js';
import { B_START_CHAR, B_CHARS } from './constants';

function encode(data, options) {
	return code128.encode(B_START_CHAR + data, options);
}

function valid(data) {
	return new RegExp(`^${B_CHARS}+$`).test(data);
}

export default () => ({ encode, valid });
