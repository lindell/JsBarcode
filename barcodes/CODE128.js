function CODE128(string, code) {
	code = code || "B";

	this.string = string + "";

	this.valid = valid;

	this.getText = function() {
		return this.string;
	};

	//The public encoding function
	this.encoded = function() {
		return calculate["code128" + code](string);
	}

	//Data for each character, the last characters will not be encoded but are used for error correction
	//Numbers encode to (n + 1000) -> binary; 740 -> (740 + 1000).toString(2) -> "11011001100"
	var code128b = [ // + 1000
			740, 644, 638, 176, 164, 100, 224, 220, 124, 608, 604,
			572, 436, 244, 230, 484, 260, 254, 650, 628, 614, 764,
			652, 902, 868, 836, 830, 892, 844, 842, 752, 734, 590,
			304, 112,  94, 416, 128, 122, 672, 576, 570, 464, 422,
			134, 496, 478, 142, 910, 678, 582, 768, 762, 774, 880,
			862, 814, 896, 890, 818, 914, 602, 930, 328, 292, 200,
			158,  68,  62, 424, 412, 232, 218,  76,  74, 554, 616,
			978, 556, 146, 340, 212, 182, 508, 268, 266, 956, 940,
			938, 758, 782, 974, 400, 310, 118, 512, 506, 960, 954,
			502, 518, 886, 966, /* Start codes */   668, 680, 692
		];
	var getCode128b = function(n) {
		return (code128b[n] ? (code128b[n] + 1000).toString(2) : '');
	};
	//The end bits
	var endBin = "1100011101011";

	//Use the regexp variable for validation
	function valid() {
		return !(this.string.search(/^[!-~ ]+$/) === -1);
	}

	//The encoder function that return a complete binary string. Data need to be validated before sent to this function
	//This is general calculate function, which is called by code specific calculate functions
	function calculateCode128(string, encodeFn, startCode, checksumFn) {
		var encodingResult = encodeFn(string, startCode);
		return (
			//Add the start bits
			encodingById(startCode) +
			//Add the encoded bits
			encodingResult.result +
			//Add the checksum
			encodingById(encodingResult.checksum) +
			//Add the end bits
			endBin
		);
	}

	//Code specific calculate functions
	var calculate = {
		code128B: function(string) {
			return calculateCode128(string, encodeB, 104);
		},
		code128C: function(string) {
			string = string.replace(/ /g, '');
			return calculateCode128(string, encodeC, 105);
		}
	}

	//Encode the characters and calculate the checksum (128 B)
	function encodeB(string, startCode) {
		var result = "";
		var sum = 0;

		for (var i = 0, j = string.length; i < j; i++) {
			result += encodingByChar(string[i]);
			sum += weightByCharacter(string[i]) * (i + 1);
		}
		return {
			result: result,
			checksum: (sum + startCode) % 103
		}
	}

	//Encode the characters and calculate the checksum (128 C)
	function encodeC(string, startCode) {
		var result = "";
		var sum = 0;
		var w = 1;

		for (var i = 0, j = string.length; i < j; i += 2) {
			result += encodingById(parseInt(string.substr(i, 2)));
			sum += parseInt(string.substr(i, 2)) * (w);
			w++;
		}
		return {
			result: result,
			checksum: (sum + startCode) % 103
		}
	}

	//Get the encoded data by the id of the character
	function encodingById(id) {
		return getCode128b(id);
	}

	//Get the id (weight) of a character
	function weightByCharacter(character) {
		return character.charCodeAt(0) - 32;
	}

	//Get the encoded data of a character
	function encodingByChar(character) {
		return getCode128b(weightByCharacter(character));
	}
}

function CODE128B(string) {
	return new CODE128(string, "B");
}
function CODE128C(string) {
	return new CODE128(string, "C");
};

//Required to register for both browser and nodejs
var register = function(core) {
	core.register(CODE128B, /^CODE128(.?B)?$/i, 2);
	core.register(CODE128C, /^CODE128.?C$/i, 2);
}
try {register(JsBarcode)} catch(e) {}
try {module.exports.register = register} catch(e) {}
