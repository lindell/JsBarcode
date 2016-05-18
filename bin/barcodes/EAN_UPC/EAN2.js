"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ean_encoder = require("./ean_encoder.js");

var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Encoding documentation:
// https://en.wikipedia.org/wiki/EAN_2#Encoding

var EAN2 = function () {
	function EAN2(string) {
		_classCallCheck(this, EAN2);

		this.string = string;

		this.structure = ["LL", "LG", "GL", "GG"];
	}

	EAN2.prototype.valid = function valid() {
		return this.string.search(/^[0-9]{2}$/) !== -1;
	};

	EAN2.prototype.encode = function encode() {
		var encoder = new _ean_encoder2.default();

		// Choose the structure based on the number mod 4
		var structure = this.structure[parseInt(this.string) % 4];

		// Start bits
		var result = "1011";

		// Encode the two digits with 01 in between
		result += encoder.encode(this.string, structure, "01");

		return {
			data: result,
			text: this.string
		};
	};

	return EAN2;
}();

exports.default = EAN2;