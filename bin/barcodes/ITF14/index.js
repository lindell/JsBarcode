"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ITF14 = undefined;

var _Barcode2 = require("../Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ITF14 = function (_Barcode) {
	_inherits(ITF14, _Barcode);

	function ITF14(data, options) {
		_classCallCheck(this, ITF14);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{13}$/) !== -1) {
			data += checksum(data);
		}

		var _this = _possibleConstructorReturn(this, _Barcode.call(this, data, options));

		_this.binaryRepresentation = {
			"0": "00110",
			"1": "10001",
			"2": "01001",
			"3": "11000",
			"4": "00101",
			"5": "10100",
			"6": "01100",
			"7": "00011",
			"8": "10010",
			"9": "01010"
		};
		return _this;
	}

	ITF14.prototype.valid = function valid() {
		return this.data.search(/^[0-9]{14}$/) !== -1 && this.data[13] == checksum(this.data);
	};

	ITF14.prototype.encode = function encode() {
		var result = "1010";

		// Calculate all the digit pairs
		for (var i = 0; i < 14; i += 2) {
			result += this.calculatePair(this.data.substr(i, 2));
		}

		// Always add the same end bits
		result += "11101";

		return {
			data: result,
			text: this.text
		};
	};

	// Calculate the data of a number pair


	ITF14.prototype.calculatePair = function calculatePair(numberPair) {
		var result = "";

		var number1Struct = this.binaryRepresentation[numberPair[0]];
		var number2Struct = this.binaryRepresentation[numberPair[1]];

		// Take every second bit and add to the result
		for (var i = 0; i < 5; i++) {
			result += number1Struct[i] == "1" ? "111" : "1";
			result += number2Struct[i] == "1" ? "000" : "0";
		}

		return result;
	};

	return ITF14;
}(_Barcode3.default);

// Calulate the checksum digit


function checksum(data) {
	var result = 0;

	for (var i = 0; i < 13; i++) {
		result += parseInt(data[i]) * (3 - i % 2 * 2);
	}

	return Math.ceil(result / 10) * 10 - result;
}

exports.ITF14 = ITF14;