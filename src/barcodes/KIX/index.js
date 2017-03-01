// Encoding documentation:
// https://nl.wikipedia.org/wiki/KIX-code

import Barcode from "../Barcode.js";

class KIX extends Barcode {
	constructor(data, options){
		data = data.toUpperCase();

		super(data, options);
	}

	encode(){
		const result = this.data.split('') // Make an array of the data
			.map((character) => { // Get the corresponding bars
				return encodings[character].map(barType => barTypes[barType]);
			})
			.reduce((a, b) => [...a, ...b], []) // Merge all results into on array
			.reduce((a, b) => [...a, b, 0], []) // Add space between all bars
			.slice(0, -1); // Remove last element

		return {
			data: result,
			text: this.text
		};
	}

	valid(){
		return this.data.search(/^[0-9A-Z]+$/) !== -1;
	}
}


const encodings = {
	"0":[0, 0, 3, 3], "1":[0, 1, 2, 3], "2":[0, 1, 3, 2], "3":[1, 0, 2, 3],
	"4":[1, 0, 3, 2], "5":[1, 1, 2, 2], "6":[0, 2, 1, 3], "7":[0, 3, 0, 3],
	"8":[0, 3, 1, 2], "9":[1, 2, 0, 3], "A":[1, 2, 1, 2], "B":[1, 3, 0, 2],
	"C":[0, 2, 3, 1], "D":[0, 3, 2, 1], "E":[0, 3, 3, 0], "F":[1, 2, 2, 1],
	"G":[1, 2, 3, 0], "H":[1, 3, 2, 0], "I":[2, 0, 1, 3], "J":[2, 1, 0, 3],
	"K":[2, 1, 1, 2], "L":[3, 0, 0, 3], "M":[3, 0, 1, 2], "N":[3, 1, 0, 2],
	"O":[2, 0, 3, 1], "P":[2, 1, 2, 1], "Q":[2, 1, 3, 0], "R":[3, 0, 2, 1],
	"S":[3, 0, 3, 0], "T":[3, 1, 2, 0], "U":[2, 2, 1, 1], "V":[2, 3, 0, 1],
	"W":[2, 3, 1, 0], "X":[3, 2, 0, 1], "Y":[3, 2, 1, 0], "Z":[3, 3, 0, 0],
};

const syncHeight = 0.37;
const barTypes = {
	0: {start: syncHeight, end: 1 - syncHeight},
	1: {start: syncHeight, end: 1},
	2: {start: 0, end: 1 - syncHeight},
	3: {start: 0, end: 1},
};

export {KIX};
