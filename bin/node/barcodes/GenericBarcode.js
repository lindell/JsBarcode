"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function GenericBarcode(string) {
	//Return the corresponding binary numbers for the data provided
	this.encode = function () {
		return { data: "10101010101010101010101010101010101010101", text: string };
	};

	//Resturn true/false if the string provided is valid for this encoder
	this.valid = function () {
		return true;
	};
}

//Required to register for both browser and nodejs
function register(core) {
	core.register(GenericBarcode, /^GEN(ERIC(BARCODE)?)?$/i, 0);
}
exports.default = register;