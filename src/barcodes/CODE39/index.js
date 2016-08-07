// Encoding documentation:
// https://en.wikipedia.org/wiki/Code_39#Encoding

class CODE39 {
	constructor(string, options){
		this.string = string.toUpperCase();

		// Enable mod43 checksum?
		this.mod43Enabled = options.mod43 || false;

		// All characters. The position in the array is the (checksum) value
		this.characters = [
			"0", "1", "2", "3",
			"4", "5", "6", "7",
			"8", "9", "A", "B",
			"C", "D", "E", "F",
			"G", "H", "I", "J",
			"K", "L", "M", "N",
			"O", "P", "Q", "R",
			"S", "T", "U", "V",
			"W", "X", "Y", "Z",
			"-", ".", " ", "$",
			"/", "+", "%", "*"
		];

		// The decimal representation of the characters, is converted to the
		// corresponding binary with the getEncoding function
		this.encodings = [
			20957, 29783, 23639, 30485,
			20951, 29813, 23669, 20855,
			29789, 23645, 29975, 23831,
			30533, 22295, 30149, 24005,
			21623, 29981, 23837, 22301,
			30023, 23879, 30545, 22343,
			30161, 24017, 21959, 30065,
			23921, 22385, 29015, 18263,
			29141, 17879, 29045, 18293,
			17783, 29021, 18269, 17477,
			17489, 17681, 20753, 35770
		];
	}

	// Get the binary representation of a character by converting the encodings
	// from decimal to binary
	getEncoding(character){
		return this.getBinary(this.characterValue(character));
	}

	getBinary(characterValue){
		return this.encodings[characterValue].toString(2);
	}

	getCharacter(characterValue){
		return this.characters[characterValue];
	}

	characterValue(character){
		return this.characters.indexOf(character);
	}


	encode(){
		var string = this.string;

		// First character is always a *
		var result = this.getEncoding("*");

		// Take every character and add the binary representation to the result
		for(let i = 0; i < this.string.length; i++){
			result += this.getEncoding(this.string[i]) + "0";
		}

		// Calculate mod43 checksum if enabled
		if(this.mod43Enabled){
			var checksum = this.mod43checksum();
			result += this.getBinary(checksum) + "0";
			string += this.getCharacter(checksum);
		}

		// Last character is always a *
		result += this.getEncoding("*");

		return {
			data: result,
			text: string
		};
	}

	valid(){
		return this.string.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
	}

	mod43checksum(){
		var checksum = 0;
		for(let i = 0; i < this.string.length; i++){
			checksum += this.characterValue(this.string[i]);
		}

		checksum = checksum % 43;
		return checksum;
	}
}

export {CODE39};
