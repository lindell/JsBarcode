"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Encoding documentation
// https://en.wikipedia.org/wiki/MSI_Barcode#Character_set_and_binary_lookup

var MSI = function () {
	function MSI(string) {
		_classCallCheck(this, MSI);

		this.string = string;
	}

	MSI.prototype.encode = function encode() {
		// Start bits
		var ret = "110";

		for (var i = 0; i < this.string.length; i++) {
			// Convert the character to binary (always 4 binary digits)
			var digit = parseInt(this.string[i]);
			var bin = digit.toString(2);
			bin = addZeroes(bin, 4 - bin.length);

			// Add 100 for every zero and 110 for every 1
			for (var b = 0; b < bin.length; b++) {
				ret += bin[b] == "0" ? "100" : "110";
			}
		}

		// End bits
		ret += "1001";

		return {
			data: ret,
			text: this.string
		};
	};

	MSI.prototype.valid = function valid() {
		return this.string.search(/^[0-9]+$/) !== -1;
	};

	return MSI;
}();

function addZeroes(number, n) {
	for (var i = 0; i < n; i++) {
		number = "0" + number;
	}
	return number;
}

exports.default = MSI;