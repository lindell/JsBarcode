"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ean_encoder = require("./ean_encoder.js");

var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Encoding documentation:
// http://www.barcodeisland.com/ean8.phtml

var EAN8 = function () {
	function EAN8(string) {
		_classCallCheck(this, EAN8);

		// Add checksum if it does not exist
		if (string.search(/^[0-9]{7}$/) !== -1) {
			this.string = string + this.checksum(string);
		} else {
			this.string = string;
		}
	}

	EAN8.prototype.valid = function valid() {
		return this.string.search(/^[0-9]{8}$/) !== -1 && this.string[7] == this.checksum(this.string);
	};

	EAN8.prototype.encode = function encode() {
		var encoder = new _ean_encoder2.default();

		// Create the return variable
		var result = "";

		// Get the number to be encoded on the left side of the EAN code
		var leftSide = this.string.substr(0, 4);

		// Get the number to be encoded on the right side of the EAN code
		var rightSide = this.string.substr(4, 4);

		// Add the start bits
		result += encoder.startBin;

		// Add the left side
		result += encoder.encode(leftSide, "LLLL");

		// Add the middle bits
		result += encoder.middleBin;

		// Add the right side
		result += encoder.encode(rightSide, "RRRR");

		// Add the end bits
		result += encoder.endBin;

		return {
			data: result,
			text: this.string
		};
	};

	// Calulate the checksum digit


	EAN8.prototype.checksum = function checksum(number) {
		var result = 0;

		var i;
		for (i = 0; i < 7; i += 2) {
			result += parseInt(number[i]) * 3;
		}

		for (i = 1; i < 7; i += 2) {
			result += parseInt(number[i]);
		}

		return (10 - result % 10) % 10;
	};

	return EAN8;
}();

exports.default = EAN8;