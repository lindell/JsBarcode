import msi from './MSI';
import { mod11 } from './checksums';

export default () => ({
	encode: (data, options) => {
		return msi().encode(data + mod11(data), options);
	},
	valid: msi().valid,
});
