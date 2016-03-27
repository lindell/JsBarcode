// ASCII value ranges 0-127, 200-211
var validCODE128 = /^[\x00-\x7F\xC8-\xD3]+$/;

// This is the master class, it does require the start code to be
//included in the string
function CODE128(string) {
	// Fill the bytes variable with the ascii codes of string
	this.bytes = [];
	for (var i = 0; i < string.length; ++i) {
		this.bytes.push(string.charCodeAt(i));
	}

	// First element should be startcode, remove that
	this.string = string.substring(1);

	this.getText = function() {
		var string = this.string;

		/*
		string = string.replace(String.fromCharCode(201), "[FNC3]");
		string = string.replace(String.fromCharCode(202), "[FNC2]");
		string = string.replace(String.fromCharCode(203), "[SHIFT]");
		string = string.replace(String.fromCharCode(207), "[FNC1]");
		*/

		return string.replace(/[^\x20-\x7E]/g, "");
	};

	// The public encoding function
	this.encoded = function() {
		var encodingResult;
		var bytes = this.bytes;
		// Remove the startcode from the bytes and set its index
		var startIndex = bytes.shift() - 105;

		// Start encode with the right type
		if(startIndex === 103){
			encodingResult = nextA(bytes, 1);
		}
		else if(startIndex === 104){
			encodingResult = nextB(bytes, 1);
		}
		else if(startIndex === 105){
			encodingResult = nextC(bytes, 1);
		}

		return (
			//Add the start bits
			getEncoding(startIndex) +
			//Add the encoded bits
			encodingResult.result +
			//Add the checksum
			getEncoding((encodingResult.checksum + startIndex) % 103) +
			//Add the end bits
			getEncoding(106)
		);
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
			502, 518, 886, 966, /* Start codes */   668, 680, 692,
			5379
		];
	var getEncoding = function(n) {
		return (code128b[n] ? (code128b[n] + 1000).toString(2) : '');
	};

	// Use the regexp variable for validation
	this.valid = function() {
		return !(this.string.search(validCODE128) === -1);
	}

	function nextA(bytes, depth){
		if(bytes.length <= 0){
			return {"result": "", "checksum": 0};
		}

		var next, index;

		// Special characters
		if(bytes[0] >= 200){
			index = bytes[0] - 105;

			//Remove first element
			bytes.shift();

			// Swap to CODE128C
			if(index === 99){
				next = nextC(bytes, depth + 1);
			}
			// Swap to CODE128B
			else if(index === 100){
				next = nextB(bytes, depth + 1);
			}
			// Shift
			else if(index === 98){
				// Convert the next character so that is encoded correctly
				bytes[0] = bytes[0] > 95 ? bytes[0] - 96 : bytes[0];
				next = nextA(bytes, depth + 1);
			}
			// Continue on CODE128A but encode a special character
			else{
				next = nextA(bytes, depth + 1);
			}
		}
		// Continue encoding of CODE128A
		else{
			var charCode = bytes[0];
			index = charCode < 32 ? charCode + 64 : charCode - 32;

			// Remove first element
			bytes.shift();

			next = nextA(bytes, depth + 1);
		}

		// Get the correct binary encoding and calculate the weight
		var enc = getEncoding(index);
		var weight = index * depth;

		return {"result": enc + next.result, "checksum": weight + next.checksum}
	}

	function nextB(bytes, depth){
		if(bytes.length <= 0){
			return {"result": "", "checksum": 0};
		}

		var next, index;

		// Special characters
		if(bytes[0] >= 200){
			index = bytes[0] - 105;

			//Remove first element
			bytes.shift();

			// Swap to CODE128C
			if(index === 99){
				next = nextC(bytes, depth + 1);
			}
			// Swap to CODE128A
			else if(index === 101){
				next = nextA(bytes, depth + 1);
			}
			// Shift
			else if(index === 98){
				// Convert the next character so that is encoded correctly
				bytes[0] = bytes[0] < 32 ? bytes[0] + 96 : bytes[0];
				next = nextB(bytes, depth + 1);
			}
			// Continue on CODE128B but encode a special character
			else{
				next = nextB(bytes, depth + 1);
			}
		}
		// Continue encoding of CODE128B
		else {
			index = bytes[0] - 32;
			bytes.shift();
			next = nextB(bytes, depth + 1);
		}

		// Get the correct binary encoding and calculate the weight
		var enc = getEncoding(index);
		var weight = index * depth;

		return {"result": enc + next.result, "checksum": weight + next.checksum};
	}

	function nextC(bytes, depth){
		if(bytes.length <= 0){
			return {"result": "", "checksum": 0};
		}

		var next, index;

		// Special characters
		if(bytes[0] >= 200){
			index = bytes[0] - 105;

			// Remove first element
			bytes.shift();

			// Swap to CODE128B
			if(index === 100){
				next = nextB(bytes, depth + 1);
			}
			// Swap to CODE128A
			else if(index === 101){
				next = nextA(bytes, depth + 1);
			}
			// Continue on CODE128C but encode a special character
			else{
				next = nextC(bytes, depth + 1);
			}
		}
		// Continue encoding of CODE128C
		else{
			index = (bytes[0]-48) * 10 + bytes[1]-48;
			bytes.shift();
			bytes.shift();
			next = nextC(bytes, depth + 1);
		}

		// Get the correct binary encoding and calculate the weight
		var enc = getEncoding(index);
		var weight = index * depth;

		return {"result": enc + next.result, "checksum": weight + next.checksum};
	}
}

function autoSelectModes(string){
	// ASCII ranges 0-98 and 200-207 (FUNCs and SHIFTs)
	var aLength = string.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length;
	// ASCII ranges 32-127 and 200-207 (FUNCs and SHIFTs)
	var bLength = string.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length;
	// Number pairs or [FNC1]
	var cLength = string.match(/^(\xCF*[0-9]{2}\xCF*)*/)[0].length;

	var newString;
	// Select CODE128C if the string start with enough digits
	if(cLength >= 2){
		newString = String.fromCharCode(210) + autoSelectFromC(string);
	}
	// Select A/C depending on the longest match
	else if(aLength > bLength){
		newString = String.fromCharCode(208) + autoSelectFromA(string);
	}
	else{
		newString = String.fromCharCode(209) + autoSelectFromB(string);
	}

	newString = newString.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, function(match, char){
		return String.fromCharCode(203) + char;
	});

	return newString;
}

function autoSelectFromA(string){
	var untilC = string.match(/^([\x00-\x5F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);

	if(untilC){
		return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
	}

	var aChars = string.match(/^[\x00-\x5F\xC8-\xCF]+/);
	if(aChars[0].length === string.length){
		return string;
	}

	return aChars[0] + String.fromCharCode(205) + autoSelectFromB(string.substring(aChars[0].length));
}

function autoSelectFromB(string){
	var untilC = string.match(/^([\x20-\x7F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);

	if(untilC){
		return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
	}

	var bChars = string.match(/^[\x20-\x7F\xC8-\xCF]+/);
	if(bChars[0].length === string.length){
		return string;
	}

	return bChars[0] + String.fromCharCode(206) + autoSelectFromA(string.substring(bChars[0].length));
}


function autoSelectFromC(string){
	var cMatch = string.match(/^(\xCF*[0-9]{2}\xCF*)+/)[0];
	var length = cMatch.length;

	if(length === string.length){
		return string;
	}

	string = string.substring(length);

	// Select A/B depending on the longest match
	var aLength = string.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length;
	var bLength = string.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length;
	if(aLength >= bLength){
		return cMatch + String.fromCharCode(206) + autoSelectFromA(string);
	}
	else{
		return cMatch + String.fromCharCode(205) + autoSelectFromB(string);
	}
}

function CODE128AUTO(string) {
	// Check the validity of the string, don't even bother auto it when
	//it's not valid
	if(string.search(validCODE128) !== -1){
		return new CODE128(autoSelectModes(string));
	}
	return new CODE128(string);
}
function CODE128A(string) {
	var code128 = new CODE128(String.fromCharCode(208) + string);
	code128.valid = function(){
		return this.string.search(/^[\x00-\x5F\xC8-\xCF]+$/) !== -1;
	}
	return code128;
}
function CODE128B(string) {
	var code128 = new CODE128(String.fromCharCode(209) + string);
	code128.valid = function(){
		return this.string.search(/^[\x20-\x7F\xC8-\xCF]+$/) !== -1;
	}
	return code128;
}
function CODE128C(string) {
	var code128 = new CODE128(String.fromCharCode(210) + string);
	code128.valid = function(str){
		return this.string.search(/^(\xCF*[0-9]{2}\xCF*)+$/) !== -1;
	}
	return code128;
}

//Required to register for both browser and nodejs
var register = function(core) {
	core.register(CODE128AUTO, /^CODE128(.?AUTO)?$/, 10);
	core.register(CODE128A, /^CODE128.?A$/i, 2);
	core.register(CODE128B, /^CODE128.?B$/i, 3);
	core.register(CODE128C, /^CODE128.?C$/i, 2);
}
try {register(JsBarcode)} catch(e) {}
try {module.exports.register = register} catch(e) {}
