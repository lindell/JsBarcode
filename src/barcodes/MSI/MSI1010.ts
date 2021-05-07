import msi from './MSI';
import { mod10 } from './checksums';

export default () => ({
	encode: (data, options) => {
		data += mod10(data);
		data += mod10(data);
		return msi().encode(data, options);
	},
	valid: msi().valid,
});
