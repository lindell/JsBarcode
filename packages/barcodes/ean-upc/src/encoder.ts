import { BINARIES } from './constants';

// Encode data string
const encode = (data: string, structure: string, separator: string | null = null): string => {
	let encoded = data
		.split('')
		.map((val, idx) => {
			const structChar = structure[idx] as keyof typeof BINARIES;
			return BINARIES[structChar];
		})
		.map((val, idx) => {
			if (val) {
				const charCode = parseInt(data[idx], 10);
				return val[charCode] || '';
			}
			return '';
		});

	if (separator) {
		const last = data.length - 1;
		encoded = encoded.map((val, idx) => (idx < last ? val + separator : val));
	}

	return encoded.join('');
};

export default encode;
