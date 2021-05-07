// Encoding specification:
// http://www.barcodeisland.com/codabar.phtml

function encode(d, options) {
	let data = d.toUpperCase();
	if (data.search(/^[A-D]/)) {
		data = 'A' + data + 'A';
	}

	return {
		text: options.text || data.replace(/[A-D]/g, ''),
		data: data
			.split('')
			.map(c => encodings[c])
			.join('0'),
	};
}

function valid(data) {
	return !data.search(/^([A-Da-d][0-9-$:.+/]+[A-Da-d])|[0-9-$:.+/]+$/);
}

const encodings = {
	'0': '101010011',
	'1': '101011001',
	'2': '101001011',
	'3': '110010101',
	'4': '101101001',
	'5': '110101001',
	'6': '100101011',
	'7': '100101101',
	'8': '100110101',
	'9': '110100101',
	'-': '101001101',
	$: '101100101',
	':': '1101011011',
	'/': '1101101011',
	'.': '1101101101',
	'+': '101100110011',
	A: '1011001001',
	B: '1001001011',
	C: '1010010011',
	D: '1010011001',
};

export default () => ({
	encode,
	valid,
});
