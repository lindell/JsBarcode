import msi from './MSI.js';
import { mod11 } from './checksums.js';

export default {
	encode: (data, options) => {
		return msi.encode(data + mod11(data), options);
	},
	valid: msi.valid,
};
