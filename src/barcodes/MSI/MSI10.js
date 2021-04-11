import msi from './MSI.js';
import { mod10 } from './checksums.js';

export default () => ({
	encode: (data, options) => {
		return msi().encode(data + mod10(data), options);
	},
	valid: msi().valid,
});
