"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Encoding documentation
// http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf

var pharmacode = function () {
	function pharmacode(string) {
		_classCallCheck(this, pharmacode);

		this.number = parseInt(string, 10);
	}

	pharmacode.prototype.encode = function encode() {
		var z = this.number;
		var result = "";

		// http://i.imgur.com/RMm4UDJ.png
		// (source: http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf, page: 34)
		while (!isNaN(z) && z != 0) {
			if (z % 2 === 0) {
				// Even
				result = "11100" + result;
				z = (z - 2) / 2;
			} else {
				// Odd
				result = "100" + result;
				z = (z - 1) / 2;
			}
		}

		// Remove the two last zeroes
		result = result.slice(0, -2);

		return {
			data: result,
			text: this.number + ""
		};
	};

	pharmacode.prototype.valid = function valid() {
		return this.number >= 3 && this.number <= 131070;
	};

	return pharmacode;
}();

exports.pharmacode = pharmacode;