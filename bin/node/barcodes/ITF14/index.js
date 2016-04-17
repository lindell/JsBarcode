"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ITF14 = function () {
	function ITF14(string) {
		(0, _classCallCheck3.default)(this, ITF14);

		this.string = string;

		// Add checksum if it does not exist
		if (string.search(/^[0-9]{13}$/) !== -1) {
			this.string += this.checksum(string);
		}

		this.binaryRepresentation = {
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
	}

	(0, _createClass3.default)(ITF14, [{
		key: "valid",
		value: function valid() {
			return this.string.search(/^[0-9]{14}$/) !== -1 && this.string[13] == this.checksum();
		}
	}, {
		key: "encode",
		value: function encode() {
			var result = "1010";

			//Calculate all the digit pairs
			for (var i = 0; i < 14; i += 2) {
				result += this.calculatePair(this.string.substr(i, 2));
			}

			//Always add the same end bits
			result += "11101";

			return {
				data: result,
				text: this.string
			};
		}

		//Calculate the data of a number pair

	}, {
		key: "calculatePair",
		value: function calculatePair(numberPair) {
			var result = "";

			var number1Struct = this.binaryRepresentation[numberPair[0]];
			var number2Struct = this.binaryRepresentation[numberPair[1]];

			//Take every second bit and add to the result
			for (var i = 0; i < 5; i++) {
				result += number1Struct[i] == "1" ? "111" : "1";
				result += number2Struct[i] == "1" ? "000" : "0";
			}

			return result;
		}

		//Calulate the checksum digit

	}, {
		key: "checksum",
		value: function checksum() {
			var result = 0;

			for (var i = 0; i < 13; i++) {
				result += parseInt(this.string[i]) * (3 - i % 2 * 2);
			}

			return 10 - result % 10;
		}
	}]);
	return ITF14;
}();

exports.default = ITF14;