import msi from './MSI';
import { mod10, mod11 } from './checksums';

export default () => ({
	encode: (data, options) => {
		data += mod11(data);
		data += mod10(data);
		return msi().encode(data, options);
	},
	valid: msi().valid,
});
