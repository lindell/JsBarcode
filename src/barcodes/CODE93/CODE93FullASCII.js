// Encoding documentation
// https://en.wikipedia.org/wiki/Code_93#Full_ASCII_Code_93

import CODE93 from './CODE93.js';

class CODE93FullASCII extends CODE93 {
	constructor(data, options) {
		super(data, options);
	}

	valid() {
		return /^[\x00-\x7f]+$/.test(this.data);
	}
}

export default CODE93FullASCII;
