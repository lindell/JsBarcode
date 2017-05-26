class EANencoder{
	constructor(){
		// Standard start end and middle bits
		this.startBin = "101";
		this.endBin = "101";
		this.middleBin = "01010";

		this.binaries = {
			// The L (left) type of encoding
			"L": [
				"0001101",
				"0011001",
				"0010011",
				"0111101",
				"0100011",
				"0110001",
				"0101111",
				"0111011",
				"0110111",
				"0001011"
			],

			// The G type of encoding
			"G": [
				"0100111",
				"0110011",
				"0011011",
				"0100001",
				"0011101",
				"0111001",
				"0000101",
				"0010001",
				"0001001",
				"0010111"
			],

			// The R (right) type of encoding
			"R": [
				"1110010",
				"1100110",
				"1101100",
				"1000010",
				"1011100",
				"1001110",
				"1010000",
				"1000100",
				"1001000",
				"1110100"
			],

			// The O (odd) encoding for UPC-E
			"O": [
				"0001101",
				"0011001",
				"0010011",
				"0111101",
				"0100011",
				"0110001",
				"0101111",
				"0111011",
				"0110111",
				"0001011"
			],

			// The E (even) encoding for UPC-E
			"E": [
				"0100111",
				"0110011",
				"0011011",
				"0100001",
				"0011101",
				"0111001",
				"0000101",
				"0010001",
				"0001001",
				"0010111"
			]
		};
	}

	// Convert a numberarray to the representing
	encode(number, structure, separator){
		// Create the variable that should be returned at the end of the function
		var result = "";

		// Make sure that the separator is set
		separator = separator || "";

		// Loop all the numbers
		for(var i = 0; i < number.length; i++){
			// Using the L, G or R encoding and add it to the returning variable
			let binary = this.binaries[structure[i]];
			if (binary) {
				result += binary[number[i]];
			}

			// Add separator in between encodings
			if(i < number.length - 1){
				result += separator;
			}
		}
		return result;
	}
}

export default EANencoder;
