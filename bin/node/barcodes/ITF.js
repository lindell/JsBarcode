"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ITF = function () {
	function ITF(string) {
		_classCallCheck(this, ITF);

		this.string = string;

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

	_createClass(ITF, [{
		key: "valid",
		value: function valid() {
			return this.string.search(/^([0-9]{2})+$/) !== -1;
		}
	}, {
		key: "encode",
		value: function encode() {
			//Always add the same start bits
			var result = "1010";

			//Calculate all the digit pairs
			for (var i = 0; i < this.string.length; i += 2) {
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
	}]);

	return ITF;
}();

exports.default = ITF;