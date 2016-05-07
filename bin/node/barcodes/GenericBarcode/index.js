"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GenericBarcode = function () {
	function GenericBarcode(string) {
		_classCallCheck(this, GenericBarcode);

		this.string = string;
	}

	// Return the corresponding binary numbers for the data provided


	GenericBarcode.prototype.encode = function encode() {
		return {
			data: "10101010101010101010101010101010101010101",
			text: this.string
		};
	};

	// Resturn true/false if the string provided is valid for this encoder


	GenericBarcode.prototype.valid = function valid() {
		return true;
	};

	return GenericBarcode;
}();

exports.GenericBarcode = GenericBarcode;