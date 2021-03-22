import ifc from './ITF';

// Calculate the checksum digit
function checksum(data) {
	const res = data
		.substr(0, 13)
		.split('')
		.map(num => parseInt(num, 10))
		.reduce((sum, n, idx) => sum + n * (3 - (idx % 2) * 2), 0);

	return Math.ceil(res / 10) * 10 - res;
}

function encode(data, options) {
	// Add checksum if it does not exist
	if (data.search(/^[0-9]{13}$/) !== -1) {
		data += checksum(data);
	}
	return ifc.encode(data, options);
}

function valid(data) {
	return data.search(/^[0-9]{14}$/) !== -1 && +data[13] === checksum(data);
}

export default {
	encode,
	valid,
};
