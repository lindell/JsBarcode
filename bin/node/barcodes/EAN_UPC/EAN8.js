"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _ean_encoder = require("./ean_encoder.js");

var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EAN8 = function () {
	function EAN8(string) {
		(0, _classCallCheck3.default)(this, EAN8);

		//Add checksum if it does not exist
		if (string.search(/^[0-9]{7}$/) !== -1) {
			this.string = string + this.checksum(string);
		} else {
			this.string = string;
		}
	}

	(0, _createClass3.default)(EAN8, [{
		key: "valid",
		value: function valid() {
			return this.string.search(/^[0-9]{8}$/) !== -1 && this.string[7] == this.checksum(this.string);
		}
	}, {
		key: "encode",
		value: function encode() {
			var encoder = new _ean_encoder2.default();

			//Create the return variable
			var result = "";

			//Get the number to be encoded on the left side of the EAN code
			var leftSide = this.string.substr(0, 4);

			//Get the number to be encoded on the right side of the EAN code
			var rightSide = this.string.substr(4, 4);

			//Add the start bits
			result += encoder.startBin;

			//Add the left side
			result += encoder.encode(leftSide, "LLLL");

			//Add the middle bits
			result += encoder.middleBin;

			//Add the right side
			result += encoder.encode(rightSide, "RRRR");

			//Add the end bits
			result += encoder.endBin;

			return {
				data: result,
				text: this.string
			};
		}

		//Calulate the checksum digit

	}, {
		key: "checksum",
		value: function checksum(number) {
			var result = 0;

			var i;
			for (i = 0; i < 7; i += 2) {
				result += parseInt(number[i]) * 3;
			}
			for (i = 1; i < 7; i += 2) {
				result += parseInt(number[i]);
			}

			return (10 - result % 10) % 10;
		}
	}]);
	return EAN8;
}();

exports.default = EAN8;