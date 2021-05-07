import msi from './MSI';
import { mod10 } from './checksums';

export default () => ({
	encode: (data, options) => {
		return msi().encode(data + mod10(data), options);
	},
	valid: msi().valid,
});
