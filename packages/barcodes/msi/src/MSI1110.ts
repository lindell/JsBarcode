import msi from './MSI';
import { mod10, mod11 } from './checksums';
import { Options, Encoding } from '@jsbarcode/core';

export default () => ({
	encode: (data: string, options: Options): Encoding => {
		data += mod11(data);
		data += mod10(data);
		return msi().encode(data, options);
	},
	valid: msi().valid,
});
