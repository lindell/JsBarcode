"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ean_encoder = require("./ean_encoder.js");

var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Encoding documentation:
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Binary_encoding_of_data_digits_into_EAN-13_barcode

var EAN13 = function () {
	function EAN13(string, options) {
		_classCallCheck(this, EAN13);

		// Add checksum if it does not exist
		if (string.search(/^[0-9]{12}$/) !== -1) {
			this.string = string + this.checksum(string);
		} else {
			this.string = string;
		}

		this.displayValue = options.displayValue;

		// Define the EAN-13 structure
		this.structure = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];

		// Make sure the font is not bigger than the space between the guard bars
		if (options.fontSize > options.width * 10) {
			this.fontSize = options.width * 10;
		} else {
			this.fontSize = options.fontSize;
		}

		// Make the guard bars go down half the way of the text
		this.guardHeight = options.height + this.fontSize / 2 + options.textMargin;

		// Adds a last character to the end of the barcode
		this.lastChar = options.lastChar;
	}

	EAN13.prototype.valid = function valid() {
		return this.string.search(/^[0-9]{13}$/) !== -1 && this.string[12] == this.checksum(this.string);
	};

	EAN13.prototype.encode = function encode() {
		var encoder = new _ean_encoder2.default();
		var result = [];

		var structure = this.structure[this.string[0]];

		// Get the string to be encoded on the left side of the EAN code
		var leftSide = this.string.substr(1, 6);

		// Get the string to be encoded on the right side of the EAN code
		var rightSide = this.string.substr(7, 6);

		// Add the first digigt
		if (this.displayValue) {
			result.push({
				data: "000000000000",
				text: this.string[0],
				options: { textAlign: "left", fontSize: this.fontSize }
			});
		}

		// Add the guard bars
		result.push({
			data: "101",
			options: { height: this.guardHeight }
		});

		// Add the left side
		result.push({
			data: encoder.encode(leftSide, structure),
			text: leftSide,
			options: { fontSize: this.fontSize }
		});

		// Add the middle bits
		result.push({
			data: "01010",
			options: { height: this.guardHeight }
		});

		// Add the right side
		result.push({
			data: encoder.encode(rightSide, "RRRRRR"),
			text: rightSide,
			options: { fontSize: this.fontSize }
		});

		// Add the end bits
		result.push({
			data: "101",
			options: { height: this.guardHeight }
		});

		if (this.lastChar && this.displayValue) {
			result.push({ data: "00" });

			result.push({
				data: "00000",
				text: this.lastChar,
				options: { fontSize: this.fontSize }
			});
		}

		return result;
	};

	// Calulate the checksum digit
	// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit


	EAN13.prototype.checksum = function checksum(number) {
		var result = 0;

		var i;
		for (i = 0; i < 12; i += 2) {
			result += parseInt(number[i]);
		}
		for (i = 1; i < 12; i += 2) {
			result += parseInt(number[i]) * 3;
		}

		return (10 - result % 10) % 10;
	};

	return EAN13;
}();

exports.default = EAN13;