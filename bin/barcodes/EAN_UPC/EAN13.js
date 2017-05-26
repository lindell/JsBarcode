"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ean_encoder = require("./ean_encoder.js");

var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

var _Barcode2 = require("../Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Binary_encoding_of_data_digits_into_EAN-13_barcode

var EAN13 = function (_Barcode) {
	_inherits(EAN13, _Barcode);

	function EAN13(data, options) {
		_classCallCheck(this, EAN13);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{12}$/) !== -1) {
			data += checksum(data);
		}

		// Make sure the font is not bigger than the space between the guard bars
		var _this = _possibleConstructorReturn(this, (EAN13.__proto__ || Object.getPrototypeOf(EAN13)).call(this, data, options));

		if (!options.flat && options.fontSize > options.width * 10) {
			_this.fontSize = options.width * 10;
		} else {
			_this.fontSize = options.fontSize;
		}

		// Make the guard bars go down half the way of the text
		_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;

		// Adds a last character to the end of the barcode
		_this.lastChar = options.lastChar;
		return _this;
	}

	_createClass(EAN13, [{
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9]{13}$/) !== -1 && this.data[12] == checksum(this.data);
		}
	}, {
		key: "encode",
		value: function encode() {
			if (this.options.flat) {
				return this.flatEncoding();
			} else {
				return this.guardedEncoding();
			}
		}

		// Define the EAN-13 structure

	}, {
		key: "getStructure",
		value: function getStructure() {
			return ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];
		}

		// The "standard" way of printing EAN13 barcodes with guard bars

	}, {
		key: "guardedEncoding",
		value: function guardedEncoding() {
			var encoder = new _ean_encoder2.default();
			var result = [];

			var structure = this.getStructure()[this.data[0]];

			// Get the string to be encoded on the left side of the EAN code
			var leftSide = this.data.substr(1, 6);

			// Get the string to be encoded on the right side of the EAN code
			var rightSide = this.data.substr(7, 6);

			// Add the first digigt
			if (this.options.displayValue) {
				result.push({
					data: "000000000000",
					text: this.text.substr(0, 1),
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
				text: this.text.substr(1, 6),
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
				text: this.text.substr(7, 6),
				options: { fontSize: this.fontSize }
			});

			// Add the end bits
			result.push({
				data: "101",
				options: { height: this.guardHeight }
			});

			if (this.options.lastChar && this.options.displayValue) {
				result.push({ data: "00" });

				result.push({
					data: "00000",
					text: this.options.lastChar,
					options: { fontSize: this.fontSize }
				});
			}
			return result;
		}
	}, {
		key: "flatEncoding",
		value: function flatEncoding() {
			var encoder = new _ean_encoder2.default();
			var result = "";

			var structure = this.getStructure()[this.data[0]];

			result += "101";
			result += encoder.encode(this.data.substr(1, 6), structure);
			result += "01010";
			result += encoder.encode(this.data.substr(7, 6), "RRRRRR");
			result += "101";

			return {
				data: result,
				text: this.text
			};
		}
	}]);

	return EAN13;
}(_Barcode3.default);

// Calulate the checksum digit
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit


function checksum(number) {
	var result = 0;

	var i;
	for (i = 0; i < 12; i += 2) {
		result += parseInt(number[i]);
	}
	for (i = 1; i < 12; i += 2) {
		result += parseInt(number[i]) * 3;
	}

	return (10 - result % 10) % 10;
}

exports.default = EAN13;