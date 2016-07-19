"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ITF14 = function () {
	function ITF14(string) {
		_classCallCheck(this, ITF14);

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

	ITF14.prototype.valid = function valid() {
		return this.string.search(/^[0-9]{14}$/) !== -1 && this.string[13] == this.checksum();
	};

	ITF14.prototype.encode = function encode() {
		var result = "1010";

		// Calculate all the digit pairs
		for (var i = 0; i < 14; i += 2) {
			result += this.calculatePair(this.string.substr(i, 2));
		}

		// Always add the same end bits
		result += "11101";

		return {
			data: result,
			text: this.string
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

	// Calulate the checksum digit


	ITF14.prototype.checksum = function checksum() {
		var result = 0;

		for (var i = 0; i < 13; i++) {
			result += parseInt(this.string[i]) * (3 - i % 2 * 2);
		}

		return Math.ceil(result / 10) * 10 - result;
	};

	return ITF14;
}();

exports.ITF14 = ITF14;