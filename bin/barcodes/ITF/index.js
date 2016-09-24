"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ITF = undefined;

var _Barcode2 = require("../Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ITF = function (_Barcode) {
	_inherits(ITF, _Barcode);

	function ITF(data, options) {
		_classCallCheck(this, ITF);

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

	ITF.prototype.valid = function valid() {
		return this.data.search(/^([0-9]{2})+$/) !== -1;
	};

	ITF.prototype.encode = function encode() {
		// Always add the same start bits
		var result = "1010";

		// Calculate all the digit pairs
		for (var i = 0; i < this.data.length; i += 2) {
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


	ITF.prototype.calculatePair = function calculatePair(numberPair) {
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

	return ITF;
}(_Barcode3.default);

exports.ITF = ITF;