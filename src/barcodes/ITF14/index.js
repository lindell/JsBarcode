class ITF14{
	constructor(string){
		this.string = string;

		// Add checksum if it does not exist
		if(string.search(/^[0-9]{13}$/) !== -1){
			this.string += this.checksum(string);
		}

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
		return this.string.search(/^[0-9]{14}$/) !== -1 &&
			this.string[13] == this.checksum();
	}

	encode(){
		var result = "1010";

		// Calculate all the digit pairs
		for(var i = 0; i < 14; i += 2){
			result += this.calculatePair(this.string.substr(i, 2));
		}

		// Always add the same end bits
		result += "11101";

		return {
			data: result,
			text: this.string
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

	// Calulate the checksum digit
	checksum(){
		var result = 0;

		for(var i = 0; i < 13; i++){
			result += parseInt(this.string[i]) * (3 - (i % 2) * 2);
		}

		return Math.ceil(result / 10) * 10 - result;
	}
}

export {ITF14};
