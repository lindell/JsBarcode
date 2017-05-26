"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EANencoder = function () {
	function EANencoder() {
		_classCallCheck(this, EANencoder);

		// Standard start end and middle bits
		this.startBin = "101";
		this.endBin = "101";
		this.middleBin = "01010";

		this.binaries = {
			// The L (left) type of encoding
			"L": ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"],

			// The G type of encoding
			"G": ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"],

			// The R (right) type of encoding
			"R": ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"],

			// The O (odd) encoding for UPC-E
			"O": ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"],

			// The E (even) encoding for UPC-E
			"E": ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"]
		};
	}

	// Convert a numberarray to the representing


	_createClass(EANencoder, [{
		key: "encode",
		value: function encode(number, structure, separator) {
			// Create the variable that should be returned at the end of the function
			var result = "";

			// Make sure that the separator is set
			separator = separator || "";

			// Loop all the numbers
			for (var i = 0; i < number.length; i++) {
				// Using the L, G or R encoding and add it to the returning variable
				var binary = this.binaries[structure[i]];
				if (binary) {
					result += binary[number[i]];
				}

				// Add separator in between encodings
				if (i < number.length - 1) {
					result += separator;
				}
			}
			return result;
		}
	}]);

	return EANencoder;
}();

exports.default = EANencoder;