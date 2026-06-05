import msi from './MSI';
import { mod10 } from './checksums';
import { Options, Encoding } from '@jsbarcode/core';

export default () => ({
	encode: (data: string, options: Options): Encoding => {
		return msi().encode(data + mod10(data), options);
	},
	valid: msi().valid,
});
