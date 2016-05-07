"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Encoding documentation:
// https://en.wikipedia.org/wiki/Code_39#Encoding

var CODE39 = function () {
	function CODE39(string) {
		_classCallCheck(this, CODE39);

		this.string = string.toUpperCase();

		// The decimal representation of the characters, is converted to the
		// corresponding binary with the getEncoding function
		this.encodings = {
			"0": 20957, "1": 29783, "2": 23639, "3": 30485,
			"4": 20951, "5": 29813, "6": 23669, "7": 20855,
			"8": 29789, "9": 23645, "A": 29975, "B": 23831,
			"C": 30533, "D": 22295, "E": 30149, "F": 24005,
			"G": 21623, "H": 29981, "I": 23837, "J": 22301,
			"K": 30023, "L": 23879, "M": 30545, "N": 22343,
			"O": 30161, "P": 24017, "Q": 21959, "R": 30065,
			"S": 23921, "T": 22385, "U": 29015, "V": 18263,
			"W": 29141, "X": 17879, "Y": 29045, "Z": 18293,
			"-": 17783, ".": 29021, " ": 18269, "$": 17477,
			"/": 17489, "+": 17681, "%": 20753, "*": 35770
		};
	}

	// Get the binary representation of a character by converting the encodings
	// from decimal to binary


	CODE39.prototype.getEncoding = function getEncoding(character) {
		return this.encodings[character].toString(2);
	};

	CODE39.prototype.encode = function encode() {
		// First character is always a *
		var result = this.getEncoding("*");

		// Take every character and add the binary representation to the result
		for (var i = 0; i < this.string.length; i++) {
			result += this.getEncoding(this.string[i]) + "0";
		}

		// Last character is always a *
		result += this.getEncoding("*");

		return {
			data: result,
			text: this.string
		};
	};

	CODE39.prototype.valid = function valid() {
		return this.string.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
	};

	return CODE39;
}();

exports.CODE39 = CODE39;