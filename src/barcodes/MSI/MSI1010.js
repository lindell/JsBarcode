import msi from './MSI.js';
import { mod10 } from './checksums.js';

export default () => ({
	encode: (data, options) => {
		data += mod10(data);
		data += mod10(data);
		return msi().encode(data, options);
	},
	valid: msi().valid,
});
