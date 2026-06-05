import { Options, Encoding } from '@jsbarcode/core';
import code128 from './CODE128';
import autoSelectModes from './auto';

function encode(data: string, options: Options): Encoding {
	// ASCII value ranges 0-127, 200-211
	if (/^[\x00-\x7F\xC8-\xD3]+$/.test(data)) {
		return code128.encode(autoSelectModes(data), options);
	} else {
		return code128.encode(data, options);
	}
}

export default () => ({
	encode,
	valid: code128.valid,
});
export { encode };
export const valid = code128.valid;
