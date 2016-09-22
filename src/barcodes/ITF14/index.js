import Barcode from "../Barcode.js";

class ITF14 extends Barcode{
	constructor(data, options){
		// Add checksum if it does not exist
		if(data.search(/^[0-9]{13}$/) !== -1){
			data += checksum(data);
		}

		super(data, options);

		this.binaryRepresentation = {
			"0":"00110",
			"1":"10001",
			"2":"01001",
			"3":"11000",
			"4":"00101",
			"5":"10100",
			"6":"01100",
			"7":"00011",
			"8":"10010",
			"9":"01010"
		};
	}

	valid(){
		return this.data.search(/^[0-9]{14}$/) !== -1 &&
			this.data[13] == checksum(this.data);
	}

	encode(){
		var result = "1010";

		// Calculate all the digit pairs
		for(var i = 0; i < 14; i += 2){
			result += this.calculatePair(this.data.substr(i, 2));
		}

		// Always add the same end bits
		result += "11101";

		return {
			data: result,
			text: this.text
		};
	}

	// Calculate the data of a number pair
	calculatePair(numberPair){
		var result = "";

		var number1Struct = this.binaryRepresentation[numberPair[0]];
		var number2Struct = this.binaryRepresentation[numberPair[1]];

		// Take every second bit and add to the result
		for(var i = 0; i < 5; i++){
			result += (number1Struct[i] == "1") ? "111" : "1";
			result += (number2Struct[i] == "1") ? "000" : "0";
		}

		return result;
	}
}

// Calulate the checksum digit
function checksum(data){
	var result = 0;

	for(var i = 0; i < 13; i++){
		result += parseInt(data[i]) * (3 - (i % 2) * 2);
	}

	return Math.ceil(result / 10) * 10 - result;
}

export {ITF14};
