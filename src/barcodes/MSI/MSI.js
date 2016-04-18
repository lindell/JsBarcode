// Encoding documentation
// https://en.wikipedia.org/wiki/MSI_Barcode#Character_set_and_binary_lookup

class MSI{
	constructor(string){
		this.string = string;
	}

	encode(){
		// Start bits
		var ret = "110";

		for(var i = 0; i < this.string.length; i++){
			// Convert the character to binary (always 4 binary digits)
			var digit = parseInt(this.string[i]);
			var bin = digit.toString(2);
			bin = addZeroes(bin, 4 - bin.length);

			// Add 100 for every zero and 110 for every 1
			for(var b = 0; b < bin.length; b++){
				ret += bin[b] == "0" ? "100" : "110";
			}
		}

		// End bits
		ret += "1001";

		return {
			data: ret,
			text: this.string
		};
	}

	valid(){
		return this.string.search(/^[0-9]+$/) !== -1;
	}
}

function addZeroes(number, n){
	for(var i = 0; i < n; i++){
		number = "0" + number;
	}
	return number;
}

export default MSI;
