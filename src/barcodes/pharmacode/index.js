// Encoding documentation
// http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf

function encode(data, options) {
	var z = parseInt(data, 10);
	var result = '';

	// http://i.imgur.com/RMm4UDJ.png
	// (source: http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf, page: 34)
	while (!isNaN(z) && z != 0) {
		if (z % 2 === 0) {
			// Even
			result = '11100' + result;
			z = (z - 2) / 2;
		} else {
			// Odd
			result = '100' + result;
			z = (z - 1) / 2;
		}
	}

	// Remove the two last zeroes
	result = result.slice(0, -2);

	return {
		data: result,
		text: options.text || data,
	};
}

function valid(data) {
	const number = parseInt(data, 10);
	return number >= 3 && number <= 131070;
}

export default () => ({
	encode,
	valid,
});
