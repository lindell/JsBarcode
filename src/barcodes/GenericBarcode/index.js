// Return the corresponding binary numbers for the data provided
function encode(_, options) {
	return {
		data: '10101010101010101010101010101010101010101',
		text: options.text,
	};
}

// Return true/false if the string provided is valid for this encoder
function valid() {
	return true;
}

export default () => ({
	encode,
	valid,
});
