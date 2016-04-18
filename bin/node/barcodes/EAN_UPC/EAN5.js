"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ean_encoder = require("./ean_encoder.js");

var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Encoding documentation:
// https://en.wikipedia.org/wiki/EAN_5#Encoding

var EAN5 = function () {
	function EAN5(string) {
		_classCallCheck(this, EAN5);

		this.string = string;

		// Define the EAN-13 structure
		this.structure = ["GGLLL", "GLGLL", "GLLGL", "GLLLG", "LGGLL", "LLGGL", "LLLGG", "LGLGL", "LGLLG", "LLGLG"];
	}

	EAN5.prototype.valid = function valid() {
		return this.string.search(/^[0-9]{5}$/) !== -1;
	};

	EAN5.prototype.encode = function encode() {
		var encoder = new _ean_encoder2.default();
		var checksum = this.checksum();

		// Start bits
		var result = "1011";

		// Use normal ean encoding with 01 in between all digits
		result += encoder.encode(this.string, this.structure[checksum], "01");

		return {
			data: result,
			text: this.string
		};
	};

	EAN5.prototype.checksum = function checksum() {
		var result = 0;

		result += parseInt(this.string[0]) * 3;
		result += parseInt(this.string[1]) * 9;
		result += parseInt(this.string[2]) * 3;
		result += parseInt(this.string[3]) * 9;
		result += parseInt(this.string[4]) * 3;

		return result % 10;
	};

	return EAN5;
}();

exports.default = EAN5;