"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Encoding documentation:
// https://en.wikipedia.org/wiki/Code_39#Encoding

var CODE39 = function () {
	function CODE39(string, options) {
		_classCallCheck(this, CODE39);

		this.string = string.toUpperCase();

		// Enable mod43 checksum?
		this.mod43Enabled = options.mod43 || false;

		// All characters. The position in the array is the (checksum) value
		this.characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", ".", " ", "$", "/", "+", "%", "*"];

		// The decimal representation of the characters, is converted to the
		// corresponding binary with the getEncoding function
		this.encodings = [20957, 29783, 23639, 30485, 20951, 29813, 23669, 20855, 29789, 23645, 29975, 23831, 30533, 22295, 30149, 24005, 21623, 29981, 23837, 22301, 30023, 23879, 30545, 22343, 30161, 24017, 21959, 30065, 23921, 22385, 29015, 18263, 29141, 17879, 29045, 18293, 17783, 29021, 18269, 17477, 17489, 17681, 20753, 35770];
	}

	// Get the binary representation of a character by converting the encodings
	// from decimal to binary


	CODE39.prototype.getEncoding = function getEncoding(character) {
		return this.getBinary(this.characterValue(character));
	};

	CODE39.prototype.getBinary = function getBinary(characterValue) {
		return this.encodings[characterValue].toString(2);
	};

	CODE39.prototype.getCharacter = function getCharacter(characterValue) {
		return this.characters[characterValue];
	};

	CODE39.prototype.characterValue = function characterValue(character) {
		return this.characters.indexOf(character);
	};

	CODE39.prototype.encode = function encode() {
		var string = this.string;

		// First character is always a *
		var result = this.getEncoding("*");

		// Take every character and add the binary representation to the result
		for (var i = 0; i < this.string.length; i++) {
			result += this.getEncoding(this.string[i]) + "0";
		}

		// Calculate mod43 checksum if enabled
		if (this.mod43Enabled) {
			var checksum = 0;
			for (var _i = 0; _i < this.string.length; _i++) {
				checksum += this.characterValue(this.string[_i]);
			}

			checksum = checksum % 43;

			result += this.getBinary(checksum) + "0";
			string += this.getCharacter(checksum);
		}

		// Last character is always a *
		result += this.getEncoding("*");

		return {
			data: result,
			text: string
		};
	};

	CODE39.prototype.valid = function valid() {
		return this.string.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
	};

	return CODE39;
}();

exports.CODE39 = CODE39;